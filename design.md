# Dokumentasi Desain (Design System & UI Specs): Al-Qur'an Digital — Serene Quran Reader

> **Filosofi Desain**: *Ketenangan, Keterbacaan, dan Keheningan Tilawah (Serene & Distraction-Free).*  
> Aplikasi Al-Qur'an ini dirancang dengan pendekatan *Mobile-First & Fully Responsive Desktop Adaptation* untuk memberikan pengalaman membaca Al-Qur'an yang lapang, anggun, khusyuk, dan bebas distraksi. Visual dirancang nyaman untuk siang hari (Mode Terang) maupun malam hari (Mode Gelap). Tanpa beban registrasi/login dan tanpa distraksi kontrol audio/suara yang mengalihkan fokus tilawah murni.

---

## 1. Prinsip Desain & Pedoman Interaksi

1. **Lapang & Bernapas (*Generous Whitespace*)**:
   - Area membaca bebas dari dekorasi rumit atau ornamen berlebihan.
   - Whitespace vertikal antarayat dan margin lateral yang longgar memberikan kenyamanan mata saat tadabbur berjam-jam.
2. **Keterbacaan Mutlak (*Legibility First*)**:
   - Teks Arab menggunakan font kaligrafi Naskh/Amiri dengan ukuran optimal (28–36px mobile, 36–44px desktop) dan *line-height* longgar (2.2 – 2.4) agar harakat dan tanda baca mushaf (*tanwin, sukun, waqaf*) tajam, jernih, dan tidak bertabrakan.
   - Terjemahan dan transliterasi menggunakan kontras lembut untuk menjaga hierarki bacaan sekunder.
3. **Ketajaman Vektor Tanpa Pecah (*Vector Clarity & High-DPI Support*)**:
   - Seluruh teks Arab, kaligrafi, ikon, dan garis hiasan menggunakan WebFont vektor dan SVG murni.
   - Tampilan dijamin **100% tajam dan tidak akan pecah/blur** pada layar apa pun: Retina Display, monitor Full HD, 2K/4K, hingga layar Ultra-wide.
4. **Ergonomi Sentuh & Responsivitas Desktop (*Responsive Web & Touch Ergonomics*)**:
   - Semua target sentuh/klik interaktif berukuran minimal 44 × 44px.
   - Pada layar ponsel, kontrol navigasi berada di zona jangkauan satu jempol (*thumb zone*).
   - Pada browser web desktop, tata letak otomatis beradaptasi dengan pembatasan kontainer tengah (*readable max-width container*) agar baris teks tidak melar.
5. **Akses Instan Tanpa Hambatan (*No-Login, Local Persistence*)**:
   - Pengguna langsung dapat menandai surah, membuat folder bookmark, dan menyimpan riwayat bacaan terakhir secara lokal di perangkat (`localStorage`) tanpa registrasi atau login akun.

---

## 2. Fondasi Visual & Token Desain

### 2.1 Palet Warna (Color System)

#### Mode Terang (Default — Krem Lembut & Hijau Emerald)
- **Background Utama (`surface`)**: `#FAF8F5` *(Warm Soft Cream)* — Nuansa kertas mushaf fisik klasik yang ramah di mata dan bebas silau.
- **Background Kartu Rendah (`surface-container-low`)**: `#F3EFEA`
- **Surface Container Lowest (Pure White Card)**: `#FFFFFF`
- **Warna Aksen Primer (`primary`)**: `#1B4332` *(Deep Forest Emerald)* — Elegan, tenang, dan identik dengan nuansa mushaf Nabawi.
- **Warna Kontras Aksen (`primary-contrast`)**: `#FFFFFF`
- **Warna Aksen Sekunder / Emas Redup (`secondary-gold`)**: `#D4A373` / `#C59B27` *(Muted Gold)* — Untuk penanda ayat favorit, highlight surah aktif, dan chip kategori.
- **Teks Arab / Judul (`text-primary`)**: `#1B261D` *(Deep Evergreen Charcoal)* — Kontras tinggi namun lembut di mata.
- **Teks Terjemahan / Body (`text-secondary`)**: `#4A584F` *(Subtle Sage Charcoal)* — Kontras seimbang untuk membaca teks panjang.
- **Teks Keterangan / Muted (`text-tertiary`)**: `#7D8D82`
- **Garis Batas & Divider (`border-subtle`)**: `#E8E2D8`

