'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'outline' | 'filled' | 'white';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  isPhoneLink?: boolean;
}

export default function Button({
  children,
  href,
  variant = 'outline',
  className = '',
  onClick,
  type = 'button',
  isPhoneLink = false,
}: ButtonProps) {
  const baseStyles = 'inline-block px-6 py-3 text-sm tracking-widest uppercase font-serif transition-all duration-300';
  
  const variants = {
    outline: 'border border-gold text-gold hover:bg-gold hover:text-luxury-black',
    filled: 'bg-gold text-luxury-black hover:bg-white',
    white: 'border border-white text-white hover:bg-white hover:text-luxury-black',
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

  // External or phone link
  if (href && (href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http') || isPhoneLink)) {
    return (
      <a href={href} className={combinedStyles}>
        {children}
      </a>
    );
  }

  // Internal link
  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  // Button
  return (
    <button type={type} onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  );
}
