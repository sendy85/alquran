import { useEffect, useState } from 'react';

interface Settings {
  arabicFontSize: number;
  translationFontSize: number;
  showTranslation: boolean;
  showTransliteration: boolean;
  theme: 'light' | 'dark' | 'system';
  autoOpenLastRead: boolean;
}

const SETTINGS_KEY = 'alquran_settings';
const DEFAULT_SETTINGS: Settings = {
  arabicFontSize: 32,
  translationFontSize: 15,
  showTranslation: true,
  showTransliteration: false,
  theme: 'light',
  autoOpenLastRead: false,
};

const applyTheme = (theme: 'light' | 'dark' | 'system') => {
  let effectiveTheme = theme;
  if (theme === 'system') {
    effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  if (effectiveTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(stored) });
      }
      setLoaded(true);
    } catch (err) {
      console.error('Error loading settings:', err);
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        applyTheme(settings.theme);
      } catch (err) {
        console.error('Error saving settings:', err);
      }
    }
  }, [settings, loaded]);

  // Listen to system theme changes when in 'system' mode
  useEffect(() => {
    if (!loaded || settings.theme !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      applyTheme(settings.theme);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [loaded, settings.theme]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return { settings, updateSettings, loaded };
}
