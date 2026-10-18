# Al-Qur'an Digital

Aplikasi web modern untuk membaca Al-Qur'an 30 Juz lengkap dengan teks Arab dan terjemahan Bahasa Indonesia. Dibangun dengan Next.js, TypeScript, dan Tailwind CSS. Gratis, offline-ready, tanpa login, dan tanpa iklan.

## 🎯 Fitur Utama
- **114 Surah Lengkap**: Semua surah dengan teks Arab (Uthmani), transliterasi Latin, dan terjemahan Indonesia
- **30 Juz**: Pembagian Al-Qur'an menjadi 30 bagian untuk tadabbur harian
- **Bookmark Ayat**: Simpan ayat favorit dan akses dengan cepat
- **Bacaan Terakhir**: Otomatis mencatat ayat terakhir yang dibaca
- **Pengaturan Fleksibel**:
  - Ukuran font Arab dan terjemahan dapat disesuaikan
  - Tampilkan/sembunyikan terjemahan dan transliterasi
  - Tema (terang/gelap) dapat diubah melalui tombol di navbar atau tombol melayang di mobile
- **Instalasi Aplikasi**:
  - Pasang aplikasi Al-Qur'an Digital melalui menu Pengaturan
- **Pencarian Surah**: Filter real-time berdasarkan nama Latin, nama Arab, arti, atau nomor
- **Salin & Bagikan**: Salin ayat atau bagikan melalui Web Share API
- **Responsive Design**: Mobile-first, fully responsive dari HP hingga desktop
- **Offline-Ready**: Progressive Web App (PWA) - akses halaman yang sudah dibuka tanpa internet
- **No Login Required**: Akses langsung tanpa registrasi
- **Privacy First**: Semua data disimpan lokal di perangkat, tidak ada tracking

## 📱 Teknologi

- **Framework**: Next.js 14 (App Router, SSG)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks + localStorage
- **Icons**: Lucide React
- **Fonts**: Amiri (Arab), Newsreader (Heading), Inter (Body)
- **SEO**: Next.js Metadata API, sitemap.xml, robots.txt
- **PWA**: Service Worker, manifest.json
- **Data Build**: Node.js scripts untuk pre-generate juz map (6236 ayat validation)

## 📊 Sumber Data

Aplikasi ini menggunakan data dari dua sumber API publik terpercaya:

### 1. **equran.id** (Utama untuk Surah & Ayat)
- Daftar 114 surah
- Detail surah: nama, arti, tempat turun, jumlah ayat
- Ayat-ayat dengan teks Arab (Uthmani), transliterasi Latin, terjemahan Indonesia
- URL API:
  - Daftar surah: `GET https://equran.id/api/v2/surat`
  - Detail surah: `GET https://equran.id/api/v2/surat/{nomor}`

### 2. **AlQuran Cloud** (untuk Mapping Juz)
- Data struktur per juz: surat mana saja yang ada di juz, rentang ayat per surat
- Digunakan build-time untuk generate juz-map.json (tidak disimpan teks dari API ini)
- URL API: `GET https://api.alquran.cloud/v1/juz/{1-30}`

**Catatan Penting**: Teks Al-Qur'an tidak boleh diubah. Silakan periksa ketentuan lisensi dari kedua sumber untuk penggunaan lebih lanjut.

## 🗂 Struktur Rute & Pages

### Surah (Halaman Lengkap Surah)
- `GET /surah/{nomor}` - Halaman baca surah lengkap (114 rute static)
- `GET /surahs` - Daftar 114 surah

### Juz (Halaman Pilih Surat + Baca per Bagian)
- `GET /juzs` - Daftar 30 juz (overview)
- `GET /juz/{juz}` - **Halaman pilih surat di juz tersebut** (30 rute static)
  - Menampilkan daftar surat yang ada di juz itu dengan rentang ayat
  - Berlaku untuk semua juz, termasuk Juz 2 yang hanya punya 1 surat
- `GET /juz/{juz}/{surah}` - **Halaman baca bagian surat di juz** (135 rute static)
  - Menampilkan hanya ayat dari rentang bagian itu
  - Contoh: `/juz/2/2` = Al-Baqarah ayat 142-252 di Juz 2
  - Contoh: `/juz/1/1` = Al-Fatihah ayat 1-7 di Juz 1

