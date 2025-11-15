'use client';

import { useEffect, useRef } from 'react';
import { TURNSTILE_SITE_KEY } from '@/lib/turnstile';

declare global {
  interface Window {
    turnstile: any;
  }
}

interface TurnstileWidgetProps {
  onToken: (token: string) => void;
  onError?: (error: string) => void;
  onExpire?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact' | 'flexible';
}

export function TurnstileWidget({ onToken, onError, onExpire, theme = 'auto', size = 'normal' }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || !TURNSTILE_SITE_KEY) return;

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.turnstile) {
        window.turnstile.ready(() => {
          const widgetId = window.turnstile.render(containerRef.current, {
            sitekey: TURNSTILE_SITE_KEY,
            theme,
            size,
            callback: onToken,
            'error-callback': onError,
            'expired-callback': onExpire,
          });
          widgetIdRef.current = widgetId;
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (e) {
          console.warn('Failed to remove Turnstile widget:', e);
        }
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [onToken, onError, onExpire, theme, size]);

  return (
    <div 
      ref={containerRef} 
      className="flex justify-center my-4"
      style={{ minHeight: '78px' }}
    />
  );
}
