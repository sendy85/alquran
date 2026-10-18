import { getJuzData } from '@/lib/juz-data';
import JuzSurahReadPageClient from './client';

export const revalidate = 2592000;

export async function generateStaticParams() {
  const params = [];
  for (let juz = 1; juz <= 30; juz++) {
    const juzData = getJuzData(juz);
    if (juzData) {
      for (const surah of juzData.surahs) {
        params.push({ juz: juz.toString(), surah: surah.surahNumber.toString() });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: { juz: string; surah: string } }) {
  const juzNum = parseInt(params.juz, 10);
  const surahNum = parseInt(params.surah, 10);
  const juzData = getJuzData(juzNum);
  const surahRange = juzData?.surahs.find(s => s.surahNumber === surahNum);
  
  if (surahRange) {
    return {
      title: `${surahRange.surahNameLatin} (Juz ${juzNum}) - Al-Qur'an Digital`,
      description: `Baca ${surahRange.surahNameLatin} ayat ${surahRange.ayatStart}-${surahRange.ayatEnd} di Juz ${juzNum}`,
    };
  }
  return { title: 'Al-Qur\'an Digital' };
}

export default function JuzSurahReadPage({ params }: { params: { juz: string; surah: string } }) {
  const juzNum = parseInt(params.juz, 10);
  const juzData = getJuzData(juzNum);

  return <JuzSurahReadPageClient params={params} juzData={juzData} />;
}
