const API_BASE = process.env.QURAN_API_URL || 'https://equran.id/api/v2';
const JUZ_API_BASE = process.env.QURAN_JUZ_API_URL || 'https://api.alquran.cloud/v1';

export async function fetchSurahList() {
  const res = await fetch(`${API_BASE}/surat`, { next: { revalidate: 2592000 } });
  if (!res.ok) throw new Error(`Failed to fetch surah list: ${res.status}`);
  const json = await res.json();
  return json.data;
}

export async function fetchSurahDetail(nomor: number) {
  const res = await fetch(`${API_BASE}/surat/${nomor}`, { next: { revalidate: 2592000 } });
  if (!res.ok) throw new Error(`Failed to fetch surah ${nomor}: ${res.status}`);
  const json = await res.json();
  return json.data;
}

export async function fetchJuzDetail(juz: number) {
  const res = await fetch(`${JUZ_API_BASE}/juz/${juz}`, { next: { revalidate: 2592000 } });
  if (!res.ok) throw new Error(`Failed to fetch juz ${juz}: ${res.status}`);
  const json = await res.json();
  return json.data;
}

export async function fetchJuzSurahRange(surahNumber: number, ayatStart: number, ayatEnd: number) {
  const surah = await fetchSurahDetail(surahNumber);
  
  if (!surah.ayat) {
    throw new Error(`No ayat found for surah ${surahNumber}`);
  }

  const filteredAyat = surah.ayat.filter(
    (ayat: any) => ayat.nomorAyat >= ayatStart && ayat.nomorAyat <= ayatEnd
  );

  return {
    ...surah,
    ayat: filteredAyat,
    jumlahAyatBagian: filteredAyat.length,
    ayatStart,
    ayatEnd,
  };
}
