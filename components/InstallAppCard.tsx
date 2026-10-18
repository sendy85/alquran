'use client';

import React, { useEffect, useState } from 'react';
import { Toast } from './Toast';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function InstallAppCard() {
  const [mounted, setMounted] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const [guideType, setGuideType] = useState<'ios-safari' | 'ios-other' | 'android' | 'desktop' | 'other'>('other');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    setMounted(true);

    if (typeof window !== 'undefined') {
      const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (navigator as any).standalone === true;

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
        setToast({ message: 'Aplikasi dipasang.', type: 'success' });
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.addEventListener('appinstalled', handleAppInstalled);

      const ua = navigator.userAgent.toLowerCase();
      const isIOS = /iphone|ipad|ipod/.test(ua);
      const isSafari = isIOS && /safari/.test(ua) && !/crios|fxios|opt|edgios/.test(ua);

      if (isIOS) {
        setGuideType(isSafari ? 'ios-safari' : 'ios-other');
      } else if (/android/.test(ua)) {
        setGuideType('android');
      } else {
        setGuideType('desktop');
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
          setToast({ message: 'Aplikasi dipasang.', type: 'success' });
          setIsInstalled(true);
        } else {
          setToast({ message: 'Pemasangan dibatalkan.', type: 'error' });
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.error('Install prompt error:', err);
        setShowGuide(true);
      }
    } else {
      setShowGuide(true);
    }
  };

  const getGuideText = () => {
    switch (guideType) {
      case 'ios-safari':
        return 'Ketuk tombol Bagikan di Safari, lalu pilih \'Tambah ke Layar Utama\'.';
      case 'ios-other':
        return 'Buka alamat ini di Safari terlebih dulu.';
      case 'android':
        return 'Ketuk menu titik tiga di browser, lalu pilih \'Instal aplikasi\' atau \'Tambahkan ke layar utama\'.';
      case 'desktop':
        return 'Klik ikon Pasang di ujung kanan bilah alamat browser, atau buka menu browser lalu pilih \'Instal\'.';
      default:
        return 'Buka menu browser Anda lalu pilih opsi \'Instal\' atau \'Tambahkan ke Layar Utama\'.';
    }
  };

  return (
    <section className="p-6 bg-surface-container-lowest rounded-lg border border-border-subtle">
      <h2 className="text-xl font-semibold mb-3">Pasang Sebagai Aplikasi</h2>
      <p className="text-sm text-text-secondary leading-relaxed mb-6">
        Pasang Al-Qur'an Digital di layar utama HP atau komputer Anda agar bisa dibuka seperti aplikasi biasa. Halaman yang pernah dibuka tetap bisa dibaca tanpa internet. Tidak perlu lewat toko aplikasi.
      </p>

      {mounted && isInstalled ? (
        <p className="text-sm text-text-secondary font-medium py-2">
          Aplikasi sudah terpasang di perangkat ini.
        </p>
      ) : (
        <div className="space-y-4">
          <button
            onClick={handleInstallClick}
            className="w-full sm:w-auto min-h-[44px] px-6 py-3 bg-primary text-primary-contrast rounded-md font-medium hover:opacity-90 transition text-sm flex items-center justify-center text-center"
          >
            Pasang Aplikasi
          </button>

          {mounted && showGuide && (
            <div className="p-4 bg-surface rounded-md border border-border-subtle text-sm text-text-secondary leading-relaxed">
              {getGuideText()}
            </div>
          )}
        </div>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={3000}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
}
