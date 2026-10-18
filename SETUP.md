# 🛠️ Panduan Setup Development Lokal

## Prasyarat

- **Node.js**: >= 18.x (download di https://nodejs.org)
- **npm**: Biasanya sudah include dengan Node.js
- **Git**: (opsional, untuk version control)
- **Code Editor**: VS Code, WebStorm, atau editor favorit Anda

## Instalasi & Setup

### 1. Clone atau Download Repository

**Dengan Git:**
```bash
git clone <repository-url>
cd alquran
```

**Atau download ZIP** dari GitHub dan extract.

### 2. Install Dependencies

```bash
npm install
```

Tunggu sampai selesai (biasanya 2-5 menit). Ini akan download semua library yang diperlukan.

### 3. Konfigurasi Environment

Copy file `.env.example` menjadi `.env.local`:

```bash
cp .env.example .env.local
```

Atau manual:
1. Buka folder `alquran`
2. Lihat file `.env.example`
3. Copy isinya
4. Buat file baru `.env.local`
5. Paste isinya

File `.env.local` sudah berisi URL API yang benar (tidak perlu diubah).

**Catatan**: `.env.local` sudah di `.gitignore`, jadi tidak akan di-commit.

### 4. Jalankan Development Server

```bash
npm run dev
```

Output akan terlihat seperti:
```
> alquran@1.0.0 dev
> next dev

  ▲ Next.js 14.2.35
  - Local:        http://localhost:3000
```

Buka browser dan akses http://localhost:3000.

## Struktur Proyek

```
alquran/
├── app/                 # Halaman & routes (Next.js App Router)
├── components/          # React components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions & API calls
├── types/              # TypeScript interfaces
├── public/             # Static files (manifest, sw.js, dll)
├── scripts/            # Utility scripts (fetch-data.ts)
├── data/               # Cached data (optional)
├── design.md           # Design system & UI specs
├── README.md           # Dokumentasi utama
├── DEPLOYMENT.md       # Panduan deploy
├── .env.example        # Template environment variables
├── .env.local          # Environment variables (git-ignored)
└── package.json        # Dependencies & scripts
```

## Development Commands

| Command | Fungsi |
|---------|--------|
| `npm run dev` | Jalankan dev server di localhost:3000 |
| `npm run build` | Build untuk production |
| `npm start` | Jalankan production server |
| `npm run lint` | Lint code dengan ESLint |
| `npm run fetch-data` | Download & cache data surah dari API |

## Workflow Development

### 1. Buat Branch Baru (Opsional)

```bash
git checkout -b feature/nama-fitur
```

### 2. Edit File

Gunakan code editor favorit. Dev server otomatis reload saat file berubah (Fast Refresh).

### 3. Test di Browser

Buka http://localhost:3000 dan test fitur.

### 4. Commit & Push (Opsional)

```bash
git add .
git commit -m "Deskripsi perubahan"
git push origin feature/nama-fitur
```

## Debugging

### Browser DevTools

1. Buka http://localhost:3000
2. Tekan `F12` atau `Ctrl+Shift+I`
3. Lihat Console, Network, Application tabs

### VS Code Debugging

1. Install extension "Debugger for Chrome"
2. Buat `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```
3. Tekan `F5` untuk start debugging

### Console Logging

```typescript
console.log('Debug info:', variable);
console.error('Error:', error);
```

## Testing Data

### Test dengan Data Lokal

```bash
npm run fetch-data
```

Ini akan download & cache data surah ke folder `data/`. Saat development, data akan dibaca dari sini terlebih dahulu.

### Test API Direct

Buka di browser:
- Daftar surah: https://equran.id/api/v2/surat
- Detail surah: https://equran.id/api/v2/surat/1
- Juz: https://api.alquran.cloud/v1/juz/1/editions/quran-uthmani,id.indonesian

## Performance Profiling

### Dengan React DevTools

1. Install extension "React Developer Tools"
2. Buka DevTools → Profiler tab
3. Record interaksi untuk analisis performa

### Build Size Analysis

```bash
npm run build
```

Next.js akan menampilkan file size di console.

## Common Issues

### Issue: Port 3000 Sudah Terpakai

Solusi:
```bash
# Gunakan port berbeda
npm run dev -- -p 3001
```

Atau kill process yang gunakan port 3000:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### Issue: Module Not Found

Solusi:
```bash
# Clear cache & reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript Error

Solusi:
1. Cek file ada error syntax
2. Save file, dev server akan recompile
3. Jika masih error, restart dev server

### Issue: localStorage Warning pada SSR

Normal untuk Next.js. Data localStorage hanya diakses di client-side (dalam `useEffect`).

## Browser Support

Aplikasi ini support:
- Chrome/Edge >= 90
- Firefox >= 88
- Safari >= 14
- Mobile browsers (iOS Safari, Chrome Mobile)

## Offline Testing

Karena PWA:
1. Jalankan production build: `npm run build && npm start`
2. Buka DevTools → Application tab → Service Workers
3. Check "Offline" checkbox
4. Halaman yang sudah dibuka akan tetap bisa diakses

## Tips & Tricks

### 1. Gunakan Git untuk Version Control
```bash
git init
git add .
git commit -m "Initial commit"
```

### 2. Buat `.env.local.example`
Jika menambah environment variable baru, update `.env.example`.

### 3. Hot Module Replacement (HMR)
Edit file akan auto-reload tanpa full page refresh.

### 4. Fast Refresh
React components akan di-refresh tanpa kehilangan state.

### 5. Keyboard Shortcuts
- `C`: Compile error details
- `R`: Manual full page refresh
- `A`: Toggle between dev & prod builds

## Ekstension yang Direkomendasikan (VS Code)

- **ES7+ React/Redux/React-Native snippets**
- **ESLint**
- **Prettier - Code formatter**
- **Tailwind CSS IntelliSense**
- **TypeScript Vue Plugin**
- **Thunder Client** (API testing)

## Referensi

- Next.js Docs: https://nextjs.org/docs
- React Docs: https://react.dev
- TypeScript Docs: https://www.typescriptlang.org/docs
- Tailwind CSS: https://tailwindcss.com/docs

## Support & Kontribusi

Jika ada masalah atau pertanyaan:
1. Cek dokumentasi di README.md
2. Cek GitHub Issues
3. Buat Issue baru dengan deskripsi detail

---

Happy coding! 🚀
