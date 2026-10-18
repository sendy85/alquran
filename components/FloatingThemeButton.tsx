'use client';

import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';

export function FloatingThemeButton() {
  const { toggleTheme, settings, loaded } = useSettings();
  const [mounted, setMounted] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      const timeout = setTimeout(() => {
        setIsScrolling(false);
      }, 600);

      setScrollTimeout(timeout);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

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
      className={`
        md:hidden
        fixed
        w-10 h-10
        flex items-center justify-center
        rounded-full
        border
        transition-all
        duration-300
        ${isScrolling ? 'opacity-40' : 'opacity-100'}
      `}
      style={{
        right: 'calc(16px + env(safe-area-inset-right))',
        bottom: 'calc(72px + env(safe-area-inset-bottom) + 16px)',
        backgroundColor: 'color-mix(in srgb, var(--surface-container-lowest) 65%, transparent)',
        borderColor: 'color-mix(in srgb, var(--border-subtle) 70%, transparent)',
        boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.1)',
        zIndex: 45,
        minWidth: '44px',
        minHeight: '44px',
        padding: '2px',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'color-mix(in srgb, var(--surface-container-lowest) 85%, transparent)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'color-mix(in srgb, var(--surface-container-lowest) 65%, transparent)';
      }}
      onFocus={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'color-mix(in srgb, var(--surface-container-lowest) 85%, transparent)';
        (e.currentTarget as HTMLButtonElement).style.outline = '2px solid var(--primary)';
        (e.currentTarget as HTMLButtonElement).style.outlineOffset = '2px';
      }}
      onBlur={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'color-mix(in srgb, var(--surface-container-lowest) 65%, transparent)';
        (e.currentTarget as HTMLButtonElement).style.outline = 'none';
      }}
    >
      <Moon className="w-5 h-5 hidden dark:block text-primary transition-transform duration-200" style={{ color: 'var(--primary)' }} />
      <Sun className="w-5 h-5 block dark:hidden text-primary transition-transform duration-200" style={{ color: 'var(--primary)' }} />
    </button>
  );
}
