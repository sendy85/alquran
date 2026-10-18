'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useSurahs } from '@/hooks/useSurahs';

export default function SurahsPage() {
  const { surahs, loading, error } = useSurahs();
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
      <div style={{ backgroundColor: 'var(--surface)' }} className="min-h-screen p-4 pt-4 md:pt-20">
        <div className="max-w-reading-container mx-auto">
          <p className="text-red-600">Gagal memuat daftar surah.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', paddingBottom: 'calc(5rem + env(safe-area-inset-bottom))' }} className="min-h-screen pt-4 md:pt-20 md:pb-0">
      <div className="max-w-reading-container mx-auto px-4 md:px-8">
        <header className="mb-8 mt-6">
          <h1 className="text-3xl md:text-4xl font-serif-heading font-bold">114 Surah Al-Qur'an</h1>
          <p className="text-text-secondary mt-2">Daftar lengkap surah dengan jumlah ayat dan tempat turun</p>
        </header>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-text-tertiary" size={20} />
            <input
              type="text"
              placeholder="Cari surah..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-border-subtle rounded-md bg-surface-container-lowest text-text-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {loading ? (
            Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="h-24 bg-surface-container-low rounded-md animate-pulse" />
            ))
          ) : filteredSurahs.length > 0 ? (
            filteredSurahs.map((surah: any) => (
              <Link
                key={surah.nomor}
                href={`/surah/${surah.nomor}`}
                className="p-4 bg-surface-container-lowest rounded-md border border-border-subtle hover:border-primary hover:shadow-subtle transition"
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
      </div>
    </div>
  );
}