### Lainnya
- `GET /` - Beranda dengan tab Juz & Surah
- `GET /bookmarks` - Daftar bookmark ayat (client-side)
- `GET /settings` - Pengaturan tampilan (client-side)
- `GET /about` - Tentang aplikasi

## 🔧 Build & Data Generation

### Pre-generation Data (Build Time)

1. **Generate Juz Map**: Fetch struktur juz dari AlQuran Cloud, extract surat & rentang ayat, validasi 6236 ayat total
   ```bash
   npm run generate-juz-map
   ```
   Output: `data/juz-map.json` - peta ringkas struktur 30 juz (tidak menyimpan teks)

2. **Build Aplikasi**: Next.js SSG pre-render semua 175 halaman statis
   ```bash
   npm run build
   ```
   Rute static: 30 /juz/[juz] + 135 /juz/[juz]/[surah] + 1 /surah/[nomor] + lainnya
   
   Error handling:
   - Kombinasi juz-surah yang tidak valid → 404 (misal /juz/2/1 tidak ada)
   - Data validation di build time: jika total ayat ≠ 6236, build gagal

### Development
```bash
npm run dev
```
Jalankan dev server Next.js di http://localhost:3000

### Production
```bash
npm run build
npm run start
```

## 🐛 Bug Fix: Terjemahan Tidak Tersedia

**Root Cause**: Halaman juz lama menggunakan AlQuran Cloud API untuk ayat, yang hanya menyediakan `ayah.text` (Arab) tapi TIDAK punya field terjemahan Indonesia (`ayah.translation` kosong atau undefined).

**Solusi**: Halaman juz baru mengambil ayat dari equran.id (sama seperti halaman surah), yang memiliki `teksIndonesia` lengkap. Dengan cara ini:
- Terjemahan selalu tersedia & konsisten dengan halaman surah
- Tampilan teks Arab, Latin, terjemahan identik
- Bug "Terjemahan tidak tersedia" hilang

**Validasi Data**:
- Total ayat di 30 juz harus tepat 6236 (diperiksa saat `npm run generate-juz-map`)
- Setiap ayat hanya muncul di satu juz (tidak ganda/hilang)
- Setiap kombinasi juz-surah valid dan tersedia
- Jika validasi gagal, script menampilkan warning dan build halaman juz gagal

## 📋 Bookmark & Bacaan Terakhir

- Format data sama seperti sebelumnya: `{ surah: number, ayat: number, teksArab, teksIndonesia }`
- Kompatibel antar halaman surah & halaman juz
- "Lanjutkan membaca" dari halaman juz → membuka halaman surah biasa di ayat itu (konsisten & sederhana)

## 🚀 Quick Start

### Sebelum push ke GitHub
1. Hentikan `npm run dev` jika sedang berjalan.
2. Jalankan pemeriksaan tipe:
   ```bash
   npm run typecheck
   ```
3. Jalankan build produksi sampai bersih:
   ```bash
   npm run build
   ```
4. Pastikan build sukses ("Compiled successfully"), baru lakukan:
   ```bash
   git add .
   git commit -m "Pesan commit"
   git push origin main
   ```
   *(Catatan: Deployment Vercel yang gagal tidak akan mengubah situs live yang sedang berjalan)*

### Prasyarat
- Node.js >= 18.x
- npm atau yarn

### Instalasi

```bash
git clone <repository-url>
cd alquran
npm install
```

### Konfigurasi Environment

Salin `.env.example` menjadi `.env.local`:

```bash
cp .env.example .env.local
```

File `.env.local` sudah berisi URL API yang benar (tidak perlu diubah kecuali ada API key):

```env
QURAN_API_URL=https://equran.id/api/v2
QURAN_JUZ_API_URL=https://api.alquran.cloud/v1
```

### Menjalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build untuk Production

```bash
npm run build
npm start
```

### Menguji Pemasangan Aplikasi (PWA)

