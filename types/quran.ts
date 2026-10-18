export interface SurahListItem {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
}

export interface AyatItem {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
}

export interface SurahNav {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
}

export interface SurahDetail extends SurahListItem {
  ayat: AyatItem[];
  suratSebelumnya: SurahNav | false;
  suratSelanjutnya: SurahNav | false;
}

export interface JuzDetail {
  juz: number;
  ayahs: {
    number: number;
    text: string;
    surah: {
      number: number;
      name: string;
      englishName: string;
      englishNameTranslation: string;
      numberOfAyahs: number;
      revelationType: string;
    };
    numberInSurah: number;
    juz: number;
    manzil: number;
    page: number;
    ruku: number;
    hizbQuarter: number;
    sajda: boolean;
  }[];
}

export interface JuzSurahRange {
  surahNumber: number;
  surahNameAr: string;
  surahNameLatin: string;
  juz: number;
  ayatStart: number;
  ayatEnd: number;
  ayatCount: number;
}

export interface JuzMap {
  juz: number;
  surahs: JuzSurahRange[];
  ayatCount: number;
}
