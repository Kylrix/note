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
      className="fixed inset-0 z-[999] flex items-center justify-center bg-void"
    >
      <div className="bg-matter border border-border p-12 shadow-tangible max-w-sm w-full mx-4 animate-scale-in">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-24 h-24 bg-void border border-border flex items-center justify-center shadow-inner-physical">
            <img
              src="/logo/whisperrnote.png"
              alt="WhisperNote logo"
              className="w-18 h-18 opacity-80"
            />
          </div>

          <p className="font-mono text-xs font-bold uppercase tracking-[0.4em] text-foreground/50">
            Initializing Void
          </p>

          <div className="w-full h-1 bg-void border border-border overflow-hidden">
            <div className="h-full bg-sun animate-loading-bar" />
          </div>
        </div>
      </div>
    </div>
  );
};