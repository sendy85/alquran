'use client';

import { useState, useEffect } from 'react';
import { useSettings } from '@/hooks/useSettings';

export default function SettingsPage() {
  const { settings, updateSettings, loaded } = useSettings();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !loaded) {
    return (
      <div style={{ backgroundColor: 'var(--surface)' }} className="min-h-screen p-4 pt-5 md:pt-20">
        <div className="max-w-reading-container mx-auto">
          <div className="h-96 bg-surface-container-low rounded-md animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', paddingBottom: 'calc(5rem + env(safe-area-inset-bottom))' }} className="min-h-screen pt-5 md:pt-20 md:pb-0">
      <div className="max-w-reading-container mx-auto px-4 md:px-8">
        <header className="mb-8 mt-6">
          <h1 className="text-3xl md:text-4xl font-serif-heading font-bold">Pengaturan</h1>
          <p className="text-text-secondary mt-2">Sesuaikan preferensi membaca Anda</p>
        </header>

        <div className="space-y-8 mb-8">
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

          <section className="p-6 bg-surface-container-lowest rounded-lg border border-border-subtle">
            <h2 className="text-xl font-semibold mb-4">Tema</h2>
            
            <div className="space-y-4">
               <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-surface rounded-md transition">
                 <input
                   type="radio"
                   name="theme"
                   value="light"
                   checked={settings.theme === 'light'}
                   onChange={(e) => updateSettings({ theme: e.target.value as any })}
                   className="w-5 h-5 cursor-pointer"
                 />
                 <span className="text-sm">Mode Terang</span>
               </label>

               <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-surface rounded-md transition">
                 <input
                   type="radio"
                   name="theme"
                   value="dark"
                   checked={settings.theme === 'dark'}
                   onChange={(e) => updateSettings({ theme: e.target.value as any })}
                   className="w-5 h-5 cursor-pointer"
                 />
                 <span className="text-sm">Mode Gelap</span>
               </label>

               <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-surface rounded-md transition">
                 <input
                   type="radio"
                   name="theme"
                   value="system"
                   checked={settings.theme === 'system'}
                   onChange={(e) => updateSettings({ theme: e.target.value as any })}
                   className="w-5 h-5 cursor-pointer"
                 />
                 <span className="text-sm">Ikuti Sistem</span>
               </label>
             </div>
          </section>

          <section className="p-6 bg-surface-container-lowest rounded-lg border border-border-subtle">
            <h2 className="text-xl font-semibold mb-4">Tentang & Penyimpanan</h2>
            <p className="text-sm text-text-secondary mb-3">
              Semua pengaturan dan bookmark disimpan secara lokal di perangkat Anda menggunakan localStorage. Data tidak dikirim ke server mana pun.
            </p>
            <button
              onClick={() => {
                if (confirm('Hapus semua data lokal? Tindakan ini tidak dapat dibatalkan.')) {
                  localStorage.clear();
                  alert('Semua data telah dihapus. Silakan refresh halaman.');
                }
              }}
              className="px-4 py-2 bg-danger hover:opacity-90 transition text-white rounded-md text-sm font-medium"
              style={{ backgroundColor: 'var(--danger)' }}
            >
              Hapus Semua Data
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
