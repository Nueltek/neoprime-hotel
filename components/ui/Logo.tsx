'use client';

import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function Logo({ 
  variant = 'light', 
  size = 'md',
  showText = true,
  className = '' 
}: LogoProps) {
  const sizes = {
    sm: { icon: 32, text: 'text-lg', tagline: 'text-[8px]' },
    md: { icon: 40, text: 'text-xl', tagline: 'text-[10px]' },
    lg: { icon: 56, text: 'text-2xl', tagline: 'text-xs' },
  };

  const colors = {
    light: { primary: '#FFFFFF', accent: '#C6A56A' },
    dark: { primary: '#0A0B10', accent: '#C6A56A' },
  };

  const { icon, text, tagline } = sizes[size];
  const { primary, accent } = colors[variant];

  return (
    <Link href="/" className={`inline-flex items-center gap-3 ${className}`}>
      {/* N Logo Icon - Clear letter N design */}
      <svg 
        width={icon} 
        height={icon} 
        viewBox="0 0 48 48" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Outer frame */}
        <rect 
          x="2" 
          y="2" 
          width="44" 
          height="44" 
          stroke={accent} 
          strokeWidth="1" 
          fill="none"
          rx="2"
        />
        
        {/* Letter N - elegant serif-style */}
        <path
          d="M12 38 L12 10 L16 10 L16 28 L32 10 L36 10 L36 38 L32 38 L32 20 L16 38 L12 38"
          fill={accent}
        />
        
        {/* Decorative serifs */}
        <rect x="10" y="8" width="8" height="2" fill={accent} />
        <rect x="30" y="8" width="8" height="2" fill={accent} />
        <rect x="10" y="38" width="8" height="2" fill={accent} />
        <rect x="30" y="38" width="8" height="2" fill={accent} />
      </svg>

      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <span 
            className={`font-sans ${text} tracking-[0.3em] uppercase font-light`}
            style={{ color: primary }}
          >
            Neoprime
          </span>
          <span 
            className={`${tagline} tracking-[0.4em] uppercase`}
            style={{ color: accent }}
          >
            Hotels
          </span>
        </div>
      )}
    </Link>
  );
}

// Alternative minimal N logo for favicon/small spaces
export function LogoMark({ size = 24, color = '#C6A56A' }: { size?: number; color?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 20 L4 4 L7 4 L7 14 L17 4 L20 4 L20 20 L17 20 L17 10 L7 20 L4 20"
        fill={color}
      />
    </svg>
  );
}
