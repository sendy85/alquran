'use client';

import React, { useEffect, useState } from 'react';
import { Moon, Sun, Download, X } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function HeaderControls() {
  const { settings, toggleTheme, loaded } = useSettings();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [installGuideType, setInstallGuideType] = useState<'ios' | 'android' | 'desktop' | 'other'>('other');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // Check if standalone or already installed
    if (typeof window !== 'undefined') {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone === true;
      if (isStandalone) {
        setIsInstalled(true);
      }

      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
      };

      const handleAppInstalled = () => {
        setIsInstalled(true);
        setDeferredPrompt(null);
        setToastMessage('Aplikasi dipasang.');
        setTimeout(() => setToastMessage(null), 3000);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.addEventListener('appinstalled', handleAppInstalled);

      // Detect device type for instructions
      const ua = navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(ua)) {
        setInstallGuideType('ios');
      } else if (/android/.test(ua)) {
        setInstallGuideType('android');
      } else {
        setInstallGuideType('desktop');
      }

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.removeEventListener('appinstalled', handleAppInstalled);
      };
    }
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
          setToastMessage('Aplikasi dipasang.');
          setIsInstalled(true);
        } else {
          setToastMessage('Pemasangan dibatalkan.');
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.error('Install prompt error:', err);
      }
      setTimeout(() => setToastMessage(null), 3000);
    } else {
      setShowInstallModal(true);
    }
  };

  // Determine current active theme for icon display
  let currentTheme = settings.theme;
  if (currentTheme === 'system' && loaded) {
    currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return (
    <div className="flex items-center gap-2">
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        aria-label={currentTheme === 'dark' ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
        className="w-11 h-11 flex items-center justify-center rounded-full border border-border-subtle bg-surface hover:bg-surface-container-low transition active:scale-95 text-text-primary"
      >
        <Moon className="w-5 h-5 hidden dark:block transition-transform duration-200" />
        <Sun className="w-5 h-5 block dark:hidden transition-transform duration-200" />
      </button>

      {/* Install App Button (hidden if installed) */}
      {!isInstalled && (
        <button
          onClick={handleInstallClick}
          aria-label="Pasang aplikasi Al-Qur'an Digital di perangkat ini"
          className="h-11 px-3 md:px-4 flex items-center justify-center gap-2 rounded-full border border-border-subtle bg-surface hover:bg-surface-container-low transition active:scale-95 text-text-primary text-sm font-medium"
        >
          <Download className="w-5 h-5 flex-shrink-0 text-primary" />
          <span className="hidden md:inline">Pasang Aplikasi</span>
        </button>
      )}

      {/* Install Guide Modal */}
      {showInstallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface border border-border-subtle rounded-2xl p-6 max-w-sm w-full shadow-xl relative animate-scaleUp">
            <button
              onClick={() => setShowInstallModal(false)}
              className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-text-primary mb-3">Pasang Aplikasi</h3>
            <div className="text-sm text-text-secondary space-y-2 mb-5">
              {installGuideType === 'ios' && (
                <p>Ketuk tombol <strong>Bagikan</strong> di Safari, lalu pilih <strong>'Tambah ke Layar Utama'</strong>.</p>
              )}
              {installGuideType === 'android' && (
                <p>Ketuk menu titik tiga di browser, lalu pilih <strong>'Instal aplikasi'</strong> atau <strong>'Tambahkan ke layar utama'</strong>.</p>
              )}
              {installGuideType === 'desktop' && (
                <p>Klik ikon Pasang di ujung kanan bilah alamat browser, atau buka menu browser lalu pilih <strong>'Instal'</strong>.</p>
              )}
              {installGuideType === 'other' && (
                <p>Gunakan menu browser Anda untuk menambahkan aplikasi ini ke layar utama.</p>
              )}
            </div>
            <button
              onClick={() => setShowInstallModal(false)}
              className="w-full py-2.5 bg-primary text-primary-contrast rounded-xl font-medium transition hover:opacity-90"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-16 md:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-primary text-primary-contrast px-4 py-2 rounded-xl shadow-lg text-sm font-medium animate-bounce">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
