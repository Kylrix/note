"use client";

import { useState, useEffect, useMemo } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, Divider, IconButton, Collapse } from '@mui/material';
import { Reply as ReplyIcon, ExpandMore, ExpandLess } from '@mui/icons-material';
import { listComments, createComment } from '@/lib/appwrite';
import type { Comments } from '@/types/appwrite';

interface CommentsProps {
  noteId: string;
}

interface CommentWithChildren extends Comments {
  children: CommentWithChildren[];
}

function buildCommentTree(flatComments: Comments[]): CommentWithChildren[] {
  const commentMap: { [key: string]: CommentWithChildren } = {};
  const rootComments: CommentWithChildren[] = [];

  flatComments.forEach(comment => {
    commentMap[comment.$id] = { ...comment, children: [] };
  });

  flatComments.forEach(comment => {
    if (comment.parentCommentId && commentMap[comment.parentCommentId]) {
      commentMap[comment.parentCommentId].children.push(commentMap[comment.$id]);
    } else {
      rootComments.push(commentMap[comment.$id]);
    }
  });

  return rootComments;
}

interface CommentItemProps {
  comment: CommentWithChildren;
  onReply: (parentId: string, content: string) => Promise<void>;
  depth?: number;
}

function CommentItem({ comment, onReply, depth = 0 }: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [showChildren, setShowChildren] = useState(true);

  const handleReplySubmit = async () => {
    if (!replyContent.trim()) return;
    await onReply(comment.$id, replyContent);
    setReplyContent('');
    setIsReplying(false);
    setShowChildren(true);
  };

  return (
    <Box sx={{ ml: depth * 3, mt: 1, borderLeft: depth > 0 ? '1px solid #ddd' : 'none', pl: depth > 0 ? 2 : 0 }}>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <Box>
            <IconButton size="small" onClick={() => setIsReplying(!isReplying)}>
              <ReplyIcon fontSize="small" />
            </IconButton>
            {comment.children.length > 0 && (
              <IconButton size="small" onClick={() => setShowChildren(!showChildren)}>
                {showChildren ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
              </IconButton>
            )}
          </Box>
        }
      >
        <ListItemText
          primary={comment.content}
          secondary={`by ${comment.userId} on ${new Date(comment.$createdAt).toLocaleString()}`}
        />
      </ListItem>

      {isReplying && (
        <Box sx={{ ml: 2, mr: 2, mb: 2 }}>
          <TextField
            fullWidth
            multiline
            size="small"
            rows={2}
            placeholder="Write a reply..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
            <Button size="small" variant="contained" onClick={handleReplySubmit}>Reply</Button>
            <Button size="small" onClick={() => setIsReplying(false)}>Cancel</Button>
          </Box>
        </Box>
      )}

      <Collapse in={showChildren}>
        <Box>
          {comment.children.map((child) => (
            <CommentItem key={child.$id} comment={child} onReply={onReply} depth={depth + 1} />
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}

export default function CommentsSection({ noteId }: CommentsProps) {
  const [comments, setComments] = useState<Comments[]>([]);
  const [newComment, setNewComment] = useState('');

  const fetchComments = async () => {
    try {
      const res = await listComments(noteId);
      // Sort by date ascending to build tree properly if needed, although buildTree handles it
      const sorted = (res.documents as unknown as Comments[]).sort(
        (a, b) => new Date(a.$createdAt).getTime() - new Date(b.$createdAt).getTime()
      );
      setComments(sorted);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [noteId]);

  const handleAddComment = async (parentId: string | null = null, content: string = newComment) => {
    const text = parentId ? content : newComment;
    if (!text.trim()) return;
    
    try {
      const comment = await createComment(noteId, text, parentId);
      setComments(prev => [...prev, comment as unknown as Comments]);
      if (!parentId) setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const commentTree = useMemo(() => buildCommentTree(comments), [comments]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Comments ({comments.length})</Typography>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Add a top-level comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ mt: 1 }}
          onClick={() => handleAddComment(null)}
          disabled={!newComment.trim()}
        >
          Post Comment
        </Button>
      </Box>
      <Divider />
      <List>
        {commentTree.map((comment) => (
          <div key={comment.$id}>
            <CommentItem 
              comment={comment} 
              onReply={(parentId, content) => handleAddComment(parentId, content)} 
            />
            <Divider variant="fullWidth" sx={{ my: 1 }} />
          </div>
        ))}
      </List>
    </Box>
  );
}