Untuk menguji fitur "Pasang Sebagai Aplikasi":
1. Jalankan build produksi: `npm run build` lalu `npm start` (atau via Vercel preview)
2. Buka [http://localhost:3000](http://localhost:3000) di browser (Chrome / Edge / Safari HP)
3. Pergi ke menu **Pengaturan** -> tab **Aplikasi**
4. Klik **Pasang Aplikasi**:
   - Di Chrome desktop / Android: memicu prompt pemasangan asli browser.
   - Di Safari iOS: menampilkan petunjuk manual menambah ke layar utama.
   - Setelah terpasang: kartu menampilkan "Aplikasi sudah terpasang di perangkat ini."

### Lint & TypeCheck

```bash
npm run lint
```

## 📂 Struktur Folder

```
alquran/
├── app/                              # Next.js App Router
│   ├── layout.tsx                   # Root layout + PWA meta tags
│   ├── page.tsx                     # Halaman beranda
│   ├── globals.css                  # Global styles & CSS variables
│   ├── surah/
│   │   └── [nomor]/
│   │       └── page.tsx             # Halaman baca surah
│   ├── juz/
│   │   └── [number]/
│   │       └── page.tsx             # Halaman baca juz
│   ├── surahs/
│   │   └── page.tsx                 # Daftar 114 surah
│   ├── juzs/
│   │   └── page.tsx                 # Daftar 30 juz
│   ├── bookmarks/
│   │   └── page.tsx                 # Halaman bookmark
│   ├── settings/
│   │   └── page.tsx                 # Halaman pengaturan
│   ├── about/
│   │   └── page.tsx                 # Halaman tentang
│   ├── error.tsx                    # Error boundary
│   └── not-found.tsx                # Halaman 404
├── components/
│   ├── BottomNav.tsx                # Bottom navigation (mobile)
│   ├── TopNav.tsx                   # Top navigation (desktop)
│   └── ServiceWorkerRegister.tsx    # PWA service worker register
├── hooks/
│   ├── useSurahs.ts                 # Fetch daftar surah
│   ├── useSurahDetail.ts            # Fetch detail surah
│   ├── useJuzDetail.ts              # Fetch detail juz
│   ├── useBookmarks.ts              # Bookmark management
│   ├── useSettings.ts               # Settings management
│   └── useLastRead.ts               # Last read tracking
├── lib/
│   └── api.ts                       # API fetch functions (server-side)
├── types/
│   └── quran.ts                     # TypeScript interfaces
├── public/
│   ├── manifest.json                # PWA manifest
│   ├── sw.js                        # Service worker
│   ├── robots.txt                   # SEO robots
│   ├── sitemap.xml                  # SEO sitemap
│   └── favicon.ico                  # Favicon
├── scripts/
│   ├── fetch-data.ts                # Script untuk download data surah
│   └── index.ts                     # Entry point script
├── data/                            # Folder untuk cached data (opsional)
├── next.config.mjs                  # Next.js config (security headers)
├── tailwind.config.js               # Tailwind config (design tokens)
├── tsconfig.json                    # TypeScript config
├── package.json
├── .env.example                     # Template environment variables
├── .env.local                       # Environment variables (git-ignored)
├── .gitignore
└── README.md
```

## 🔧 Environment Variables

| Variable | Deskripsi | Wajib | Default |
|----------|-----------|-------|---------|
| `QURAN_API_URL` | URL API equran.id | Ya | `https://equran.id/api/v2` |
| `QURAN_JUZ_API_URL` | URL API AlQuran Cloud | Ya | `https://api.alquran.cloud/v1` |

**Catatan**:
- `.env.local` tidak boleh di-commit (sudah di `.gitignore`)
- Tidak ada API key yang diperlukan untuk kedua API publik ini
- Jangan gunakan prefix `NEXT_PUBLIC_` untuk nilai rahasia

## 📦 Script Cadangan Data

Untuk mengunduh seluruh data surah dan menyimpannya secara lokal:

```bash
npm run fetch-data
```

Script ini akan:
1. Mengunduh daftar 114 surah dari equran.id
2. Mengunduh detail setiap surah
3. Menyimpan ke file `data/surahs.json`
4. Menyimpan data juz ke `data/juzs.json`

Saat build, aplikasi akan membaca data lokal terlebih dahulu. Jika file tidak ada, baru fetch dari API.

## 🎨 Design & Styling

Semua desain visual mengikuti `design.md` di root folder. Desain tersentralisasi dalam CSS variables di `app/globals.css` dan Tailwind config.

### Mengubah Desain

Untuk mengubah warna, font, atau spacing:

1. Edit `app/globals.css` (CSS variables) atau `tailwind.config.js`
2. Perubahan otomatis diterapkan ke semua komponen
3. Tidak perlu mengubah kode komponen individual

Contoh mengubah warna primer:
```css
:root {
  --primary: #1B4332; /* Ubah ke warna pilihan */
}
```

## 🌐 Deploy ke Vercel

### 1. Push ke GitHub

```bash
git add .
git commit -m "Initial commit: Al-Qur'an Digital"
git push origin main
```

### 2. Import ke Vercel

1. Buka [vercel.com](https://vercel.com)
2. Sign in atau buat akun gratis
3. Klik "Add New..." → "Project"
4. Pilih repository GitHub Anda
5. Konfigurasi:
   - **Framework Preset**: Next.js ✓
   - **Root Directory**: `./` (default)
   - **Environment Variables**:
     - `QURAN_API_URL` = `https://equran.id/api/v2`
     - `QURAN_JUZ_API_URL` = `https://api.alquran.cloud/v1`
6. Klik "Deploy"

### 3. Pengaturan Domain (Opsional)

Di Vercel Project Settings → Domains, tambahkan custom domain jika diperlukan.

### 4. Monitoring & Logs

Akses logs dan metrics di dashboard Vercel untuk memantau performa aplikasi.

## ✅ Fitur yang Sudah Diimplementasikan

- ✅ Halaman beranda dengan search, last read, tabs surah/juz
- ✅ Daftar lengkap 114 surah dan 30 juz
- ✅ Halaman baca surah dengan ayat bertingkat
- ✅ Halaman baca juz dengan penanda surah
- ✅ Modal lompat ke ayat dengan input nomor
- ✅ Salin dan bagikan ayat via Web Share API
- ✅ Bookmark ayat dengan localStorage
- ✅ Pengaturan font size, display options, tema
- ✅ Bacaan terakhir otomatis dengan IntersectionObserver
- ✅ Responsive design mobile & desktop
- ✅ Navigation bar mobile (bottom) & desktop (top)
- ✅ PWA manifest & service worker
- ✅ Security headers (X-Content-Type-Options, dll)
- ✅ SEO metadata, sitemap, robots.txt
- ✅ Error boundary & halaman 404
- ✅ Halaman Tentang & Privasi

## 🗺️ Rencana Pengembangan

- 🔲 Audio murottal (opsional, non-intrusive)
- 🔲 Tafsir singkat per surah
- 🔲 Pencarian ayat yang lebih canggih (by keyword)
- 🔲 Sinkronisasi antar perangkat (opsional, dengan login)
- 🔲 Dukungan bahasa tambahan (English, Arabic, dll)
- 🔲 Mode reading split-screen (Arab + terjemahan side-by-side)
- 🔲 Catatan pribadi per ayat
- 🔲 Jadwal muraja'ah (review) untuk hafalan

## 🤝 Kontribusi

Kami menyambut kontribusi dari komunitas! Silakan:

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 Lisensi

Kode sumber aplikasi ini dilisensikan di bawah MIT License.

**Catatan Penting**: Teks Al-Qur'an dalam aplikasi ini berasal dari sumber eksternal (equran.id dan AlQuran Cloud). Silakan periksa ketentuan lisensi dari masing-masing sumber untuk penggunaan teks Al-Qur'an secara khusus. Teks Al-Qur'an tidak boleh dimodifikasi atau diubah.

## 🙏 Doa

Semoga aplikasi ini bermanfaat dalam perjalanan tadabbur dan hafalan Al-Qur'an Anda. Semoga Allah menerima amal kami semua. Aamiin.

---

Dibuat dengan sepenuh hati untuk kemudahan membaca Al-Qur'an. 📖✨
