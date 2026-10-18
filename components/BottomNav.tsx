'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Grid3X3, Bookmark, Settings } from 'lucide-react';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Beranda', icon: Home },
    { href: '/surahs', label: 'Surah', icon: BookOpen },
    { href: '/juzs', label: 'Juz', icon: Grid3X3 },
    { href: '/bookmarks', label: 'Bookmark', icon: Bookmark },
    { href: '/settings', label: 'Pengaturan', icon: Settings },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-container-lowest border-t border-border-subtle flex justify-around py-2 z-[50]" style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))' }}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center w-16 h-16 text-xs gap-1">
            <Icon
              size={24}
              className={isActive ? 'text-primary' : 'text-text-tertiary'}
            />
            <span className={isActive ? 'text-primary font-medium' : 'text-text-tertiary'}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
