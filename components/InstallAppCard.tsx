'use client';

import React, { useEffect, useState } from 'react';
import { Toast } from './Toast';
import { useInstallPrompt, useInstallPromptActions } from '@/hooks/useInstallPrompt';

export function InstallAppCard() {
  const [mounted, setMounted] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [guideType, setGuideType] = useState<'ios-safari' | 'ios-other' | 'android' | 'desktop' | 'other'>('other');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  const { isAvailable, isInstalled } = useInstallPrompt();
  const { triggerInstall } = useInstallPromptActions();

  useEffect(() => {
    setMounted(true);

    if (typeof window !== 'undefined') {
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
    }
  }, []);

  const handleInstallClick = async () => {
    if (isAvailable) {
      const outcome = await triggerInstall();
      if (outcome === 'accepted') {
        setToast({ message: 'Aplikasi dipasang.', type: 'success' });
      } else if (outcome === 'dismissed') {
        setToast({ message: 'Pemasangan dibatalkan.', type: 'error' });
      } else {
        setShowGuide(true);
      }
    } else {
      setShowGuide(true);
    }
  };

  const getGuideText = () => {
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent.toLowerCase();
      const isInAppBrowser = /fban|fbav|instagram|line|micromessenger|tiktok|bytedancewebview/.test(ua);
      
      if (isInAppBrowser) {
        return 'Buka halaman ini di Chrome atau Safari untuk memasang aplikasi.';
      }
    }

    switch (guideType) {
      case 'ios-safari':
        return 'Ketuk tombol Bagikan di Safari, lalu pilih \'Tambah ke Layar Utama\'.';
      case 'ios-other':
        return 'Buka alamat ini di Safari terlebih dulu.';
      case 'android':
        return 'Pemasangan langsung belum tersedia saat ini. Ketuk menu titik tiga di browser, lalu pilih \'Instal aplikasi\'.';
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
            className="w-full sm:w-auto min-h-[44px] px-6 py-3 bg-primary text-primary-contrast rounded-md font-medium hover:opacity-90 transition text-sm flex items-center justify-center text-center gap-2"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 16l-5-5h3V4h4v7h3l-5 5zm9 4v-2h-2v2H5v-2H3v2a2 2 0 002 2h14a2 2 0 002-2z" />
            </svg>
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