#### Mode Gelap (Night-Friendly Dark Mode)
- **Background Utama (`surface-dark`)**: `#121816` *(Deep Charcoal Sage)* — Meminimalisir silau saat membaca di ruangan gelap.
- **Container / Modal Sheet (`surface-container-dark`)**: `#1A2420` & `#212E29`
- **Teks Arab Mode Gelap**: `#F3EED9` *(Warm Ivory / Gading Terang)* — Sangat jernih dengan kontras yang nyaman.
- **Teks Terjemahan Mode Gelap**: `#D1DCD5` & `#9CB0A4`
- **Aksen Interaktif Mode Gelap**: `#52B788` *(Luminous Sage Green)*

---

### 2.2 Tipografi (Typography Scale)

| Elemen UI | Font Family | Ukuran Mobile | Ukuran Desktop | Line Height | Keterangan & Bobot |
|---|---|---|---|---|---|
| **Teks Ayat Arab** | `Amiri`, `Scheherazade New`, `Noto Naskh Arabic` | 32px (Dapat diatur 26–42px) | 36px – 44px (Dapat diatur) | 2.2 – 2.4 | Rata kanan (RTL), harakat jernih, Regular/Medium |
| **Judul Header Surah** | `Newsreader`, `Playfair Display`, serif | 24px – 28px | 32px – 36px | 1.2 | Semi-bold / Bold, Serif anggun |
| **Terjemahan Bahasa Indonesia** | `Inter`, `Newsreader`, sans-serif | 15px – 17px | 16px – 18px | 1.6 – 1.8 | Regular, nyaman untuk paragraf panjang |
| **Transliterasi Latin** | `Inter`, `Plus Jakarta Sans` | 13px – 14px | 14px – 15px | 1.5 | Italic / Regular, warna lebih redup |
| **Nomor Ayat / Badge** | `Inter`, `Newsreader` | 12px – 14px | 13px – 14px | 1.0 | Lingkaran badge bergaris halus |
| **Navigasi & Label Menu** | `Inter`, sans-serif | 11px – 13px | 13px – 14px | 1.2 | Medium, uppercase track 0.5px |

---

### 2.3 Radius & Elevasi (Borders & Shadows)
- **Border Radius**:
  - `rounded-sm`: 6px (Badge nomor, chip filter kecil)
  - `rounded-md`: 12px (Tombol utama, input box, kartu surah)
  - `rounded-lg`: 16px – 20px (Kartu Terakhir Dibaca, dialog)
  - `rounded-sheet`: 24px – 28px (Modal Bottom Sheet / Dialog Pop-up Desktop)
  - `rounded-full`: 9999px (Floating pill button, lingkaran ayat)
- **Shadows / Bayangan**:
  - Halus dan tipis (`0 4px 20px -2px rgba(27, 67, 50, 0.05)`), tidak ada drop-shadow tebal yang kaku.

---

## 3. Spesifikasi Arsitektur Responsif Web Desktop

> **Pertanyaan Kunci**: *Apakah tampilan akan pecah atau berantakan saat dibuka di browser Web Desktop?*  
> **Jawaban & Rekayasa Desain**: **Sama sekali tidak akan pecah.**

### 3.1 Kontainer Pembatas Lebar Maksimal (*Max-Width Centered Reader Container*)
- **Zona Baca Utama (*Reading Zone*)**: Dibatasi maksimal selebar `max-w-3xl` s.d. `max-w-4xl` (sekitar **768px – 900px**) dengan posisi otomatis berada tepat di tengah layar (`mx-auto`).
- **Ergonomi Tadabbur**: Membaca teks Al-Qur'an dan terjemahan yang dibiarkan melar melintasi monitor 1920px (Full HD) akan membuat mata lelah berpindah baris. Dengan lebar terpusat 768–900px, pembacaan terasa proporsional seperti membuka lembaran mushaf fisik yang tenang.
- **Latar Pinggir Desktop**: Area di luar kontainer tengah menggunakan warna lembut `#F5F2EB` (Mode Terang) atau `#0E1412` (Mode Gelap) dengan garis tepi vertikal halus (*subtle outer gutter*).

### 3.2 Transformasi Komponen: Mobile vs Desktop

| Komponen | Perilaku Mobile (< 768px) | Perilaku Web Desktop (≥ 768px / 1024px) |
|---|---|---|
| **Bilah Navigasi** | Fixed Bottom Bar di bagian bawah layar (5 tab jempol). | Otomatis bertransformasi menjadi **Top Navigation Bar** bersih di bagian atas atau **Sidebar Kiri Ringkas**. |
| **Grid Daftar Surah** | 1 Kolom memanjang vertikal (*single-column list*). | **Grid 2 atau 3 Kolom Responsif** (`grid-cols-2` / `grid-cols-3`) berjarak lega. |
| **Modal "Lompat ke Ayat" & "Pengaturan"** | *Bottom Sheet* yang meluncur dari bawah. | **Centered Dialog Modal** di tengah layar dengan backdrop blur, mendukung input keyboard fisik instan (`Enter`, `Esc`). |
| **Tampilan Alur Ayat (Ayah Stream)** | Tumpuk vertikal satu kolom. | Mode pilihan: **Tumpuk Elegan Terpusat** (font Arab 36–44px) atau **Dua Panel (*Side-by-Side Tadabbur*)** (Arab di panel kanan, terjemahan di kiri). |
| **Header Widget (Waktu Sholat & Kiblat)** | Menumpuk vertikal. | Berjejer horizontal berdampingan dengan kolom pencarian (*flex-row*). |

