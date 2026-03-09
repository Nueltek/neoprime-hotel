'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Phone } from 'lucide-react';
import { fadeUpVariants, viewportSettings } from '@/lib/utils';
import { useBookingPhone } from '@/components/providers/SiteSettingsProvider';

interface Offer {
  _id: string;
  title: string;
  subtitle?: string;
  description: string;
  discount?: string;
  image?: { url: string };
  slug?: string;
  validUntil?: string;
}

// Fallback offer if none in database
const fallbackOffer: Offer = {
  _id: 'fallback',
  title: 'Spring Getaway Package',
  subtitle: 'Limited Time Offer',
  description: 'Enjoy 20% off your stay plus complimentary breakfast for two when you book direct.',
  discount: '20% OFF',
};

export default function OfferTeaser() {
  const [offer, setOffer] = useState<Offer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const bookingPhone = useBookingPhone();
  const phoneLink = `tel:${bookingPhone.replace(/\s/g, '').replace(/[()]/g, '')}`;

  useEffect(() => {
    const fetchLatestOffer = async () => {
      try {
        const res = await fetch('/api/offers?limit=1');
        if (res.ok) {
          const data = await res.json();
          if (data.offers && data.offers.length > 0) {
            setOffer(data.offers[0]);
          } else {
            setOffer(fallbackOffer);
          }
        } else {
          setOffer(fallbackOffer);
        }
      } catch (error) {
        console.error('Error fetching offer:', error);
        setOffer(fallbackOffer);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestOffer();
  }, []);

  if (isLoading) {
    return (
      <div className="relative z-20 -mt-12 px-6 lg:px-8">
        <div className="max-w-content mx-auto">
          <div className="bg-white shadow-2xl h-24 flex items-center justify-center">
            <div className="animate-spin w-6 h-6 border-2 border-gold border-t-transparent rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!offer) return null;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      variants={fadeUpVariants}
      className="relative z-20 -mt-12 px-6 lg:px-8"
    >
      <div className="max-w-content mx-auto">
        <div className="bg-white shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Offer Image - Hidden on mobile, shown on larger screens */}
            {offer.image?.url && (
              <div className="hidden lg:block lg:col-span-3 relative min-h-[140px]">
                <Image
                  src={offer.image.url}
                  alt={offer.title}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
              </div>
            )}

            {/* Offer Content */}
            <div className={`${offer.image?.url ? 'lg:col-span-6' : 'lg:col-span-9'} p-6 lg:p-8 flex flex-col justify-center`}>
              <div className="flex items-center gap-3 mb-2">
                <Sparkles size={16} className="text-gold" />
                <span className="text-xs text-gold uppercase tracking-[0.2em] font-sans">
                  {offer.subtitle || 'Featured Offer'}
                </span>
                {offer.discount && (
                  <span className="bg-gold/10 text-gold text-xs font-sans px-2 py-0.5 rounded">
                    {offer.discount}
                  </span>
                )}
              </div>
              
              <h3 className="text-xl lg:text-2xl text-luxury-black font-sans uppercase tracking-wide mb-2">
                {offer.title}
              </h3>
              
              <p className="text-text-muted font-serif text-sm lg:text-base line-clamp-2 hidden sm:block">
                {offer.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col border-t lg:border-t-0 lg:border-l border-gray-100">
              <Link
                href="/offers"
                className="flex-1 flex items-center justify-center gap-2 p-4 lg:p-6 bg-gold hover:bg-gold-dark text-luxury-black transition-colors group"
              >
                <span className="text-sm font-sans uppercase tracking-widest">
                  View Offer
                </span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              
              <a
                href={phoneLink}
                className="flex-1 flex items-center justify-center gap-2 p-4 lg:p-6 bg-luxury-black hover:bg-luxury-dark text-white transition-colors group"
              >
                <Phone size={16} />
                <span className="text-sm font-sans uppercase tracking-widest">
                  Book Now
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
