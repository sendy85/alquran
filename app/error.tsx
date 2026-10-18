'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }} className="min-h-screen pt-20 md:pt-20 pb-20 md:pb-0 flex items-center justify-center">
      <div className="text-center px-4 max-w-md">
        <h1 className="text-4xl font-serif-heading font-bold mb-4">Terjadi Kesalahan</h1>
        <p className="text-text-secondary mb-3">Maaf, terjadi kesalahan saat memuat halaman.</p>
        <p className="text-sm text-text-tertiary mb-6 break-all">{error.message}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-2 bg-primary text-primary-contrast rounded-md font-medium"
          >
            Coba Lagi
          </button>
          <Link href="/" className="px-6 py-2 border border-primary text-primary rounded-md font-medium">
            Ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
