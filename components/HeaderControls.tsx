'use client';

import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';

export function HeaderControls() {
  const { toggleTheme, settings, loaded } = useSettings();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  let isDark = false;
  if (mounted && loaded) {
    if (settings.theme === 'system') {
      isDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      isDark = settings.theme === 'dark';
    }
  }

  const ariaLabel = mounted
    ? isDark
      ? 'Ganti ke mode terang'
      : 'Ganti ke mode gelap'
    : 'Ganti tema';

  return (
    <button
      onClick={toggleTheme}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleTheme();
        }
      }}
      aria-label={ariaLabel}
      className="w-10 h-10 flex items-center justify-center rounded-lg border border-border-subtle bg-transparent hover:bg-surface-container-low transition-colors duration-200 text-primary"
      style={{
        borderColor: 'color-mix(in srgb, var(--border-subtle) 80%, transparent)',
      }}
    >
      <Moon className="w-5 h-5 hidden dark:block transition-transform duration-200" style={{ color: 'var(--primary)' }} />
      <Sun className="w-5 h-5 block dark:hidden transition-transform duration-200" style={{ color: 'var(--primary)' }} />
    </button>
  );
}
