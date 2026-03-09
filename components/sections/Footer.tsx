'use client';

import Link from 'next/link';
import { Instagram, Facebook, Twitter, Linkedin, Youtube, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useSiteSettings, useContactInfo, useSocialLinks, useBookingInfo } from '@/components/providers/SiteSettingsProvider';

const quickLinks = [
  { label: 'Rooms & Suites', href: '/rooms' },
  { label: 'Dining', href: '/dining' },
  { label: 'Special Offers', href: '/offers' },
  { label: 'Meetings & Events', href: '/meetings' },
  { label: 'Gift Cards', href: '/gifts' },
];

const exploreLinks = [
  { label: 'Our Story', href: '/our-story' },
  { label: 'Location', href: '/location' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog & Press', href: '/blog' },
  { label: 'Careers', href: '/careers' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Accessibility', href: '/accessibility' },
  { label: 'FAQs', href: '/faqs' },
];

export default function Footer() {
  const { settings } = useSiteSettings();
  const contact = useContactInfo();
  const social = useSocialLinks();
  const booking = useBookingInfo();

  const socialLinks = [
    { icon: Instagram, href: social.instagram, label: 'Instagram' },
    { icon: Facebook, href: social.facebook, label: 'Facebook' },
    { icon: Twitter, href: social.twitter, label: 'Twitter' },
    { icon: Linkedin, href: social.linkedin, label: 'LinkedIn' },
    { icon: Youtube, href: social.youtube, label: 'YouTube' },
  ].filter(link => link.href);

  const phoneLink = (booking.bookingPhone || contact.phone).replace(/\s/g, '').replace(/[()]/g, '');

  return (
    <footer className="bg-luxury-black border-t border-white/10">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-sans text-xl uppercase tracking-wide mb-2">
                Stay Connected
              </h3>
              <p className="text-text-muted font-serif">
                Subscribe for exclusive offers and updates
              </p>
            </div>
            <form className="flex w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 md:w-72 bg-transparent border border-white/20 text-white px-4 py-3 text-sm font-sans focus:outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gold text-luxury-black font-sans text-sm uppercase tracking-wider hover:bg-white transition-colors flex items-center gap-2"
              >
                Subscribe
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <svg viewBox="0 0 44 44" className="w-12 h-12">
                <rect
                  x="2" y="2" width="40" height="40"
                  fill="none"
                  stroke="#C6A56A"
                  strokeWidth="1"
                />
                <path
                  d="M14 12 L14 32 L18 32 L18 20 L26 32 L30 32 L30 12 L26 12 L26 24 L18 12 Z"
                  fill="none"
                  stroke="#C6A56A"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
              <div>
                <span className="text-white font-sans text-xl tracking-[0.25em] uppercase font-light block">
                  Neoprime
                </span>
                <span className="text-gold/80 text-[10px] tracking-[0.3em] uppercase">
                  {settings.tagline}
                </span>
              </div>
            </Link>
            
            <p className="text-text-muted font-serif text-sm leading-relaxed mb-6 max-w-sm">
              Experience unparalleled luxury in the heart of Newcastle. Where timeless elegance meets contemporary sophistication.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a 
                href={`tel:${phoneLink}`}
                className="flex items-center gap-3 text-white/80 hover:text-gold transition-colors"
              >
                <Phone size={18} className="text-gold" />
                <span className="font-sans text-sm">{booking.bookingPhone || contact.phone}</span>
              </a>
              <a 
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 text-white/80 hover:text-gold transition-colors"
              >
                <Mail size={18} className="text-gold" />
                <span className="font-sans text-sm">{contact.email}</span>
              </a>
              <div className="flex items-start gap-3 text-white/80">
                <MapPin size={18} className="text-gold flex-shrink-0 mt-0.5" />
                <span className="font-sans text-sm leading-relaxed">{contact.address}</span>
              </div>
            </div>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold transition-all duration-300"
                    aria-label={link.label}
                  >
                    <link.icon size={18} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold text-xs tracking-[0.2em] uppercase font-sans mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-gold text-sm font-sans transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-gold text-xs tracking-[0.2em] uppercase font-sans mb-6">
              Explore
            </h4>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-gold text-sm font-sans transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Departments */}
          <div>
            <h4 className="text-gold text-xs tracking-[0.2em] uppercase font-sans mb-6">
              Reservations
            </h4>
            <ul className="space-y-4">
              <li>
                <span className="text-white/50 text-xs uppercase tracking-wide block mb-1">Rooms</span>
                <a href={`mailto:${booking.reservationsEmail}`} className="text-white/70 hover:text-gold text-sm font-sans transition-colors">
                  {booking.reservationsEmail}
                </a>
              </li>
              <li>
                <span className="text-white/50 text-xs uppercase tracking-wide block mb-1">Dining</span>
                <a href={`mailto:${booking.diningEmail}`} className="text-white/70 hover:text-gold text-sm font-sans transition-colors">
                  {booking.diningEmail}
                </a>
              </li>
              <li>
                <span className="text-white/50 text-xs uppercase tracking-wide block mb-1">Events</span>
                <a href={`mailto:${booking.eventsEmail}`} className="text-white/70 hover:text-gold text-sm font-sans transition-colors">
                  {booking.eventsEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-text-muted text-xs font-sans">
              © {new Date().getFullYear()} Neoprime Hotels. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {legalLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-text-muted hover:text-gold text-xs font-sans transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
