'use client';

import { useEffect, useState } from 'react';

export type InstallOutcome = 'accepted' | 'dismissed' | 'unavailable';

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

// declare global {
//   interface Window {
//     __installPrompt?: InstallPromptEvent | null;
//   }
// }

function detectStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return window.matchMedia('(display-mode: standalone)').matches || nav.standalone === true;
}

export function useInstallPrompt() {
  const [ready, setReady] = useState(false);
  const [canPrompt, setCanPrompt] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    setReady(true);
    setCanPrompt(!!window.__installPrompt);
    setInstalled(detectStandalone());

    const onReady = () => setCanPrompt(!!window.__installPrompt);
    const onInstalled = () => {
      setCanPrompt(false);
      setInstalled(true);
    };
    window.addEventListener('installprompt-ready', onReady);
    window.addEventListener('installprompt-installed', onInstalled);
    return () => {
      window.removeEventListener('installprompt-ready', onReady);
      window.removeEventListener('installprompt-installed', onInstalled);
    };
  }, []);

  return { ready, canPrompt, installed };
}

async function promptInstall(): Promise<InstallOutcome> {
  const ev = window.__installPrompt;
  if (!ev) return 'unavailable';
  window.__installPrompt = null;
  window.dispatchEvent(new Event('installprompt-ready'));
  try {
    await ev.prompt();
    const choice = await ev.userChoice;
    return choice.outcome;
  } catch {
    return 'unavailable';
  }
}

const actions = { promptInstall };
export function useInstallPromptActions() {
  return actions;
}
