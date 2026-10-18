import { SurahListItem, SurahDetail, JuzDetail } from '@/types/quran';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fetchSurahList, fetchSurahDetail, fetchJuzDetail } from '@/lib/api';

const DATA_DIR = join(process.cwd(), 'data');

export async function generateSurahData() {
  console.log('Fetching surah list...');
  const surahList = await fetchSurahList();
  console.log(`Found ${surahList.length} surahs`);

  const data: SurahListItem[] = [];

  for (const surah of surahList) {
    console.log(`Fetching surah ${surah.namaLatin} (${surah.nomor})...`);
    try {
      const detail = await fetchSurahDetail(surah.nomor);
      data.push({
        nomor: detail.nomor,
        nama: detail.nama,
        namaLatin: detail.namaLatin,
        jumlahAyat: detail.jumlahAyat,
        tempatTurun: detail.tempatTurun,
        arti: detail.arti,
        deskripsi: detail.deskripsi,
      });
    } catch (err) {
      console.error(`Error fetching surah ${surah.nomor}:`, err);
    }
  }

  const filePath = join(DATA_DIR, 'surahs.json');
  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Saved ${data.length} surahs to ${filePath}`);

  return data;
}

export async function generateJuzData() {
  const data: JuzDetail[] = [];

  for (let i = 1; i <= 30; i++) {
    console.log(`Fetching juz ${i}...`);
    try {
      const juz = await fetchJuzDetail(i);
      data.push(juz);
    } catch (err) {
      console.error(`Error fetching juz ${i}:`, err);
    }
  }

  const filePath = join(DATA_DIR, 'juzs.json');
  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Saved ${data.length} juzs to ${filePath}`);

  return data;
}

export function loadSurahData(): SurahListItem[] {
  const filePath = join(DATA_DIR, 'surahs.json');
  if (existsSync(filePath)) {
    const raw = readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  }
  throw new Error('surahs.json not found. Run npm run fetch-data first.');
}

export function loadJuzData(): JuzDetail[] {
  const filePath = join(DATA_DIR, 'juzs.json');
  if (existsSync(filePath)) {
    const raw = readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  }
  throw new Error('juzs.json not found. Run npm run fetch-data first.');
}
