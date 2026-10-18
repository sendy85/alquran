'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Toast } from './Toast';
import { useInstallPrompt, useInstallPromptActions } from '@/hooks/useInstallPrompt';
import { APK_URL, APK_FILENAME } from '@/lib/apkConfig';

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
  const [apkValid, setApkValid] = useState<boolean | null>(null);
  
  const { ready, canPrompt, installed } = useInstallPrompt();
  const { promptInstall } = useInstallPromptActions();

  useEffect(() => {
    setMounted(true);
    fetch(APK_URL, { method: 'HEAD' })
      .then(res => setApkValid(res.ok))
      .catch(() => setApkValid(false));
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
      <h2 className="text-xl font-semibold mb-3">Pasang Aplikasi</h2>
      
      {installed ? (
        <p className="text-sm text-text-secondary font-medium py-2">
          Aplikasi sudah terpasang di perangkat ini.
        </p>
      ) : (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Unduh APK (Android)</h3>
            {apkValid === false ? (
              <p className="text-sm text-danger">APK belum tersedia, coba lagi nanti.</p>
            ) : (
              <a
                href={APK_URL}
                download={APK_FILENAME}
                className="w-full sm:w-auto min-h-[44px] px-6 py-3 bg-primary text-primary-contrast rounded-md font-medium hover:opacity-90 transition text-sm flex items-center justify-center text-center gap-2"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z" />
                </svg>
                Unduh APK
              </a>
            )}
          </div>

          <div className="border-t border-border-subtle pt-6">
            <h3 className="font-medium mb-4">Pasang lewat Browser (PWA)</h3>
            <button
              onClick={handleInstall}
              disabled={busy}
              className="w-full sm:w-auto min-h-[44px] px-6 py-3 bg-primary text-primary-contrast rounded-md font-medium hover:opacity-90 transition text-sm flex items-center justify-center text-center gap-2 disabled:opacity-50"
            >
              {busy ? 'Memproses...' : 'Pasang Aplikasi'}
            </button>

            {manual && (
              <div className="mt-4 p-4 bg-surface rounded-md border border-border-subtle text-sm text-text-secondary leading-relaxed">
                {getGuideText()}
              </div>
            )}
          </div>
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
