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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-lowest border-t border-border-subtle flex justify-around z-40" style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))' }}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center flex-1 py-2 text-xs gap-1 relative">
            <Icon
              size={24}
              className={isActive ? 'text-primary' : 'text-text-tertiary'}
            />
            <span className={isActive ? 'text-primary font-medium' : 'text-text-tertiary'}>{item.label}</span>
            {isActive && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
