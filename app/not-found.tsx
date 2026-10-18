'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }} className="min-h-screen pt-20 md:pt-20 pb-20 md:pb-0 flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-serif-heading font-bold mb-4">404</h1>
        <p className="text-2xl font-semibold mb-2">Halaman tidak ditemukan</p>
        <p className="text-text-secondary mb-8">Maaf, halaman yang Anda cari tidak tersedia.</p>
        <Link href="/" className="inline-block px-6 py-3 bg-primary text-primary-contrast rounded-md font-medium">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
