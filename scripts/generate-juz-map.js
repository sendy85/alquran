const fs = require('fs');
const path = require('path');

const API_BASE = 'https://equran.id/api/v2';
const JUZ_API_BASE = 'https://api.alquran.cloud/v1';
const DATA_DIR = path.join(process.cwd(), 'data');

async function fetchSurahList() {
  const res = await fetch(`${API_BASE}/surat`);
  if (!res.ok) throw new Error(`Failed to fetch surah list: ${res.status}`);
  const json = await res.json();
  return json.data;
}

async function fetchJuzDetail(juz) {
  const res = await fetch(`${JUZ_API_BASE}/juz/${juz}`);
  if (!res.ok) throw new Error(`Failed to fetch juz ${juz}: ${res.status}`);
  const json = await res.json();
  return json.data;
}

async function generateJuzMap() {
  console.log('Generating Juz map from AlQuran Cloud...');
  
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const juzMaps = [];
  let totalAyat = 0;
  
  try {
    const surahList = await fetchSurahList();
    const surahMap = new Map(surahList.map(s => [s.nomor, s]));

    for (let juzNum = 1; juzNum <= 30; juzNum++) {
      console.log(`Fetching Juz ${juzNum}...`);
      try {
        const juzData = await fetchJuzDetail(juzNum);
        const surahs = new Map();

        for (const ayah of juzData.ayahs) {
          const surahNum = ayah.surah.number;
          const surahInfo = surahMap.get(surahNum);
          
          if (!surahs.has(surahNum)) {
            surahs.set(surahNum, {
              surahNumber: surahNum,
              surahNameAr: ayah.surah.name,
              surahNameLatin: surahInfo?.namaLatin || ayah.surah.englishName,
              juz: juzNum,
              ayatStart: ayah.numberInSurah,
              ayatEnd: ayah.numberInSurah,
              ayatCount: 1,
            });
          } else {
            const range = surahs.get(surahNum);
            range.ayatEnd = Math.max(range.ayatEnd, ayah.numberInSurah);
            range.ayatCount = range.ayatEnd - range.ayatStart + 1;
          }
        }

        const surahRanges = Array.from(surahs.values()).sort((a, b) => a.surahNumber - b.surahNumber);
        const juzAyatCount = juzData.ayahs.length;

        juzMaps.push({
          juz: juzNum,
          surahs: surahRanges,
          ayatCount: juzAyatCount,
        });

        totalAyat += juzAyatCount;
        console.log(`  Juz ${juzNum}: ${surahRanges.length} surat, ${juzAyatCount} ayat`);
      } catch (err) {
        console.error(`Error fetching juz ${juzNum}:`, err.message);
      }
    }

    const filePath = path.join(DATA_DIR, 'juz-map.json');
    fs.writeFileSync(filePath, JSON.stringify(juzMaps, null, 2), 'utf-8');
    console.log(`\nSaved juz map to ${filePath}`);
    console.log(`Total ayat across all juz: ${totalAyat}`);

    if (totalAyat !== 6236) {
      console.warn(`WARNING: Expected 6236 ayat, got ${totalAyat}`);
    } else {
      console.log('✓ Ayat count validated: 6236');
    }

    return juzMaps;
  } catch (err) {
    console.error('Fatal error:', err.message);
    process.exit(1);
  }
}

generateJuzMap();
