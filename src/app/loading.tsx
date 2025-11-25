'use client';

import React from 'react';

// Minimal skeleton loading - shows app structure instantly
export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header skeleton */}
      <div className="h-16 bg-card border-b border-border flex items-center px-4 gap-4">
        <div className="w-8 h-8 rounded-lg bg-muted animate-pulse" />
        <div className="flex-1 max-w-md h-10 rounded-xl bg-muted animate-pulse" />
        <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
      </div>
      
      {/* Main content skeleton */}
      <div className="flex">
        {/* Sidebar skeleton - hidden on mobile */}
        <div className="hidden md:block w-64 h-[calc(100vh-4rem)] bg-card border-r border-border p-4">
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        </div>
        
        {/* Content area skeleton */}
        <div className="flex-1 p-6">
          {/* Title skeleton */}
          <div className="h-8 w-48 rounded-lg bg-muted animate-pulse mb-6" />
          
          {/* Grid skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-48 rounded-2xl bg-card border border-border animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}