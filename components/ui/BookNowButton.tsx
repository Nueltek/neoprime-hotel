'use client';

import { useBookingPhone } from '@/components/providers/SiteSettingsProvider';

interface BookNowButtonProps {
  variant?: 'primary' | 'outline' | 'white';
  className?: string;
  children?: React.ReactNode;
}

export default function BookNowButton({ 
  variant = 'primary', 
  className = '',
  children = 'Book Now'
}: BookNowButtonProps) {
  const bookingPhone = useBookingPhone();
  const phoneLink = `tel:${bookingPhone.replace(/\s/g, '').replace(/[()]/g, '')}`;

  const baseStyles = 'inline-block px-6 py-3 font-serif text-sm uppercase tracking-widest transition-all duration-300';
  
  const variants = {
    primary: 'bg-gold text-luxury-black hover:bg-white',
    outline: 'border border-gold text-gold hover:bg-gold hover:text-luxury-black',
    white: 'border border-white text-white hover:bg-white hover:text-luxury-black',
  };

  return (
    <a 
      href={phoneLink}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
