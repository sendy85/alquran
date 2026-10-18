import type { Metadata, Viewport } from 'next';
import { Amiri, Inter, Newsreader } from 'next/font/google';
import './globals.css';
import { BottomNav } from '@/components/BottomNav';
import { TopNav } from '@/components/TopNav';
import { FloatingThemeButton } from '@/components/FloatingThemeButton';
import { ServiceWorkerRegister } from '@/components/ServiceWorkerRegister';

const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-newsreader',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Al-Qur\'an Digital',
  description: 'Baca Al-Qur\'an 30 Juz lengkap dengan teks Arab dan terjemahan Bahasa Indonesia. Gratis, offline-ready, tanpa iklan.',
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', url: '/icon-192.png' },
  ],
  manifest: '/manifest.json',
  openGraph: {
    title: 'Al-Qur\'an Digital',
    description: 'Baca Al-Qur\'an 30 Juz dengan teks Arab dan terjemahan Indonesia',
    url: 'https://alquran-digital.vercel.app',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#1B4332',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const stored = localStorage.getItem('alquran_settings');
                const settings = stored ? JSON.parse(stored) : { theme: 'light' };
                let theme = settings.theme || 'light';
                if (theme === 'system') {
                  theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                if (theme === 'dark') {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              } catch (e) {
                // Fall back to light mode
              }
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.__installPrompt = null;
              window.addEventListener('beforeinstallprompt', function(e) {
                e.preventDefault();
                window.__installPrompt = e;
                window.dispatchEvent(new Event('installprompt-ready'));
              });
              window.addEventListener('appinstalled', function() {
                window.__installPrompt = null;
                window.dispatchEvent(new Event('installprompt-installed'));
              });
            `,
          }}
        />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/img/apple-touch-icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Al-Qur'an" />
      </head>
      <body className={`${inter.variable} ${newsreader.variable} ${amiri.variable} font-sans`}>
        <TopNav />
        {children}
        <FloatingThemeButton />
        <BottomNav />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}

