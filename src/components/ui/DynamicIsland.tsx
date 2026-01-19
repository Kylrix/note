'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useRef } from 'react';
import { Box, Typography, Stack, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { 
  CheckCircle as SuccessIcon, 
  Error as ErrorIcon, 
  Info as InfoIcon, 
  Warning as WarningIcon,
  Close as CloseIcon,
  Star as ProIcon,
  AutoAwesome as SparklesIcon
} from '@mui/icons-material';

export type IslandType = 'success' | 'error' | 'warning' | 'info' | 'pro' | 'system';

export interface IslandNotification {
  id: string;
  type: IslandType;
  title: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}

interface IslandContextType {
  showIsland: (notification: Omit<IslandNotification, 'id'>) => void;
  dismissIsland: (id: string) => void;
}

const IslandContext = createContext<IslandContextType | undefined>(undefined);

export function useIsland() {
  const context = useContext(IslandContext);
  if (!context) {
    throw new Error('useIsland must be used within an IslandProvider');
  }
  return context;
}

export const IslandProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<IslandNotification[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const showIsland = useCallback((notification: Omit<IslandNotification, 'id'>) => {
    const id = Math.random().toString(36).substring(7);
    const newNotif = { ...notification, id, duration: notification.duration || 6000 };
    setNotifications(prev => [...prev, newNotif]);
  }, []);

  const dismissIsland = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <IslandContext.Provider value={{ showIsland, dismissIsland }}>
      {children}
      <DynamicIslandOverlay notifications={notifications} onDismiss={dismissIsland} isMobile={isMobile} />
    </IslandContext.Provider>
  );
};

const DynamicIslandOverlay: React.FC<{ 
  notifications: IslandNotification[], 
  onDismiss: (id: string) => void,
  isMobile: boolean 
}> = ({ notifications, onDismiss, isMobile }) => {
  const current = notifications[notifications.length - 1]; // Show most recent
  const [isExpanded, setIsExpanded] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (current) {
      setIsExpanded(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
      timeoutRef.current = setTimeout(() => {
        onDismiss(current.id);
      }, current.duration || 5000);
    }
  }, [current, onDismiss]);

  if (!current) return null;

  const getTypeStyle = () => {
    switch (current.type) {
      case 'success': return { color: '#00F5FF', icon: <SuccessIcon fontSize="small" /> };
      case 'error': return { color: '#FF3B30', icon: <ErrorIcon fontSize="small" /> };
      case 'pro': return { color: '#FFD700', icon: <ProIcon fontSize="small" /> };
      case 'warning': return { color: '#FF9500', icon: <WarningIcon fontSize="small" /> };
      default: return { color: '#00F5FF', icon: <InfoIcon fontSize="small" /> };
    }
  };

  const style = getTypeStyle();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: isMobile ? 12 : 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10000,
        pointerEvents: 'none'
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ y: -100, scale: 0.8, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: -100, scale: 0.5, opacity: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 30,
            mass: 0.8 
          }}
          onHoverStart={() => setIsExpanded(true)}
          onHoverEnd={() => setIsExpanded(false)}
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
        >
          <motion.div
            animate={{
              width: isExpanded ? (isMobile ? '340px' : '420px') : (isMobile ? '180px' : '220px'),
              height: isExpanded ? 'auto' : '44px',
              borderRadius: isExpanded ? '28px' : '22px',
            }}
            style={{
              background: 'rgba(10, 10, 10, 0.9)',
              backdropFilter: 'blur(32px) saturate(200%)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 12px 48px rgba(0,0,0,0.6)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
          >
            {/* Compressed Reality */}
            <Box
              sx={{
                height: 44,
                display: 'flex',
                alignItems: 'center',
                px: 2,
                gap: 1.5,
                opacity: isExpanded ? 0 : 1,
                transition: 'opacity 0.2s',
                width: '100%',
                position: isExpanded ? 'absolute' : 'relative'
              }}
            >
              <Box sx={{ color: style.color, display: 'flex' }}>
                {style.icon}
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: 'white',
                  fontWeight: 900,
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-space-grotesk)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {current.title}
              </Typography>
            </Box>

            {/* Expanded Reality */}
            <Box
              sx={{
                p: 2.5,
                opacity: isExpanded ? 1 : 0,
                transition: 'opacity 0.3s 0.1s',
                display: isExpanded ? 'block' : 'none'
              }}
            >
              <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '12px',
                      bgcolor: `${style.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: style.color,
                      border: `1px solid ${style.color}30`
                    }}
                  >
                    {style.icon}
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        color: 'white',
                        fontWeight: 900,
                        fontFamily: 'var(--font-space-grotesk)',
                        fontSize: '1rem',
                        lineHeight: 1.2
                      }}
                    >
                      {current.title}
                    </Typography>
                    {current.type === 'pro' && (
                      <Typography
                        variant="caption"
                        sx={{
                          color: style.color,
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}
                      >
                        Elite Status Required
                      </Typography>
                    )}
                  </Box>
                </Stack>

                {current.message && (
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      lineHeight: 1.5,
                      fontSize: '0.875rem'
                    }}
                  >
                    {current.message}
                  </Typography>
                )}

                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDismiss(current.id);
                    }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'rgba(255, 255, 255, 0.6)',
                      padding: '8px 16px',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Dismiss
                  </motion.button>
                  {current.action && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        current.action?.onClick();
                        onDismiss(current.id);
                      }}
                      style={{
                        background: current.type === 'pro' ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' : '#00F5FF',
                        border: 'none',
                        color: 'black',
                        padding: '8px 20px',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: 900,
                        cursor: 'pointer',
                        boxShadow: `0 4px 12px ${style.color}30`
                      }}
                    >
                      {current.action.label}
                    </motion.button>
                  )}
                </Stack>
              </Stack>
            </Box>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};
