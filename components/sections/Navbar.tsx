'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { useSiteSettings, useBookingPhone, useAnnouncement } from '@/components/providers/SiteSettingsProvider';

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: 'Rooms', href: '/rooms' },
  { 
    label: 'Dining', 
    href: '/dining',
    children: [
      { label: 'The Restaurant', href: '/dining' },
      { label: 'The Grill', href: '/grill' },
      { label: 'Book a Table', href: '/book-table' },
    ]
  },
  { label: 'Offers', href: '/offers' },
  { 
    label: 'Meetings & Events', 
    href: '/meetings',
    children: [
      { label: 'Meetings', href: '/meetings' },
      { label: 'Events', href: '/events' },
    ]
  },
  { label: 'Gallery', href: '/gallery' },
  { 
    label: 'Explore', 
    href: '#',
    children: [
      { label: 'Our Story', href: '/our-story' },
      { label: 'Location', href: '/location' },
      { label: 'Blog & Press', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ]
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const pathname = usePathname();
  const { settings } = useSiteSettings();
  const bookingPhone = useBookingPhone();
  const announcement = useAnnouncement();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const phoneLink = `tel:${bookingPhone.replace(/\s/g, '').replace(/[()]/g, '')}`;
  const hasAnnouncement = announcement.isActive && announcement.text && showAnnouncement;
  const announcementHeight = hasAnnouncement ? 36 : 0;

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Announcement Bar with Close Button */}
      <AnimatePresence>
        {hasAnnouncement && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 36, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-[60] bg-gold text-luxury-black overflow-hidden"
          >
            <div className="h-9 flex items-center justify-between px-4 max-w-7xl mx-auto">
              {/* Spacer for centering */}
              <div className="w-8" />
              
              {/* Announcement Text */}
              <p className="text-xs sm:text-sm font-serif tracking-wide text-center flex-1">
                {announcement.link ? (
                  <Link href={announcement.link} className="hover:underline">
                    {announcement.text}
                  </Link>
                ) : (
                  announcement.text
                )}
              </p>
              
              {/* Close Button - Always Visible */}
              <button
                onClick={() => setShowAnnouncement(false)}
                className="w-8 h-8 flex items-center justify-center hover:bg-black/10 rounded transition-colors flex-shrink-0"
                aria-label="Close announcement"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <header
        className="fixed left-0 right-0 z-50 transition-all duration-300"
        style={{ top: announcementHeight }}
      >
        <div
          className={`transition-all duration-300 ${
            scrolled || isOpen
              ? 'bg-luxury-black border-b border-white/10' 
              : 'bg-gradient-to-b from-black/80 via-black/50 to-transparent'
          }`}
        >
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group z-10">
                <div className="relative">
                  <svg viewBox="0 0 44 44" className="w-10 h-10 sm:w-11 sm:h-11">
                    <rect
                      x="2" y="2" width="40" height="40"
                      fill="none"
                      stroke="#C6A56A"
                      strokeWidth="1"
                      className="transition-all duration-300 group-hover:stroke-white"
                    />
                    <path
                      d="M14 12 L14 32 L18 32 L18 20 L26 32 L30 32 L30 12 L26 12 L26 24 L18 12 Z"
                      fill="none"
                      stroke="#C6A56A"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                      className="transition-all duration-300 group-hover:stroke-white"
                    />
                  </svg>
                </div>
                <div className="hidden sm:block">
                  <span className="text-white text-lg tracking-[0.25em] uppercase font-light block leading-tight font-serif">
                    Neoprime
                  </span>
                  <span className="text-gold/80 text-[10px] tracking-[0.3em] uppercase font-light font-serif">
                    {settings.tagline || 'Luxury Redefined'}
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {navItems.map((item) => (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-serif tracking-wide transition-colors ${
                        pathname === item.href || pathname.startsWith(item.href + '/')
                          ? 'text-gold'
                          : 'text-white/90 hover:text-gold'
                      }`}
                    >
                      {item.label}
                      {item.children && <ChevronDown size={14} className="opacity-60" />}
                    </Link>
                    
                    {/* Dropdown */}
                    {item.children && (
                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 pt-2"
                          >
                            <div className="bg-luxury-black border border-white/10 rounded min-w-[180px] py-2 shadow-xl">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className={`block px-4 py-2.5 text-sm font-serif transition-colors ${
                                    pathname === child.href
                                      ? 'text-gold bg-white/5'
                                      : 'text-white/80 hover:text-gold hover:bg-white/5'
                                  }`}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-3 sm:gap-4">
                <a
                  href={phoneLink}
                  className="hidden md:flex items-center gap-2 text-white/80 hover:text-gold transition-colors font-serif"
                >
                  <Phone size={16} />
                  <span className="text-sm">{bookingPhone}</span>
                </a>

                <a
                  href={phoneLink}
                  className="hidden sm:block px-4 sm:px-5 py-2 sm:py-2.5 bg-gold text-luxury-black text-xs sm:text-sm font-serif uppercase tracking-wider hover:bg-white transition-all duration-300"
                >
                  Book Now
                </a>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="lg:hidden p-2 text-white hover:text-gold transition-colors relative z-[70]"
                  aria-label="Toggle menu"
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </nav>
        </div>

        {/* Mobile Menu - Solid Black Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[55] lg:hidden bg-luxury-black"
              style={{ top: announcementHeight + 80 }}
            >
              <div className="h-full overflow-y-auto">
                <div className="max-w-7xl mx-auto px-6 py-8 space-y-2">
                  {navItems.map((item) => (
                    <div key={item.label} className="border-b border-white/10 pb-2">
                      <Link
                        href={item.href}
                        onClick={() => !item.children && setIsOpen(false)}
                        className={`block py-3 text-lg font-serif transition-colors ${
                          pathname === item.href ? 'text-gold' : 'text-white hover:text-gold'
                        }`}
                      >
                        {item.label}
                      </Link>
                      {item.children && (
                        <div className="pl-4 space-y-1 pb-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setIsOpen(false)}
                              className={`block py-2 text-base font-serif transition-colors ${
                                pathname === child.href ? 'text-gold' : 'text-white/60 hover:text-gold'
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Mobile Phone & Book */}
                  <div className="pt-6 space-y-4">
                    <a
                      href={phoneLink}
                      className="flex items-center gap-3 py-2 text-white/80 font-serif"
                    >
                      <Phone size={18} />
                      <span>{bookingPhone}</span>
                    </a>
                    <a
                      href={phoneLink}
                      onClick={() => setIsOpen(false)}
                      className="block py-4 bg-gold text-luxury-black text-center font-serif uppercase tracking-wider"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
