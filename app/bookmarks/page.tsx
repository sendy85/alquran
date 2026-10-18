'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, Copy, Share2 } from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useSurahs } from '@/hooks/useSurahs';
import { useLastRead } from '@/hooks/useLastRead';
import { useSurahDetail } from '@/hooks/useSurahDetail';
import { LastReadCard } from '@/components/LastReadCard';

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarks();
  const { surahs } = useSurahs();
  const { lastRead } = useLastRead();
  const { surah: lastReadSurah } = useSurahDetail(lastRead?.surah || 0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ backgroundColor: 'var(--surface)' }} className="min-h-screen p-4 pt-4 md:pt-20">
        <div className="max-w-reading-container mx-auto">
          <div className="h-96 bg-surface-container-low rounded-md animate-pulse" />
        </div>
      </div>
    );
  }

  const getSurahName = (surahNum: number) => {
    const surah = surahs.find((s: any) => s.nomor === surahNum);
    return surah?.namaLatin || `Surah ${surahNum}`;
  };

  const handleCopy = (bookmark: any) => {
    const text = `${bookmark.teksArab}\n\n${bookmark.teksIndonesia}\n\n${getSurahName(bookmark.surah)}:${bookmark.ayat}`;
    navigator.clipboard.writeText(text).then(() => {
      alert('Ayat disalin');
    });
  };

  const handleShare = (bookmark: any) => {
    if (navigator.share) {
      navigator.share({
        title: `${getSurahName(bookmark.surah)}:${bookmark.ayat}`,
        text: `Baca ${getSurahName(bookmark.surah)} ayat ${bookmark.ayat}`,
        url: `${window.location.origin}/surah/${bookmark.surah}#ayat-${bookmark.ayat}`,
      });
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', paddingBottom: 'calc(5rem + env(safe-area-inset-bottom))' }} className="min-h-screen pt-4 md:pt-20 md:pb-0">
      <div className="max-w-reading-container mx-auto px-4 md:px-8">
        <header className="mb-8 mt-6">
          <h1 className="text-3xl md:text-4xl font-serif-heading font-bold">Bookmark</h1>
          <p className="text-text-secondary mt-2">{bookmarks.length} Ayat tersimpan</p>
        </header>

        <LastReadCard lastRead={lastRead} surahData={lastReadSurah} showEmpty={false} />

        {bookmarks.length === 0 ? (
          <div className="p-8 text-center bg-surface-container-lowest rounded-lg border border-border-subtle">
            <p className="text-text-secondary mb-4">Tidak ada bookmark. Mulai dengan mengklik ikon bookmark pada halaman surah.</p>
            <Link href="/surahs" className="inline-block px-6 py-2 bg-primary text-primary-contrast rounded-md font-medium">
              Jelajahi Surah
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {bookmarks.map((bookmark, idx) => (
              <div key={idx} className="p-4 bg-surface-container-lowest rounded-lg border border-border-subtle">
                <div className="flex justify-between items-start mb-3">
                  <Link
                    href={`/surah/${bookmark.surah}#ayat-${bookmark.ayat}`}
                    className="flex-1 hover:text-primary transition"
                  >
                    <p className="font-semibold text-primary">{getSurahName(bookmark.surah)}</p>
                    <p className="text-xs text-text-tertiary mt-1">Ayat {bookmark.ayat}</p>
                  </Link>
                  <button
                    onClick={() => removeBookmark(bookmark.surah, bookmark.ayat)}
                    className="text-red-600 hover:text-red-700 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <p
                  className="font-arabic text-lg leading-loose text-text-primary mb-2 text-right"
                  lang="ar"
                  dir="rtl"
                >
                  {bookmark.teksArab}
                </p>

                <p className="text-sm text-text-secondary leading-relaxed mb-3">
                  {bookmark.teksIndonesia}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopy(bookmark)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs text-text-secondary hover:text-primary transition"
                  >
                    <Copy size={14} /> Salin
                  </button>
                  <button
                    onClick={() => handleShare(bookmark)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs text-text-secondary hover:text-primary transition"
                  >
                    <Share2 size={14} /> Bagikan
                  </button>
                </div>

                <p className="text-xs text-text-tertiary mt-3">
                  Disimpan: {new Date(bookmark.timestamp).toLocaleDateString('id-ID')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


