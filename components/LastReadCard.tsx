'use client';

import { ChevronRight, Bookmark } from 'lucide-react';
import Link from 'next/link';

interface LastReadCardProps {
  lastRead: {
    surah: number;
    ayat: number;
    timestamp: number;
  } | null;
  surahData: {
    nomor: number;
    namaLatin: string;
    nama: string;
    jumlahAyat: number;
    tempatTurun?: string;
  } | null;
  showEmpty?: boolean;
}

export function LastReadCard({ lastRead, surahData, showEmpty = true }: LastReadCardProps) {
  if (!lastRead || !surahData) {
    if (!showEmpty) return null;
    
    return (
      <div
        className="mb-8 p-6 md:p-8 rounded-lg md:rounded-xl overflow-hidden relative"
        style={{
          backgroundColor: 'var(--hero-bg)',
          color: 'var(--hero-fg)',
        }}
      >
        {/* Pola geometris Islami tipis (SVG background) */}
        <svg
          className="absolute inset-0 opacity-5"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="islamic-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" />
              <path d="M10 0 L15 5 L10 10 L5 5 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#islamic-pattern)" />
        </svg>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Bookmark size={18} />
            <p className="text-sm font-medium opacity-90">Mulai Membaca</p>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-serif-heading font-bold mb-2">Al-Fatihah</h3>
          <p className="text-sm opacity-90 mb-6">Ayat pertama dari Al-Qur'an yang mulia</p>
          
          <Link
            href="/surah/1#ayat-1"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium text-sm transition hover:opacity-90"
            style={{
              backgroundColor: 'var(--hero-button-bg)',
              color: 'var(--hero-button-fg)',
            }}
          >
            Mulai Baca <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  const progressPercent = Math.round((lastRead.ayat / surahData.jumlahAyat) * 100);
  const lastReadDate = new Date(lastRead.timestamp).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div
      className="mb-8 rounded-lg md:rounded-xl overflow-hidden relative"
      style={{
        backgroundColor: 'var(--hero-bg)',
        color: 'var(--hero-fg)',
      }}
    >
      {/* Pola geometris Islami tipis di pojok kanan */}
      <svg
        className="absolute top-0 right-0 w-32 h-32 opacity-5"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="islamic-accent" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="currentColor" />
            <path d="M10 0 L15 5 L10 10 L5 5 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#islamic-accent)" />
      </svg>

      {/* Grid layout: desktop 2 kolom, mobile 1 kolom */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-8 relative z-10">
        {/* Kolom kiri: Info dan progres (desktop 2/3, mobile full) */}
        <div className="md:col-span-2">
          {/* Header dengan ikon dan label */}
          <div className="flex items-center gap-2 mb-4">
            <Bookmark size={18} />
            <p className="text-sm font-medium opacity-90">Terakhir Dibaca</p>
          </div>

          {/* Nama surah Latin dengan font serif besar */}
          <h2 className="text-2xl md:text-3xl font-serif-heading font-bold mb-1">
            {surahData.namaLatin}
          </h2>

          {/* Info posisi dan tanggal */}
          <div className="text-sm opacity-90 mb-4 space-y-1">
            <p>Ayat {lastRead.ayat} dari {surahData.jumlahAyat}</p>
            <p>Dibaca {lastReadDate}</p>
            {surahData.tempatTurun && <p>{surahData.tempatTurun}</p>}
          </div>

          {/* Progress bar dengan label */}
          <div className="mb-5">
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: 'var(--hero-track)' }}
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Progress ${progressPercent}%`}
            >
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${progressPercent}%`,
                  backgroundColor: 'var(--hero-fill)',
                }}
              />
            </div>
            <p className="text-xs opacity-75 mt-2">{progressPercent}% selesai</p>
          </div>

          {/* Tombol Lanjutkan Membaca */}
          <Link
            href={`/surah/${lastRead.surah}#ayat-${lastRead.ayat}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium text-sm transition hover:opacity-90"
            style={{
              backgroundColor: 'var(--hero-button-bg)',
              color: 'var(--hero-button-fg)',
            }}
          >
            Lanjutkan Membaca <ChevronRight size={16} />
          </Link>
        </div>

        {/* Kolom kanan: Nama Arab besar (desktop hanya) */}
        <div className="hidden md:flex flex-col justify-center items-end">
          <p
            className="font-arabic text-5xl text-right leading-tight"
            lang="ar"
            dir="rtl"
            style={{
              opacity: 0.9,
            }}
          >
            {surahData.nama}
          </p>
          <p className="text-xs opacity-75 mt-2">Surah {surahData.nomor}</p>
        </div>
      </div>
    </div>
  );
}
