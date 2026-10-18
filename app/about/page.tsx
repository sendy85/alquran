'use client';

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)', paddingBottom: 'calc(5rem + env(safe-area-inset-bottom))' }} className="min-h-screen pt-5 md:pt-20 md:pb-0">
      <div className="max-w-reading-container mx-auto px-4 md:px-8">
        <header className="mb-8 mt-6">
          <h1 className="text-3xl md:text-4xl font-serif-heading font-bold">Tentang</h1>
          <p className="text-text-secondary mt-2">Al-Qur'an Digital</p>
        </header>

        <div className="space-y-6 mb-8">
          <section className="p-6 bg-surface-container-lowest rounded-lg border border-border-subtle">
            <h2 className="text-xl font-semibold mb-3">Tentang Aplikasi</h2>
            <p className="text-text-secondary leading-relaxed">
              Al-Qur'an Digital adalah aplikasi web modern untuk membaca Al-Qur'an dengan nyaman. Dirancang dengan pendekatan mobile-first dan fully responsive, aplikasi ini menyediakan pengalaman membaca yang lapang, tenang, dan bebas distraksi.
            </p>
          </section>

          <section className="p-6 bg-surface-container-lowest rounded-lg border border-border-subtle">
            <h2 className="text-xl font-semibold mb-3">Fitur Utama</h2>
            <ul className="space-y-2 text-text-secondary">
              <li>✓ 114 Surah lengkap dengan teks Arab dan terjemahan Indonesia</li>
              <li>✓ 30 Juz untuk tadabbur harian</li>
              <li>✓ Bookmark ayat favorit</li>
              <li>✓ Pencatatan bacaan terakhir otomatis</li>
              <li>✓ Pengaturan font size dan display options</li>
              <li>✓ Mode terang dan gelap</li>
              <li>✓ Offline-ready (PWA)</li>
              <li>✓ Tanpa login, tanpa iklan, tanpa tracking</li>
            </ul>
          </section>

          <section className="p-6 bg-surface-container-lowest rounded-lg border border-border-subtle">
            <h2 className="text-xl font-semibold mb-3">Sumber Data</h2>
            <p className="text-text-secondary mb-3 leading-relaxed">
              Aplikasi ini menggunakan data dari dua sumber API publik terpercaya:
            </p>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li>
                <strong>equran.id</strong>: Menyediakan daftar 114 surah, detail surah, dan ayat-ayat dengan teks Arab (Uthmani), transliterasi Latin, dan terjemahan Bahasa Indonesia (Kemenag).
              </li>
              <li>
                <strong>AlQuran Cloud</strong>: Menyediakan data juz dengan teks Arab (Uthmani) dan terjemahan Indonesia.
              </li>
            </ul>
          </section>

          <section className="p-6 bg-surface-container-lowest rounded-lg border border-border-subtle">
            <h2 className="text-xl font-semibold mb-3">Privasi & Data</h2>
            <p className="text-text-secondary leading-relaxed mb-3">
              Semua data pengguna (bookmark, pengaturan, bacaan terakhir) disimpan secara lokal di perangkat Anda menggunakan localStorage. <strong>Data tidak pernah dikirim ke server mana pun.</strong> Aplikasi tidak mengumpulkan atau melacak informasi pribadi Anda.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Aplikasi ini bersifat offline-ready sebagai Progressive Web App (PWA). Halaman-halaman yang telah Anda buka dapat dibaca tanpa koneksi internet.
            </p>
          </section>

          <section className="p-6 bg-surface-container-lowest rounded-lg border border-border-subtle">
            <h2 className="text-xl font-semibold mb-3">Catatan Penting</h2>
            <div className="bg-primary text-primary-contrast p-4 rounded-md text-sm">
              <p className="mb-2">
                <strong>Integritas Teks Al-Qur'an:</strong> Teks Al-Qur'an dalam aplikasi ini tidak boleh diubah atau dimodifikasi. Teks ditampilkan sebagaimana adanya dari sumber data.
              </p>
              <p>
                <strong>Lisensi & Atribusi:</strong> Silakan periksa ketentuan lisensi dari equran.id dan AlQuran Cloud untuk penggunaan dan distribusi data mereka.
              </p>
            </div>
          </section>

          <section className="p-6 bg-surface-container-lowest rounded-lg border border-border-subtle">
            <h2 className="text-xl font-semibold mb-3">Teknologi</h2>
            <ul className="space-y-1 text-text-secondary text-sm">
              <li>• Next.js 14 (App Router)</li>
              <li>• TypeScript</li>
              <li>• Tailwind CSS</li>
              <li>• Progressive Web App (PWA)</li>
              <li>• localStorage API</li>
            </ul>
          </section>

          <section className="p-6 bg-surface-container-lowest rounded-lg border border-border-subtle">
            <h2 className="text-xl font-semibold mb-3">Rencana Pengembangan</h2>
            <ul className="space-y-2 text-text-secondary">
              <li>• Fitur audio murottal (opsional)</li>
              <li>• Pencarian ayat yang lebih canggih</li>
              <li>• Tafsir singkat per surah</li>
              <li>• Sinkronisasi antar perangkat (dengan login opsional)</li>
              <li>• Dukungan lebih banyak bahasa</li>
              <li>• Mode reading yang lebih fleksibel</li>
            </ul>
          </section>

          <section className="p-6 bg-surface-container-lowest rounded-lg border border-border-subtle">
            <h2 className="text-xl font-semibold mb-3">Kontribusi & Feedback</h2>
            <p className="text-text-secondary leading-relaxed">
              Aplikasi ini dikembangkan dengan tujuan memberikan kemudahan dalam membaca Al-Qur'an. Jika Anda memiliki saran, laporan bug, atau ingin berkontribusi, silakan kunjungi repositori proyek di GitHub.
            </p>
          </section>

          <section className="p-6 bg-surface-container-lowest rounded-lg border border-border-subtle text-center">
            <p className="text-text-secondary text-sm">
              <strong>Semoga aplikasi ini bermanfaat dalam perjalanan tadabbur Al-Qur'an Anda.</strong>
            </p>
            <p className="text-text-tertiary text-xs mt-4">
              © 2026 Al-Qur'an Digital. Semua hak terlindungi sesuai ketentuan lisensi sumber data.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
