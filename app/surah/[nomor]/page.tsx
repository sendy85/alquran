'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Copy, Share2, Bookmark, Settings } from 'lucide-react';
import { useSurahDetail } from '@/hooks/useSurahDetail';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useSettings } from '@/hooks/useSettings';
import { useLastRead } from '@/hooks/useLastRead';

export default function SurahPage({ params }: { params: { nomor: string } }) {
  const nomor = parseInt(params.nomor, 10);
  const { surah, loading, error } = useSurahDetail(nomor);
  const { bookmarks, addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const { settings } = useSettings();
  const { updateLastRead } = useLastRead();
  const [jumpToAyat, setJumpToAyat] = useState('');
  const [showJumpModal, setShowJumpModal] = useState(false);
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    if (!surah?.ayat) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const ayatNum = parseInt((entry.target as HTMLElement).id.replace('ayat-', ''), 10);
            if (ayatNum > 0) {
              updateLastRead(nomor, ayatNum);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('[id^="ayat-"]').forEach((el) => observer.observe(el));
    observerRef.current = observer;

    return () => observer.disconnect();
  }, [surah?.ayat, nomor, updateLastRead]);

  const handleJumpToAyat = useCallback(() => {
    const ayatNum = parseInt(jumpToAyat, 10);
    if (ayatNum > 0 && ayatNum <= (surah?.jumlahAyat || 0)) {
      const element = document.getElementById(`ayat-${ayatNum}`);
      element?.scrollIntoView({ behavior: 'smooth' });
      setShowJumpModal(false);
      setJumpToAyat('');
    }
  }, [jumpToAyat, surah?.jumlahAyat]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showJumpModal) return;
      if (e.key === 'Escape') {
        setShowJumpModal(false);
      } else if (e.key === 'Enter') {
        handleJumpToAyat();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showJumpModal, jumpToAyat, handleJumpToAyat]);

  const handleCopyAyat = useCallback((ayatNum: number, teksArab: string, teksIndonesia: string) => {
    const text = `${teksArab}\n\n${teksIndonesia}\n\n${surah.namaLatin}:${ayatNum}`;
    navigator.clipboard.writeText(text).then(() => {
      alert('Ayat disalin');
    });
  }, [surah?.namaLatin]);

  const handleShareAyat = useCallback((ayatNum: number) => {
    if (navigator.share) {
      navigator.share({
        title: `${surah.namaLatin}:${ayatNum}`,
        text: `Baca ${surah.namaLatin} ayat ${ayatNum} di Al-Qur'an Digital`,
        url: `${window.location.origin}/surah/${nomor}#ayat-${ayatNum}`,
      });
    }
  }, [surah?.namaLatin, nomor]);

  const handleToggleBookmark = useCallback((ayatNum: number, teksArab: string, teksIndonesia: string) => {
    if (isBookmarked(nomor, ayatNum)) {
      removeBookmark(nomor, ayatNum);
    } else {
      addBookmark({
        surah: nomor,
        ayat: ayatNum,
        teksArab,
        teksIndonesia,
      });
    }
  }, [nomor, isBookmarked, addBookmark, removeBookmark]);

  if (error) {
    return (
      <div style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }} className="min-h-screen p-4 pt-5 md:pt-20">
        <div className="max-w-reading-container mx-auto">
          <p className="text-red-600">Gagal memuat surah. Coba refresh halaman.</p>
        </div>
      </div>
    );
  }

  if (!loading && !surah) {
    return (
      <div style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }} className="min-h-screen p-4 pt-5 md:pt-20">
        <div className="max-w-reading-container mx-auto">
          <p className="text-text-secondary">Surah tidak ditemukan.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', paddingBottom: 'calc(5rem + env(safe-area-inset-bottom))' }} className="min-h-screen pt-5 md:pt-20 md:pb-0">
      <div className="max-w-reading-container mx-auto px-4 md:px-8">
        {loading ? (
          <div className="mt-8 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-32 bg-surface-container-low rounded-md animate-pulse" />
            ))}
          </div>
        ) : surah ? (
          <>
            <header className="relative md:sticky md:top-16 bg-surface z-40 py-4 border-b border-border-subtle mb-6">
              <div className="flex items-center justify-between gap-2 mb-3">
                <Link
                  href="/"
                  className="flex items-center gap-2 px-3 py-2 text-primary hover:bg-surface-container-low rounded-md transition"
                >
                  <ChevronLeft size={20} />
                  <span className="text-sm font-medium hidden sm:inline">Kembali</span>
                </Link>
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-serif-heading font-bold">{surah.namaLatin}</h1>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowJumpModal(true)}
                    className="px-4 py-2 bg-primary text-primary-contrast rounded-md text-sm font-medium"
                  >
                    Lompat
                  </button>
                  <Link
                    href="/settings"
                    className="p-2 text-primary hover:bg-surface-container-low rounded-md transition"
                    title="Pengaturan tampilan"
                  >
                    <Settings size={20} />
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-text-secondary">
                <span>Surah {nomor}</span>
                <span>{surah.arti} • {surah.jumlahAyat} Ayat • {surah.tempatTurun}</span>
              </div>
            </header>

            <div
              className="mb-8 p-6 rounded-lg text-center"
              style={{
                backgroundColor: 'var(--hero-bg)',
                color: 'var(--hero-fg)',
              }}
            >
              <p className="font-arabic text-3xl leading-loose">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
              <p className="text-sm mt-2 opacity-90">Dengan nama Allah Yang Maha Pengasih, Maha Penyayang</p>
            </div>

            <div className="space-y-8 mb-8">
              {surah.ayat?.map((ayat: any, idx: number) => (
                <div key={idx} id={`ayat-${ayat.nomorAyat}`} className="pb-6 border-b border-border-subtle">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary text-primary-contrast rounded-full text-xs font-medium">
                      {ayat.nomorAyat}
                    </span>
                    <p
                      className="font-arabic leading-loose text-text-primary flex-1"
                      lang="ar"
                      dir="rtl"
                      style={{ fontSize: `${settings.arabicFontSize}px` }}
                    >
                      {ayat.teksArab}
                    </p>
                  </div>

                  {settings.showTransliteration && ayat.teksLatin && (
                    <p className="text-sm text-text-tertiary italic mb-2 ml-11">{ayat.teksLatin}</p>
                  )}

                  {settings.showTranslation && (
                    <p
                      className="text-text-secondary leading-relaxed mb-3 ml-11"
                      style={{ fontSize: `${settings.translationFontSize}px` }}
                    >
                      {ayat.teksIndonesia}
                    </p>
                  )}

                  <div className="flex gap-2 ml-11 flex-wrap">
                    <button
                      onClick={() => handleToggleBookmark(ayat.nomorAyat, ayat.teksArab, ayat.teksIndonesia)}
                      className={`flex items-center gap-1 px-3 py-1 text-xs rounded-md transition ${
                        isBookmarked(nomor, ayat.nomorAyat)
                          ? 'bg-secondary-gold text-primary'
                          : 'text-text-secondary hover:text-primary'
                      }`}
                    >
                      <Bookmark size={16} fill={isBookmarked(nomor, ayat.nomorAyat) ? 'currentColor' : 'none'} />
                      {isBookmarked(nomor, ayat.nomorAyat) ? 'Tersimpan' : 'Simpan'}
                    </button>
                    <button
                      onClick={() => handleCopyAyat(ayat.nomorAyat, ayat.teksArab, ayat.teksIndonesia)}
                      className="flex items-center gap-1 px-3 py-1 text-xs text-text-secondary hover:text-primary transition"
                    >
                      <Copy size={16} /> Salin
                    </button>
                    <button
                      onClick={() => handleShareAyat(ayat.nomorAyat)}
                      className="flex items-center gap-1 px-3 py-1 text-xs text-text-secondary hover:text-primary transition"
                    >
                      <Share2 size={16} /> Bagikan
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <nav className="flex justify-between items-center py-6 border-t border-border-subtle mb-8">
              {nomor > 1 ? (
                <Link href={`/surah/${nomor - 1}`} className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-surface-container-low rounded-md transition">
                  <ChevronLeft size={20} /> Surah Sebelumnya
                </Link>
              ) : (
                <div />
              )}
              {nomor < 114 ? (
                <Link href={`/surah/${nomor + 1}`} className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-surface-container-low rounded-md transition">
                  Surah Berikutnya <ChevronRight size={20} />
                </Link>
              ) : (
                <div />
              )}
            </nav>
          </>
        ) : null}
      </div>

      {showJumpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-50">
          <div className="bg-surface-container-lowest w-full md:w-[520px] rounded-t-lg md:rounded-lg p-6 md:shadow-subtle">
            <h3 className="text-lg font-bold mb-4">Lompat ke Ayat</h3>
            <p className="text-text-secondary text-sm mb-3">Surah ini memiliki {surah?.jumlahAyat} ayat</p>
            <div className="flex gap-2">
              <input
                type="number"
                min="1"
                max={surah?.jumlahAyat}
                value={jumpToAyat}
                onChange={(e) => setJumpToAyat(e.target.value)}
                placeholder="Nomor ayat..."
                className="flex-1 px-3 py-2 border border-border-subtle rounded-md bg-surface text-text-primary"
                autoFocus
              />
              <button
                onClick={handleJumpToAyat}
                disabled={!jumpToAyat}
                className="px-4 py-2 bg-primary text-primary-contrast rounded-md font-medium disabled:opacity-50"
              >
                Buka
              </button>
            </div>
            <button
              onClick={() => setShowJumpModal(false)}
              className="w-full mt-3 py-2 text-text-secondary hover:text-text-primary transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
