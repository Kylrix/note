"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { 
  realtime, 
  listActivityLogs, 
  APPWRITE_DATABASE_ID, 
  APPWRITE_TABLE_ID_ACTIVITYLOG 
} from '@/lib/appwrite';
import { useAuth } from '@/components/ui/AuthContext';
import type { ActivityLog } from '@/types/appwrite';

interface NotificationContextType {
  notifications: ActivityLog[];
  unreadCount: number;
  isLoading: boolean;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<ActivityLog[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  const fetchNotifications = useCallback(async () => {
    if (!isAuthenticated || !user?.$id) return;
    
    setIsLoading(true);
    try {
      const res = await listActivityLogs();
      const logs = res.documents as unknown as ActivityLog[];
      setNotifications(logs);
      // For now, let's assume anything in ActivityLog that is recent is unread
      // or we can add a 'read' field if the schema allows. 
      // If schema doesn't have 'read', we'll simulate it locally.
      setUnreadCount(logs.filter(log => !localStorage.getItem(`read_notif_${log.$id}`)).length);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, user?.$id]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    if (!isAuthenticated || !user?.$id) return;

    const channel = `databases.${APPWRITE_DATABASE_ID}.collections.${APPWRITE_TABLE_ID_ACTIVITYLOG}.documents`;
    
    const unsub = realtime.subscribe(channel, (response) => {
      const payload = response.payload as ActivityLog;
      
      if (payload.userId !== user.$id) return;

      const isCreate = response.events.some(e => e.includes('.create'));

      if (isCreate) {
        setNotifications(prev => [payload, ...prev]);
        setUnreadCount(prev => prev + 1);
        
        // Browser notification if permitted
        if (Notification.permission === 'granted') {
          new Notification(`Whisperr ${payload.targetType}`, {
            body: payload.action,
            icon: '/logo/whisperrnote.png'
          });
        }
      }
    });

    return () => {
      if (typeof unsub === 'function') unsub();
      else (unsub as any).unsubscribe?.();
    };
  }, [isAuthenticated, user?.$id]);

  const markAsRead = (id: string) => {
    localStorage.setItem(`read_notif_${id}`, 'true');
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    notifications.forEach(log => localStorage.setItem(`read_notif_${log.$id}`, 'true'));
    setUnreadCount(0);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      unreadCount, 
      isLoading, 
      markAsRead, 
      markAllAsRead,
      clearNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
