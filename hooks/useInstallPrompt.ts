'use client';

import { useSyncExternalStore } from 'react';

type InstallPromptEvent = {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

export type InstallPromptStatus = {
  isAvailable: boolean;
  isInstalled: boolean;
};

function getServerSnapshot(): InstallPromptStatus {
  return { isAvailable: false, isInstalled: false };
}

function useInstallPrompt(): InstallPromptStatus {
  const snapshot = useSyncExternalStore<InstallPromptStatus>(
    (onStoreChange) => {
      const handleInstall = (type: 'ready' | 'installed') => {
        onStoreChange();
      };

      if (typeof window !== 'undefined') {
        window.__installPromptListeners?.push(handleInstall);
      }

      return () => {
        if (typeof window !== 'undefined' && window.__installPromptListeners) {
          window.__installPromptListeners = window.__installPromptListeners.filter(
            (cb) => cb !== handleInstall
          );
        }
      };
    },
    () => {
      if (typeof window === 'undefined') {
        return { isAvailable: false, isInstalled: false };
      }

      const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (navigator as any).standalone === true;

      return {
        isAvailable: window.__installPrompt !== null,
        isInstalled: isStandalone,
      };
    },
    () => ({ isAvailable: false, isInstalled: false })
  );

  return snapshot;
}

export function useInstallPromptActions() {
  const triggerInstall = async () => {
    if (typeof window === 'undefined') {
      return null;
    }

    const promptEvent = window.__installPrompt;
    if (!promptEvent) {
      return null;
    }

    try {
      await promptEvent.prompt();
      const result = await promptEvent.userChoice;
      return result.outcome;
    } catch (err) {
      console.error('Install prompt error:', err);
      return null;
    } finally {
      window.__installPrompt = null;
    }
  };

  return { triggerInstall };
}
