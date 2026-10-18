'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronRight } from 'lucide-react';
import { useSurahs } from '@/hooks/useSurahs';
import { useLastRead } from '@/hooks/useLastRead';
import { useSurahDetail } from '@/hooks/useSurahDetail';
import { LastReadCard } from '@/components/LastReadCard';

type Tab = 'surah' | 'juz';

export default function HomePage() {
  const { surahs, loading, error } = useSurahs();
  const { lastRead } = useLastRead();
  const { surah: lastReadSurah } = useSurahDetail(lastRead?.surah || 0);
  const [tab, setTab] = useState<Tab>('surah');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSurahs = surahs.filter((surah: any) => {
    const q = searchQuery.toLowerCase();
    return (
      surah.namaLatin.toLowerCase().includes(q) ||
      surah.nama.includes(searchQuery) ||
      surah.arti.toLowerCase().includes(q) ||
      surah.nomor.toString().includes(q)
    );
  });

  if (error) {
    return (
      <div style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }} className="min-h-screen p-4 pt-20 md:pt-20">
        <div className="max-w-reading-container mx-auto">
          <p className="text-red-600">Gagal memuat daftar surah. Coba refresh halaman.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }} className="min-h-screen pt-20 md:pt-20 pb-20 md:pb-0">
      <div className="max-w-reading-container mx-auto px-4 md:px-8">
        <header className="mb-8 mt-6">
          <h1 className="text-3xl md:text-4xl font-serif-heading font-bold">Al-Qur'an Digital</h1>
          <p className="text-text-secondary mt-2">Baca 114 Surah dengan teks Arab dan terjemahan Indonesia</p>
        </header>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-text-tertiary" size={20} />
            <input
              type="text"
              placeholder="Cari surah, arti, atau nomor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-border-subtle rounded-md bg-surface-container-lowest text-text-primary placeholder-text-tertiary"
            />
          </div>
        </div>

        <LastReadCard lastRead={lastRead} surahData={lastReadSurah} showEmpty={true} />

        <div className="flex gap-4 mb-8 border-b border-border-subtle">
          <button
            onClick={() => setTab('surah')}
            className={`pb-3 font-medium text-sm transition ${
              tab === 'surah' ? 'text-primary border-b-2 border-primary -mb-1' : 'text-text-secondary'
            }`}
          >
            Surah ({filteredSurahs.length})
          </button>
          <button
            onClick={() => setTab('juz')}
            className={`pb-3 font-medium text-sm transition ${
              tab === 'juz' ? 'text-primary border-b-2 border-primary -mb-1' : 'text-text-secondary'
            }`}
          >
            Juz (30)
          </button>
        </div>

        {tab === 'surah' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {loading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="h-24 bg-surface-container-low rounded-md animate-pulse" />
              ))
            ) : filteredSurahs.length > 0 ? (
              filteredSurahs.map((surah: any) => (
                <Link
                  key={surah.nomor}
                  href={`/surah/${surah.nomor}`}
                  className="p-4 bg-surface-container-lowest rounded-md border border-border-subtle hover:border-primary hover:shadow-subtle transition cursor-pointer"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-primary">{surah.namaLatin}</p>
                      <p className="text-sm text-text-secondary">{surah.jumlahAyat} Ayat • {surah.tempatTurun}</p>
                      <p className="text-text-tertiary text-sm mt-1">{surah.arti}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-arabic text-2xl text-text-primary">{surah.nama}</p>
                      <p className="text-xs text-text-tertiary mt-1">#{surah.nomor}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-text-secondary">Tidak ada surah yang cocok.</p>
            )}
          </div>
        )}

        {tab === 'juz' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {Array.from({ length: 30 }).map((_, i) => (
              <Link
                key={i + 1}
                href={`/juz/${i + 1}`}
                className="p-4 bg-surface-container-lowest rounded-md border border-border-subtle hover:border-primary hover:shadow-subtle transition"
              >
                <p className="font-serif-heading font-semibold text-lg text-primary">Juz {i + 1}</p>
                <p className="text-text-secondary text-sm mt-1">Bagian dari Al-Qur'an</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