---

## 4. Arsitektur Informasi & Spesifikasi Seluruh Layar

### 4.1 Layar 1: Beranda Al-Qur'an (`Beranda Al-Qur'an`)
*Tujuan: Titik awal pengguna untuk mencari surah, melihat jadwal penunjang, dan melanjutkan bacaan terakhir.*
- **Top Bar**:
  - Identitas aplikasi *"Al-Qur'anul Karim"*, subjudul *"Beranda"*.
  - Tombol aksi pencarian cepat (ikon kaca pembesar).
  - *Catatan Desain*: Ikon profil/login ditiadakan untuk kemudahan akses langsung tanpa akun.
- **Pencarian & Widget Cepat**:
  - Input pencarian cepat nama surah, arti, atau nomor ayat.
  - Widget informasi ringkas: Waktu Sholat terdekat (*misal: Ashar 15:18*) dan Arah Kiblat (*294°*). Pada desktop berjejer harmonis di samping kolom pencarian.
- **Banner Status "Terakhir Dibaca"**:
  - Card hijau emerald bertekstur anggun menampilkan nama surah kaligrafi, posisi ayat, nomor halaman, persentase progres, dan tombol aksi tegas *"Lanjutkan Membaca"*.
- **Segmented Control & Daftar Surah**:
  - Tab pilihan: *Surah* | *Juz* | *Halaman*.
  - Baris surah lapang: Nomor urut dalam badge, nama Latin, terjemahan, jumlah ayat & jenis turun (Makkiyah/Madaniyah), serta tulisan Arab di sisi kanan. (Beradaptasi otomatis menjadi 2–3 kolom di layar desktop).

---

### 4.2 Layar 2: Halaman Baca Surah Al-Kahf (`Halaman Baca Surah Al-Kahf`)
*Tujuan: Layar inti tempat pengguna membaca kalam suci dengan tingkat konsentrasi dan ketenangan maksimal.*
- **Sticky Header**:
  - Tombol Kembali (`Back`), Nama & Kaligrafi Surah, indikator juz.
  - Tombol **"Lompat"**: Membuka modal interaktif Jump to Ayah.
  - Tombol **Pengaturan Tampilan**: Ikon slider untuk mengubah format visual teks secara langsung.
- **Header Kartu Surah**:
  - Banner hijau emerald ringkas memuat arti surah (*Gua / The Cave*), keutamaan, dan kaligrafi *Bismillahir Rahmanir Rahim* yang lapang.
- **Alur Ayat (Ayah Stream)**:
  - Berada di dalam kontainer terpusat `max-w-3xl` agar panjang baris terjemahan tetap ideal untuk mata (50–75 karakter per baris).
  - Teks Arab rata kanan dengan spasi harakat vertikal luas.
  - Transliterasi Latin bersambung ke Terjemahan Bahasa Indonesia.
  - Aksi per ayat ringkas di pojok bawah: Bookmark/Simpan, Salin Ayat, dan Bagikan (tanpa kontrol audio suara).

---

### 4.3 Layar 3: Interaksi "Lompat ke Ayat" (*Jump to Ayah Modal*)
*Tujuan: Memudahkan navigasi cepat pada surah-surah panjang tanpa perlu scroll manual.*
- **Format Tampilan**:
  - Pada Mobile: Bottom Sheet dengan *swipe handle*.
  - Pada Web Desktop: Dialog pop-up di tengah layar (lebar 520px) dengan bayangan lembut dan dukungan input keyboard fisik.
- **Header Modal**: Judul *"Lompat ke Ayat"*, badge jumlah total ayat surah (*110 Ayat*), dan tombol tutup (*X*).
- **Input Angka Langsung**: Form input nomor ayat berukuran ramah sentuh & klik mouse dengan tombol CTA *"Buka Ayat"*.
- **Pintasan Ayat Populer & Penanda Kisah**:
  - Akses 1-sentuhan menuju ayat-ayat penting Surah Al-Kahf:
    - Ayat 1: Awal Surah & Pujian kepada Allah
    - Ayat 10: Doa Perlindungan Pemuda Kahfi
    - Ayat 28: Nasihat Kesabaran & Keikhlasan
    - Ayat 50: Kisah Adam & Iblis
    - Ayat 83: Kisah Raja Dzulkarnain
    - Ayat 110: Penutup (Tauhid & Amal Saleh)
