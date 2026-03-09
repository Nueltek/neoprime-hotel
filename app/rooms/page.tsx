'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import PublicLayout from '@/components/layouts/PublicLayout';
import PageHero from '@/components/ui/PageHero';
import { fadeUpVariants, staggerContainerVariants, viewportSettings } from '@/lib/utils';
import { Wifi, Car, Coffee, Utensils, Tv, Bath, Wind, Sparkles, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useBookingPhone } from '@/components/providers/SiteSettingsProvider';

interface RoomImage {
  url: string;
  publicId?: string;
  caption?: string;
  type: string;
}

interface Room {
  _id: string;
  title: string;
  slug: string;
  subtitle?: string;
  description: string;
  price: number;
  size: string;
  bedType: string;
  maxGuests: number;
  amenities: string[];
  images: RoomImage[];
  featured: boolean;
}

// Fallback static data
const staticRooms: Room[] = [
  {
    _id: 'cosy',
    title: 'Cosy Room',
    slug: 'cosy-room',
    description: 'Perfectly proportioned spaces designed for the discerning traveller. Our Cosy Rooms offer everything you need for a restful stay in refined surroundings.',
    size: '18-22 m²',
    bedType: 'King or Twin',
    price: 189,
    maxGuests: 2,
    images: [{ url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80', type: 'main' }],
    amenities: ['King-size bed', 'Rainfall shower', 'Smart TV', 'Nespresso machine', 'Luxury amenities'],
    featured: false
  },
  {
    _id: 'classic',
    title: 'Classic Room',
    slug: 'classic-room',
    description: 'Elegantly appointed rooms that balance timeless design with modern comfort. Enjoy generous space and premium amenities throughout your stay.',
    size: '25-30 m²',
    bedType: 'King',
    price: 249,
    maxGuests: 2,
    images: [{ url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80', type: 'main' }],
    amenities: ['King-size bed', 'Separate seating area', 'Walk-in shower', 'Work desk', 'City views'],
    featured: false
  },
  {
    _id: 'deluxe',
    title: 'Deluxe Room',
    slug: 'deluxe-room',
    description: 'Expansive rooms featuring floor-to-ceiling windows and luxurious furnishings. The perfect choice for those seeking extra space and elevated comfort.',
    size: '32-38 m²',
    bedType: 'Super King',
    price: 329,
    maxGuests: 2,
    images: [{ url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80', type: 'main' }],
    amenities: ['Super King bed', 'Panoramic views', 'Freestanding bath', 'Lounge area', 'Premium minibar'],
    featured: true
  },
  {
    _id: 'suite',
    title: 'Neoprime Suite',
    slug: 'neoprime-suite',
    description: 'Our signature suites represent the pinnacle of luxury accommodation. Indulge in separate living spaces, exceptional amenities, and personalised service.',
    size: '50-65 m²',
    bedType: 'Super King',
    price: 489,
    maxGuests: 4,
    images: [{ url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80', type: 'main' }],
    amenities: ['Separate living room', 'Private terrace', 'Soaking tub', 'Butler service', 'Champagne on arrival'],
    featured: true
  }
];

const amenities = [
  { icon: Wifi, label: 'High-Speed WiFi' },
  { icon: Car, label: 'Valet Parking' },
  { icon: Coffee, label: 'Nespresso Machine' },
  { icon: Utensils, label: 'Room Service' },
  { icon: Tv, label: 'Smart TV' },
  { icon: Bath, label: 'Luxury Bath Products' },
  { icon: Wind, label: 'Climate Control' },
  { icon: Sparkles, label: 'Daily Housekeeping' }
];

function RoomGallery({ images, title }: { images: RoomImage[]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!images || images.length === 0) return null;

  const showNavigation = images.length > 1;

  return (
    <>
      <div className="relative aspect-[4/3] overflow-hidden group cursor-pointer" onClick={() => setLightboxOpen(true)}>
        <Image
          src={images[currentIndex]?.url || ''}
          alt={`${title} - Image ${currentIndex + 1}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        
        {showNavigation && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + images.length) % images.length); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % images.length); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                  className={`w-2 h-2 rounded-full transition-colors ${idx === currentIndex ? 'bg-gold' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button className="absolute top-6 right-6 text-white p-2 hover:text-gold transition-colors">
              <X size={32} />
            </button>
            
            <div className="relative max-w-5xl max-h-[80vh] w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <Image
                src={images[currentIndex]?.url || ''}
                alt={title}
                width={1200}
                height={800}
                className="object-contain w-full h-full"
              />
              
              {showNavigation && (
                <>
                  <button
                    onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-12 h-12 bg-white/10 text-white flex items-center justify-center hover:bg-gold transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-12 h-12 bg-white/10 text-white flex items-center justify-center hover:bg-gold transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
              
              <p className="text-center text-white/60 mt-4 font-serif">
                {currentIndex + 1} / {images.length}
                {images[currentIndex]?.caption && ` — ${images[currentIndex].caption}`}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function RoomCard({ room, index, phoneLink }: { room: Room; index: number; phoneLink: string }) {
  const isReversed = index % 2 === 1;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      variants={fadeUpVariants}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        isReversed ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* Image Gallery */}
      <div className={isReversed ? 'lg:order-2' : ''}>
        <RoomGallery images={room.images} title={room.title} />
      </div>

      {/* Content */}
      <div className={isReversed ? 'lg:order-1' : ''}>
        <p className="text-gold text-xs tracking-[0.2em] uppercase mb-3 font-sans">
          {room.size} · {room.bedType}
        </p>
        <h3 className="text-3xl md:text-4xl text-white font-sans font-light uppercase tracking-wide mb-4">
          {room.title}
        </h3>
        <div className="w-12 h-px bg-gold mb-6" />
        <p className="text-text-secondary font-serif text-lg leading-relaxed mb-6">
          {room.description}
        </p>
        
        {/* Amenities */}
        {room.amenities && room.amenities.length > 0 && (
          <ul className="grid grid-cols-2 gap-2 mb-8">
            {room.amenities.slice(0, 6).map((amenity) => (
              <li key={amenity} className="text-text-muted text-sm font-serif flex items-center gap-2">
                <span className="w-1 h-1 bg-gold rounded-full" />
                {amenity}
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-6">
          <span className="text-gold font-sans text-lg">From £{room.price}</span>
          <a
            href={phoneLink}
            className="border border-gold text-gold hover:bg-gold hover:text-luxury-black px-6 py-3 font-serif uppercase tracking-widest text-sm transition-colors"
          >
            Book Now
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>(staticRooms);
  const [isLoading, setIsLoading] = useState(true);
  const bookingPhone = useBookingPhone();
  const phoneLink = `tel:${bookingPhone.replace(/\s/g, '').replace(/[()]/g, '')}`;

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch('/api/rooms');
        const data = await res.json();
        if (data.rooms && data.rooms.length > 0) {
          setRooms(data.rooms);
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <PublicLayout>
      <main className="min-h-screen bg-luxury-black">
        <PageHero
          title="Rooms & Suites"
          subtitle="Accommodation"
          image="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1920&q=80"
          height="medium"
        />

        {/* Introduction */}
        <section className="section-padding bg-white">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainerVariants}
            className="section-container text-center"
          >
            <motion.p variants={fadeUpVariants} className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-sans">
              Your Sanctuary Awaits
            </motion.p>
            <motion.h2 variants={fadeUpVariants} className="text-section text-luxury-black font-sans font-light uppercase tracking-wide mb-6">
              A Room for Every Journey
            </motion.h2>
            <motion.p variants={fadeUpVariants} className="text-text-muted font-serif text-lg max-w-3xl mx-auto leading-relaxed">
              Each of our beautifully designed rooms and suites offers a sanctuary of comfort and style. 
              From intimate spaces perfect for solo travellers to expansive suites ideal for special occasions, 
              every room has been thoughtfully crafted with luxury finishes, sumptuous bedding, and 
              state-of-the-art amenities to ensure an unforgettable stay.
            </motion.p>
          </motion.div>
        </section>

        {/* Rooms List */}
        <section className="section-padding bg-luxury-black">
          <div className="section-container space-y-24">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full" />
              </div>
            ) : (
              rooms.map((room, index) => (
                <RoomCard key={room._id} room={room} index={index} phoneLink={phoneLink} />
              ))
            )}
          </div>
        </section>

        {/* Amenities */}
        <section className="section-padding bg-luxury-dark">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainerVariants}
            className="section-container"
          >
            <motion.div variants={fadeUpVariants} className="text-center mb-16">
              <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-sans">
                Every Room Includes
              </p>
              <h2 className="text-section text-white font-sans font-light uppercase tracking-wide">
                Premium Amenities
              </h2>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {amenities.map((amenity) => (
                <div key={amenity.label} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 border border-gold/30 rounded-full flex items-center justify-center">
                    <amenity.icon className="text-gold" size={28} />
                  </div>
                  <p className="text-white font-sans text-sm tracking-wide">{amenity.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-luxury-black">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUpVariants}
            className="section-container text-center"
          >
            <h2 className="text-section text-white font-sans font-light uppercase tracking-wide mb-6">
              Ready to Book Your Stay?
            </h2>
            <p className="text-text-secondary font-serif text-lg max-w-2xl mx-auto mb-8">
              Contact our reservations team for special requests, extended stays, or to discuss 
              which room best suits your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={phoneLink}
                className="bg-gold hover:bg-white text-luxury-black px-8 py-4 font-serif uppercase tracking-widest text-sm transition-colors"
              >
                Book Now
              </a>
              <Link
                href="/contact"
                className="border border-gold text-gold hover:bg-gold hover:text-luxury-black px-8 py-4 font-serif uppercase tracking-widest text-sm transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </PublicLayout>
  );
}
