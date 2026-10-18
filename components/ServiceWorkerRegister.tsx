'use client';

import { useEffect } from 'react';

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => {
            registration.unregister();
          });
        });
      }
      return;
    }

    if ('serviceWorker' in navigator) {
      const controller = navigator.serviceWorker.controller;
      const registrationPromise = navigator.serviceWorker.register('/sw.js?v=2', {
        scope: '/',
      });

      registrationPromise.then((registration) => {
        console.log('Service Worker registered:', registration.scope);
        
        if (registration.waiting && !controller) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
      }).catch((err) => {
        console.log('SW registration failed:', err);
      });
    }
  }, []);

  return null;
}
