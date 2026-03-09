// Navigation types
export interface NavItem {
  label: string;
  href: string;
}

// Feature card types
export interface FeatureCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

// Room section types
export interface RoomSectionProps {
  subtitle: string;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  reverse?: boolean;
}

// Event/Meeting card types
export interface EventCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

// Offer card types
export interface OfferCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

// Gallery image types
export interface GalleryImage {
  src: string;
  alt: string;
  aspectRatio?: 'square' | 'landscape' | 'portrait';
}

// Section heading types
export interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  light?: boolean;
  centered?: boolean;
  className?: string;
}

// Button types
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'outline' | 'filled' | 'white';
  className?: string;
  onClick?: () => void;
  href?: string;
}

// Booking widget field types
export interface BookingField {
  label: string;
  type: 'date' | 'select' | 'text';
  placeholder?: string;
  options?: string[];
}
