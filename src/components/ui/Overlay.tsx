"use client";

import React, { lazy, Suspense } from 'react';
import { useOverlay } from './OverlayContext';

// Lazy load framer-motion only when overlay is opened
const MotionDiv = lazy(() => import('framer-motion').then(m => ({ default: m.motion.div })));
const AnimatePresence = lazy(() => import('framer-motion').then(m => ({ default: m.AnimatePresence })));

const Overlay: React.FC = () => {
  const { isOpen, content, closeOverlay } = useOverlay();

  // Don't even load framer-motion until overlay is needed
  if (!isOpen) return null;

  return (
    <Suspense fallback={null}>
      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4 overflow-y-auto"
            onClick={closeOverlay}
          >
            <MotionDiv
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative z-50 w-full max-w-4xl mx-auto my-2 sm:my-8 max-h-[calc(100vh-1rem)] sm:max-h-[calc(100vh-4rem)] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex-1 overflow-y-auto">
                {content}
              </div>
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </Suspense>
  );
};

export default Overlay;
