'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Toast } from './Toast';
import { useInstallPrompt, useInstallPromptActions } from '@/hooks/useInstallPrompt';

type Platform = 'ios' | 'android' | 'desktop' | 'inapp' | 'other';

function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'other';
  const ua = navigator.userAgent;
  if (/FBAN|FBAV|Instagram|Line\/|MicroMessenger|TikTok|BytedanceWebview/i.test(ua)) return 'inapp';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  if (/Windows|Macintosh|Linux/i.test(ua)) return 'desktop';
  return 'other';
}

export function InstallAppCard() {
  const [mounted, setMounted] = useState(false);
  const [manual, setManual] = useState<Platform | null>(null);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  const { ready, canPrompt, installed } = useInstallPrompt();
  const { promptInstall } = useInstallPromptActions();

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleInstall() {
    if (busy) return;
    setBusy(true);
    const outcome = await promptInstall();
    setBusy(false);
    if (outcome === 'accepted') {
      setToast({ message: 'Aplikasi dipasang.', type: 'success' });
    } else if (outcome === 'dismissed') {
      setToast({ message: 'Pemasangan dibatalkan.', type: 'error' });
    } else {
      setManual(detectPlatform());
    }
  }

  const getGuideText = useCallback(() => {
    if (!manual) return '';
    switch (manual) {
      case 'ios': return 'Ketuk tombol Bagikan di Safari, lalu pilih \'Tambah ke Layar Utama\'.';
      case 'android': return 'Pemasangan langsung belum tersedia saat ini. Ketuk menu titik tiga di browser, lalu pilih \'Instal aplikasi\'.';
      case 'desktop': return 'Klik ikon Pasang di ujung kanan bilah alamat browser, atau buka menu browser lalu pilih \'Instal\'.';
      case 'inapp': return 'Buka halaman ini di Chrome atau Safari untuk memasang aplikasi.';
      default: return 'Buka menu browser Anda lalu pilih opsi \'Instal\' atau \'Tambahkan ke Layar Utama\'.';
    }
  }, [manual]);

  if (!mounted) return null;

  return (
    <section className="p-6 bg-surface-container-lowest rounded-lg border border-border-subtle">
      <h2 className="text-xl font-semibold mb-3">Unduh Aplikasi</h2>
      
      {installed ? (
        <p className="text-sm text-text-secondary font-medium py-2">
          Aplikasi sudah terpasang di perangkat ini.
        </p>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-text-secondary leading-relaxed">
            Tekan tombol di bawah untuk mengunduh dan memasang Al-Qur'an Digital di HP atau komputer Anda. Setelah terpasang, aplikasi bisa dibuka dari layar utama seperti aplikasi biasa, dan halaman yang pernah dibuka tetap bisa dibaca tanpa internet.
          </p>
          <p className="text-sm text-text-secondary">
            Setelah ditekan, akan muncul jendela konfirmasi dari browser. Pilih 'Instal' atau 'Pasang' untuk melanjutkan.
          </p>
          <button
            onClick={handleInstall}
            disabled={busy}
            className="w-full sm:w-auto min-h-[44px] px-6 py-3 bg-primary text-primary-contrast rounded-md font-medium hover:opacity-90 transition text-sm flex items-center justify-center text-center gap-2 disabled:opacity-50"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z" />
            </svg>
            {busy ? 'Memproses...' : 'Unduh & Pasang Aplikasi'}
          </button>

          {manual && (
            <div className="mt-4 p-4 bg-surface rounded-md border border-border-subtle text-sm text-text-secondary leading-relaxed">
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
