"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { Query } from 'appwrite';
import { useAuth } from '@/components/ui/AuthContext';
import { createReaction, listReactions, deleteReaction } from '@/lib/appwrite';
import type { Reactions } from '@/types/appwrite';
import { TargetType } from '@/types/appwrite';

const DEFAULT_REACTIONS = ['❤️', '🔥', '👏', '😂', '👍', '😮'];

interface NoteReactionsProps {
  noteId: string;
}

export default function NoteReactions({ noteId }: NoteReactionsProps) {
  const { user } = useAuth();
  const [reactions, setReactions] = useState<Reactions[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReactions = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await listReactions([
        Query.equal('targetType', TargetType.NOTE),
        Query.equal('targetId', noteId),
        Query.orderAsc('createdAt'),
        Query.limit(500),
      ]);
      setReactions(res.documents as unknown as Reactions[]);
      setIsLoading(false);
      return;
    } catch (err) {
      console.error('Failed to fetch reactions via client SDK:', err);
    }

    try {
      const res = await fetch(`/api/shared/${noteId}/reactions`);
      if (!res.ok) throw new Error('Failed to fetch shared reactions');
      const payload = await res.json();
      setReactions((payload?.documents || []) as Reactions[]);
    } catch (fallbackErr) {
      console.error('Failed to fetch reactions via shared API:', fallbackErr);
      setError('Reactions are unavailable right now.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReactions();
  }, [noteId]);

  const reactionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    reactions.forEach((r) => {
      counts[r.emoji] = (counts[r.emoji] || 0) + 1;
    });
    return counts;
  }, [reactions]);

  const userReactions = useMemo(() => {
    return new Set(reactions.filter(r => r.userId === user?.$id).map(r => r.emoji));
  }, [reactions, user?.$id]);

  const handleReact = async (emoji: string) => {
    if (!user?.$id) return;
    try {
      const existing = reactions.find(r => r.userId === user.$id && r.emoji === emoji);
      if (existing) {
        await deleteReaction(existing.$id);
      } else {
        await createReaction({
          targetType: TargetType.NOTE,
          targetId: noteId,
          emoji,
          userId: user.$id,
          createdAt: new Date().toISOString(),
        });
      }
      await fetchReactions();
    } catch (err) {
      console.error('Failed to update reaction:', err);
      setError('Failed to update reaction.');
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          Reactions
        </Typography>
        {isLoading && <Typography variant="caption" color="text.secondary">Loading…</Typography>}
      </Stack>

      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
        {DEFAULT_REACTIONS.map((emoji) => {
          const isSelected = userReactions.has(emoji);
          return (
            <Chip
              key={emoji}
              label={`${emoji} ${reactionCounts[emoji] || 0}`}
              onClick={() => handleReact(emoji)}
              clickable={!!user?.$id}
              sx={{
                borderRadius: 3,
                bgcolor: isSelected ? 'primary.main' : 'rgba(255,255,255,0.06)',
                border: isSelected ? 'none' : '1px solid rgba(255,255,255,0.1)',
                fontWeight: 600,
                color: isSelected ? 'primary.contrastText' : 'inherit',
                '&:hover': {
                  bgcolor: isSelected ? 'primary.dark' : 'rgba(255,255,255,0.1)',
                }
              }}
            />
          );
        })}
      </Stack>

      {!user?.$id && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Sign in to react.
        </Typography>
      )}
      {error && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}