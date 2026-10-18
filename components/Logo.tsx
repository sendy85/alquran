'use client';

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 24, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Background rounded square */}
      <rect width="24" height="24" rx="6" fill="#1B4332" />

      {/* Open book glyph - left page */}
      <path
        d="M 7 5 L 7 19 Q 7 19.5 7.5 19.5 L 11 19.5 L 11 5 Q 11 4.5 10.5 4.5 L 7.5 4.5 Q 7 4.5 7 5 Z"
        fill="#F3EED9"
      />

      {/* Open book glyph - right page */}
      <path
        d="M 13 5 L 13 19 Q 13 19.5 13.5 19.5 L 17 19.5 L 17 5 Q 17 4.5 16.5 4.5 L 13.5 4.5 Q 13 4.5 13 5 Z"
        fill="#F3EED9"
      />

      {/* Spine line in center */}
      <line x1="12" y1="5" x2="12" y2="19" stroke="#1B4332" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}
