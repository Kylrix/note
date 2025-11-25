'use client';

import React from 'react';

interface InitialLoadingScreenProps {
  show?: boolean;
}

// Simplified loading screen without framer-motion to reduce initial bundle
export const InitialLoadingScreen: React.FC<InitialLoadingScreenProps> = ({ 
  show = true 
}) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
      style={{ 
        backdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
      }}
    >
      <div className="bg-light-card/95 dark:bg-dark-card/95 rounded-3xl p-10 shadow-3d-light dark:shadow-3d-dark border border-light-border/20 dark:border-dark-border/20 backdrop-blur-xl max-w-sm w-full mx-4 animate-scale-in">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center shadow-3d-light dark:shadow-3d-dark">
            <img
              src="/logo/whisperrnote.png"
              alt="WhisperNote logo"
              className="w-16 h-16 rounded-full"
            />
          </div>

          <p className="text-sm font-medium uppercase tracking-[0.3em] text-foreground/70">
            Loading
          </p>

          <div className="w-32 h-2 rounded-full bg-light-border dark:bg-dark-border overflow-hidden">
            <div className="h-full bg-accent animate-loading-bar" />
          </div>
        </div>
      </div>
    </div>
  );
};