- **Navigasi Blok Ayat**: Selector pill per rentang puluhan ayat (*1-10, 11-20, ... 101-110*) dan deretan tombol nomor instan.

---

### 4.4 Layar 4 & Layar 5: Modal Pengaturan Tampilan Baca (Mode Terang & Mode Gelap)
*Tujuan: Menyesuaikan kenyamanan fisiologis pembaca baik di siang hari maupun malam hari.*
- **Format Responsif**: Bottom Sheet di mobile, Centered Modal Dialog di web desktop.
- **Slider Live Preview**:
  - Slider ukuran font Arab (rentang 24px – 42px).
  - Slider ukuran font Terjemahan (rentang 13px – 22px).
  - Boks pratinjau kalimat basmalah dan ayat secara real-time.
- **Pilihan Gaya Mushaf Kaligrafi**:
  - *Uthmani (Hafs Madinah)*, *IndoPak (Asia Selatan)*, dan *Kemenag (Standar Indonesia)*.
- **Toggle Kontrol Konten**:
  - Switch on/off Terjemahan Bahasa Indonesia.
  - Switch on/off Transliterasi Latin.
- **Varian Tema Lengkap**:
  - **Mode Terang**: Latar krem hangat `#FAF8F5`, boks pratinjau putih, aksen hijau emerald `#1B4332`.
  - **Mode Gelap**: Latar gelap deep charcoal `#121816` & `#1A2420`, teks Arab gading terang `#F3EED9`, aksen hijau mint sage `#52B788`.
- **Tombol CTA Bawah**: *"Terapkan Pengaturan"* dan opsi *"Reset"*.

---

### 4.5 Layar 6: Koleksi Bookmark & Terakhir Dibaca (`Bookmark & Terakhir Dibaca`)
*Tujuan: Manajemen ayat favorit, doa harian, dan pencatatan hafalan tilawah.*
- **Header**: Judul *"Penanda & Simpanan"*, subjudul panduan tilawah harian.
- **Kartu Highlight Bacaan Terakhir**: Menampilkan surah, juz, halaman, waktu terakhir dibuka, dan tombol *"Lanjutkan"*.
- **Tab Filter Koleksi**: *Semua*, *Ayat Pilihan*, *Doa Al-Qur'an*, *Juz 'Amma*.
- **Tampilan Desktop**: Daftar kartu ayat tersimpan otomatis tertata dalam grid 2 kolom rapi sehingga proporsional dan tidak tampak kosong melompong.
- **Kartu Item Ayat Tersimpan**:
  - Badge nomor ayat, nama surah, jenis surah.
  - Cuplikan teks Arab berharakat indah.
  - Catatan tadabbur singkat dan tag folder (misal: `#Hafalan`, `#Jumat Rutin`).
- **Aksi Cepat**: Tombol *"Folder Baru"* dan *"Tandai Cepat"*.

---

## 5. Navigasi Global (Global Navigation Structure)

1. **Struktur Navigasi Mobile (Fixed Bottom Bar 5 Menu)**:
   - **Beranda** (`Home`): Dasbor, widget, pencarian, dan daftar surah.
   - **Surah** (`Surah List`): Indeks lengkap 114 surah.
   - **Juz** (`Juz Index`): Daftar 30 Juz dan pembagian rubu' / hizb.
   - **Bookmark** (`Saved Items`): Koleksi penanda ayat dan folder hafalan.
   - **Pengaturan** (`Settings`): Preferensi tema dan tampilan baca.
2. **Struktur Navigasi Web Desktop (Clean Top Header / Collapsible Rail)**:
   - Navigasi berpindah ke bilah atas (*Top Bar*) atau sidebar kiri yang ramping, membebaskan 100% area bawah layar untuk kenyamanan membaca terus-menerus.

---

## 6. Ringkasan Batasan Desain (*Intentional Exclusions*)
Sesuai arahan dan kesepakatan desain:
1. **Tanpa Fitur Login / Akun Pengguna**: Memastikan *zero-friction*. Pengguna tidak perlu mendaftar, memasukkan kata sandi, atau terhubung ke server eksternal untuk membaca firman-Nya. Semua riwayat dan penanda disimpan langsung di penyimpanan lokal perangkat (`localStorage`).
2. **Tanpa Fitur Audio / Suara Murottal**: Menjaga estetika aplikasi tetap bersih dari tombol putar audio (*audio player scrubber*, slider volume, opsi unduh murottal), mendukung fokus murni pada kemampuan membaca visual dan tadabbur teks.
