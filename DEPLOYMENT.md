# 🚀 Panduan Deploy ke Vercel

## Prasyarat
- Akun GitHub dengan repository ini
- Akun Vercel (gratis di https://vercel.com)

## Langkah-Langkah

### 1. Persiapan Lokal
```bash
# Pastikan semua perubahan sudah tersimpan
git status

# Jika belum ada git repo, inisialisasi
git init
git add .
git commit -m "Initial commit: Al-Qur'an Digital"
```

### 2. Push ke GitHub
```bash
# Tambahkan remote repository
git remote add origin https://github.com/username/alquran.git

# Push ke branch main
git branch -M main
git push -u origin main
```

### 3. Import ke Vercel

1. Buka https://vercel.com/new
2. Pilih GitHub sebagai Git provider
3. Login dengan akun GitHub Anda
4. Cari repository "alquran"
5. Klik "Import"

### 4. Konfigurasi Project di Vercel

**Framework**: Next.js ✓ (Vercel auto-detect)

**Build Settings**:
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

**Environment Variables**:
Tambahkan di "Environment Variables":
```
QURAN_API_URL=https://equran.id/api/v2
QURAN_JUZ_API_URL=https://api.alquran.cloud/v1
```

### 5. Deploy

Klik tombol **"Deploy"**. Vercel akan:
1. Clone repository
2. Install dependencies
3. Menjalankan build
4. Deploy ke production

Build akan selesai dalam 2-5 menit.

### 6. Custom Domain (Opsional)

Setelah deployment berhasil:
1. Buka Project Settings di Vercel
2. Klik "Domains"
3. Tambahkan custom domain Anda
4. Ikuti instruksi DNS configuration

## Troubleshooting

### Build Gagal: "Memory exceeded"
Solusi: Upgrade ke plan Vercel berbayar atau optimasi build.

### Static Generation Timeout
Solusi: Vercel akan otomatis revalidate data sesuai setting `revalidate` di Next.js.

### API Response Lambat
Solusi: Backup data lokal di `data/` akan digunakan lebih dulu (fallback).

## Monitoring

Setelah deploy, monitor di Vercel Dashboard:
- **Analytics**: Traffic dan performa
- **Deployments**: Riwayat deployment
- **Logs**: Build dan runtime logs
- **Function**: Edge function dan API routes (jika ada)

## Continuous Deployment

Setelah setup awal:
- Setiap push ke branch `main` akan trigger deployment otomatis
- Deployment preview untuk setiap pull request
- Rollback mudah ke versi sebelumnya

## Tips Performa

1. **Caching**: Vercel otomatis cache static assets
2. **ISR (Incremental Static Regeneration)**: Data surah di-revalidate setiap 30 hari
3. **CDN Global**: Vercel menggunakan edge network global
4. **Service Worker**: PWA offline support sudah built-in

## Referensi

- Dokumentasi Next.js: https://nextjs.org/docs
- Dokumentasi Vercel: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment

---

Setelah deploy berhasil, bagikan URL dengan komunitas! 🎉
