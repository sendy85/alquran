import 'server-only';

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { JuzMap } from '@/types/quran';

const DATA_DIR = join(process.cwd(), 'data');

export function loadJuzMap(): JuzMap[] {
  const filePath = join(DATA_DIR, 'juz-map.json');
  if (existsSync(filePath)) {
    const raw = readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  }
  throw new Error('juz-map.json not found. Run npm run generate-juz-map first.');
}

export function getJuzData(juzNumber: number): JuzMap | null {
  const juzMaps = loadJuzMap();
  return juzMaps.find(m => m.juz === juzNumber) || null;
}

export function getSurahRangeInJuz(juzNumber: number, surahNumber: number) {
  const juzData = getJuzData(juzNumber);
  if (!juzData) return null;
  return juzData.surahs.find(s => s.surahNumber === surahNumber) || null;
}
