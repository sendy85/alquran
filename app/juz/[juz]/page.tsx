import { getJuzData } from '@/lib/juz-data';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import type { JuzMap } from '@/types/quran';

export const revalidate = 2592000;

export async function generateStaticParams() {
  const params = [];
  for (let juz = 1; juz <= 30; juz++) {
    params.push({ juz: juz.toString() });
  }
  return params;
}

export async function generateMetadata({ params }: { params: { juz: string } }) {
  const juzNum = parseInt(params.juz, 10);
  return {
    title: `Juz ${juzNum} - Al-Qur'an Digital`,
    description: `Pilih surat di Juz ${juzNum}`,
  };
}

export default function JuzSurahSelectPage({ params }: { params: { juz: string } }) {
  const juzNum = parseInt(params.juz, 10);

  let juzData: JuzMap | null = null;
  let error: string | null = null;

  try {
    if (juzNum < 1 || juzNum > 30) {
      error = 'Juz tidak valid';
    } else {
      juzData = getJuzData(juzNum);
      if (!juzData) {
        error = 'Data Juz tidak ditemukan';
      }
    }
  } catch (err: any) {
    error = err.message;
  }

  if (error) {
    return (
      <div style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }} className="min-h-screen p-4 pt-5 md:pt-20">
        <div className="max-w-reading-container mx-auto">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!juzData) {
    return (
      <div style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }} className="min-h-screen p-4 pt-5 md:pt-20">
        <div className="max-w-reading-container mx-auto">
          <p className="text-text-secondary">Data tidak ditemukan</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', paddingBottom: 'calc(5rem + env(safe-area-inset-bottom))' }} className="min-h-screen pt-5 md:pt-20 md:pb-0">
      <div className="max-w-reading-container mx-auto px-4 md:px-8">
        <header className="sticky top-20 md:top-16 bg-surface z-40 py-4 border-b border-border-subtle mb-6">
          <div className="flex items-center justify-between gap-2 mb-3">
            <Link
              href="/juzs"
              className="flex items-center gap-2 px-3 py-2 text-primary hover:bg-surface-container-low rounded-md transition"
            >
              <ChevronLeft size={20} />
              <span className="text-sm font-medium hidden sm:inline">Kembali</span>
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-serif-heading font-bold">Juz {juzNum}</h1>
            </div>
            <div className="w-12" />
          </div>
          <div className="text-sm text-text-secondary">
            Pilih surat untuk mulai membaca
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {juzData.surahs.map((surah) => (
            <Link
              key={`${surah.surahNumber}-${surah.juz}`}
              href={`/juz/${juzNum}/${surah.surahNumber}`}
              className="p-4 bg-surface-container-lowest rounded-md border border-border-subtle hover:border-primary hover:shadow-subtle transition"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-secondary-gold text-primary rounded-full text-xs font-medium">
                  {surah.surahNumber}
                </div>
                <div className="flex-1">
                  <h3 className="font-serif-heading font-bold text-base text-text-primary">
                    {surah.surahNameLatin}
                  </h3>
                  <p className="text-sm text-text-secondary font-arabic mt-1">
                    {surah.surahNameAr}
                  </p>
                  <p className="text-xs text-text-tertiary mt-2">
                    Ayat {surah.ayatStart}–{surah.ayatEnd} • {surah.ayatCount} ayat
                  </p>
                  {surah.ayatStart > 1 && (
                    <p className="text-xs text-text-tertiary mt-1">
                      Lanjutan dari Juz {juzNum - 1}
                    </p>
                  )}
                  {surah.ayatEnd < 286 && (
                    <p className="text-xs text-text-tertiary mt-1">
                      Berlanjut ke Juz {juzNum + 1}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
