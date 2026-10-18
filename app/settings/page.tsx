'use client';

import { useState, useEffect } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useLastRead } from '@/hooks/useLastRead';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { Toast } from '@/components/Toast';
import { InstallAppCard } from '@/components/InstallAppCard';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const STORAGE_KEYS = ['alquran_settings', 'alquran_bookmarks', 'alquran_last_read'];

type TabType = 'font-size' | 'display' | 'app' | 'data';

export default function SettingsPage() {
  const { settings, updateSettings, loaded } = useSettings();
  const { bookmarks } = useBookmarks();
  const { lastRead } = useLastRead();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('font-size');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const hash = window.location.hash.slice(1);
    if (['font-size', 'display', 'app', 'data'].includes(hash)) {
      setActiveTab(hash as TabType);
    } else if (hash === 'theme') {
      // Redirect old #theme to first tab
      window.history.replaceState(null, '', '#font-size');
      setActiveTab('font-size');
    }
  }, [mounted]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    window.history.replaceState(null, '', `#${tab}`);
  };

  if (!mounted || !loaded) {
    return (
      <div style={{ backgroundColor: 'var(--surface)' }} className="min-h-screen p-4 pt-4 md:pt-20">
        <div className="max-w-reading-container mx-auto">
          <div className="h-96 bg-surface-container-low rounded-md animate-pulse" />
        </div>
      </div>
    );
  }

  const handleDeleteAllData = async () => {
    setIsDeleting(true);
    try {
      STORAGE_KEYS.forEach((key) => {
        try {
          localStorage.removeItem(key);
        } catch (err) {
          console.error(`Error removing ${key}:`, err);
        }
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      updateSettings({
        arabicFontSize: 32,
        translationFontSize: 15,
        showTranslation: true,
        showTransliteration: false,
        theme: 'system',
        autoOpenLastRead: false,
      });

      setShowConfirmDialog(false);
      setToast({ message: 'Data berhasil dihapus.', type: 'success' });

      if (typeof window !== 'undefined') {
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (systemDark) {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.removeAttribute('data-theme');
        }
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) metaThemeColor.setAttribute('content', systemDark ? '#121816' : '#1B4332');
      }
    } catch (err) {
      console.error('Delete error:', err);
      setToast({ message: 'Data tidak bisa dihapus saat ini. Coba muat ulang halaman.', type: 'error' });
    } finally {
      setIsDeleting(false);
    }
  };

  const bookmarkCount = bookmarks?.length || 0;

  const tabs: { id: TabType; label: string }[] = [
    { id: 'font-size', label: 'Ukuran Teks' },
    { id: 'display', label: 'Tampilan' },
    { id: 'app', label: 'Aplikasi' },
    { id: 'data', label: 'Data' },
  ];

  return (
    <div style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', paddingBottom: 'calc(5rem + env(safe-area-inset-bottom))' }} className="min-h-screen pt-4 md:pt-20 md:pb-0">
      <div className="max-w-reading-container mx-auto px-4 md:px-8">
        <header className="mb-6 mt-4">
          <h1 className="text-3xl md:text-4xl font-serif-heading font-bold">Pengaturan</h1>
        </header>

        {/* Tab bar */}
        <div className="mb-8 -mx-4 md:mx-0 px-4 md:px-0 overflow-x-auto md:overflow-x-visible">
          <div className="flex gap-2 md:gap-2 md:flex-wrap min-w-max md:min-w-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 py-3 text-sm font-medium rounded-md whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-contrast'
                    : 'bg-surface-container-low text-text-secondary hover:bg-surface-container-lowest'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="space-y-0">
          {/* Font Size Tab */}
          {activeTab === 'font-size' && (
            <section className="p-6 bg-surface-container-lowest rounded-lg border border-border-subtle">
              <h2 className="text-xl font-semibold mb-4">Ukuran Font</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Teks Arab: {settings.arabicFontSize}px
                </label>
                <input
                   type="range"
                   min="24"
                   max="42"
                   value={settings.arabicFontSize}
                   onChange={(e) => updateSettings({ arabicFontSize: parseInt(e.target.value, 10) })}
                   className="w-full"
                />
                <div className="mt-3 p-3 bg-surface rounded-md">
                  <p className="font-arabic text-center leading-loose" style={{ fontSize: `${settings.arabicFontSize}px` }}>
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Terjemahan: {settings.translationFontSize}px
                </label>
                <input
                  type="range"
                  min="13"
                  max="24"
                  value={settings.translationFontSize}
                  onChange={(e) => updateSettings({ translationFontSize: parseInt(e.target.value, 10) })}
                  className="w-full"
                />
                <div className="mt-3 p-3 bg-surface rounded-md">
                  <p style={{ fontSize: `${settings.translationFontSize}px` }}>
                    Dengan nama Allah Yang Maha Pengasih, Maha Penyayang
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Display Tab */}
          {activeTab === 'display' && (
            <section className="p-6 bg-surface-container-lowest rounded-lg border border-border-subtle">
              <h2 className="text-xl font-semibold mb-4">Tampilan</h2>
              
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-surface rounded-md transition">
                  <input
                    type="checkbox"
                    checked={settings.showTranslation}
                    onChange={(e) => updateSettings({ showTranslation: e.target.checked })}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span className="text-sm">Tampilkan Terjemahan Bahasa Indonesia</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-surface rounded-md transition">
                  <input
                    type="checkbox"
                    checked={settings.showTransliteration}
                    onChange={(e) => updateSettings({ showTransliteration: e.target.checked })}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span className="text-sm">Tampilkan Transliterasi Latin</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-surface rounded-md transition">
                  <input
                    type="checkbox"
                    checked={settings.autoOpenLastRead}
                    onChange={(e) => updateSettings({ autoOpenLastRead: e.target.checked })}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span className="text-sm">Buka otomatis ke bacaan terakhir saat web dibuka</span>
                </label>
              </div>
            </section>
          )}

            {/* App Tab */}
            {activeTab === 'app' && (
              <InstallAppCard />
            )}


          {/* Data Tab */}
          {activeTab === 'data' && (
            <section className="p-6 bg-surface-container-lowest rounded-lg border border-border-subtle">
              <h2 className="text-xl font-semibold mb-4">Data Tersimpan di Perangkat Ini</h2>
              <p className="text-sm text-text-secondary mb-2">
                Pengaturan tampilan, penanda ayat (bookmark), dan bacaan terakhir Anda disimpan di perangkat ini saja. Data tidak dikirim ke mana pun dan tidak perlu akun.
              </p>
              <p className="text-sm text-text-secondary mb-4">
                Karena itu, data tidak ikut berpindah ke HP atau komputer lain. Data juga bisa hilang jika Anda menghapus data atau riwayat browser, atau membuka lewat mode penyamaran (incognito).
              </p>
              <button
                onClick={() => setShowConfirmDialog(true)}
                disabled={isDeleting}
                className="px-4 py-2 bg-danger hover:opacity-90 transition text-white rounded-md text-sm font-medium disabled:opacity-50"
                style={{ backgroundColor: 'var(--danger)' }}
              >
                {isDeleting ? 'Menghapus...' : 'Hapus Semua Data'}
              </button>
              <p className="text-xs text-text-tertiary mt-2">
                Tombol ini menghapus semua pengaturan, penanda ayat, dan bacaan terakhir dari perangkat ini. Tindakan ini tidak bisa dibatalkan.
              </p>
            </section>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirmDialog}
        title="Hapus semua data?"
        message="Semua pengaturan tampilan, penanda ayat (bookmark), dan bacaan terakhir di perangkat ini akan dihapus. Tindakan ini tidak bisa dibatalkan."
        bookmarkCount={bookmarkCount}
        cancelLabel="Batal"
        confirmLabel="Ya, Hapus Semua"
        onCancel={() => setShowConfirmDialog(false)}
        onConfirm={handleDeleteAllData}
        isDangerous
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={4000}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

