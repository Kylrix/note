'use client';

import React from 'react';

interface LoadingOverlayProps {
  message?: string;
  show?: boolean;
}

// Simplified loading overlay without framer-motion
export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  message = "Loading...", 
  show = true 
}) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-40 pointer-events-none animate-fade-in"
      style={{ 
        backdropFilter: 'blur(2px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Subtle loading indicator in top-right */}
      <div className="absolute top-20 right-6 bg-white/90 dark:bg-gray-900/90 rounded-full p-3 shadow-lg border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm animate-scale-in">
        <div className="flex items-center space-x-2">
          {/* Small spinner */}
          <div className="relative">
            <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 rounded-full"></div>
            <div className="absolute top-0 left-0 w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
          
          {/* Optional text for important loads */}
          {message && message !== "Loading..." && (
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium max-w-24 truncate">
              {message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;