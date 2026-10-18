/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: 'var(--surface)',
        'surface-low': 'var(--surface-container-low)',
        'surface-lowest': 'var(--surface-container-lowest)',
        'surface-container-low': 'var(--surface-container-low)',
        'surface-container-lowest': 'var(--surface-container-lowest)',
        primary: 'var(--primary)',
        'primary-contrast': 'var(--primary-contrast)',
        'secondary-gold': 'var(--secondary-gold)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'border-subtle': 'var(--border-subtle)',
        danger: 'var(--danger)',
      },
      fontFamily: {
        'arabic': ['Amiri', 'Scheherazade New', 'Noto Naskh Arabic', 'serif'],
        'serif-heading': ['Newsreader', 'Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
        'sans-secondary': ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'arabic-mobile': '32px',
        'arabic-desktop': '36px',
        'heading-mobile': '24px',
        'heading-desktop': '32px',
        'translation-mobile': '15px',
        'translation-desktop': '16px',
        'transliteration-mobile': '13px',
        'transliteration-desktop': '14px',
        'badge-mobile': '12px',
        'badge-desktop': '13px',
      },
      lineHeight: {
        'arabic': '2.2',
        'arabic-loose': '2.4',
        'translation': '1.6',
        'heading': '1.2',
      },
      borderRadius: {
        'sm': '6px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        'sheet': '24px',
        'full': '9999px',
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(27, 67, 50, 0.05)',
      },
      maxWidth: {
        'reading-container': '900px',
      },
    },
  },
  plugins: [],
}
