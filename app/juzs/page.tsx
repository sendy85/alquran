'use client';

import Link from 'next/link';

export default function JuzsPage() {
  return (
    <div style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }} className="min-h-screen pt-20 md:pt-20 pb-20 md:pb-0">
      <div className="max-w-reading-container mx-auto px-4 md:px-8">
        <header className="mb-8 mt-6">
          <h1 className="text-3xl md:text-4xl font-serif-heading font-bold">30 Juz Al-Qur'an</h1>
          <p className="text-text-secondary mt-2">Bagi Al-Qur'an menjadi 30 bagian untuk tadabbur harian</p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 30 }).map((_, i) => (
            <Link
              key={i + 1}
              href={`/juz/${i + 1}`}
              className="p-4 bg-surface-container-lowest rounded-md border border-border-subtle hover:border-primary hover:shadow-subtle transition text-center"
            >
              <p className="font-serif-heading font-bold text-2xl text-primary">Juz</p>
              <p className="text-3xl font-bold text-text-primary mt-2">{i + 1}</p>
              <p className="text-xs text-text-tertiary mt-2">Bagian {i + 1} dari 30</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
