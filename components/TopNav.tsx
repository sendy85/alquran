'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { HeaderControls } from './HeaderControls';

export function TopNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Beranda' },
    { href: '/surahs', label: 'Surah' },
    { href: '/juzs', label: 'Juz' },
    { href: '/bookmarks', label: 'Bookmark' },
    { href: '/settings', label: 'Pengaturan' },
    { href: '/about', label: 'Tentang' },
  ];

  return (
    <nav className="hidden md:flex sticky top-0 bg-surface-lowest border-b border-border-subtle px-8 h-16 items-center gap-8 z-50 overflow-x-auto">
      <Link href="/" className="font-serif-heading font-bold text-xl text-primary flex-shrink-0 flex items-center gap-2" aria-label="Beranda">
        <Logo size={28} />
      </Link>
      <div className="flex gap-6 ml-auto items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`transition flex-shrink-0 ${
                isActive ? 'text-primary' : 'text-text-secondary hover:text-primary'
              }`}
              aria-label={item.label}
              title={item.label}
            >
              <span className="sr-only">{item.label}</span>
            </Link>
          );
        })}
        <div className="pl-2 border-l border-border-subtle">
          <HeaderControls />
        </div>
      </div>
    </nav>
  );
}
