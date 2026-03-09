'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { fadeUpVariants, slideInLeftVariants, slideInRightVariants, viewportSettings, images } from '@/lib/utils';

interface Room {
  _id: string;
  title: string;
  slug: string;
  subtitle?: string;
  description: string;
  price: number;
  images: { url: string; type: string }[];
}

export default function RoomSection() {
  const [featuredRoom, setFeaturedRoom] = useState<Room | null>(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch('/api/rooms?featured=true&limit=1');
        const data = await res.json();
        if (data.rooms && data.rooms.length > 0) {
          setFeaturedRoom(data.rooms[0]);
        }
      } catch (error) {
        console.error('Error fetching room:', error);
      }
    };

    fetchRoom();
  }, []);

  const roomImage = featuredRoom?.images?.[0]?.url || images.roomLuxury;

  return (
    <section id="rooms" className="bg-white section-padding">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image - Left Side */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={slideInLeftVariants}
            className="relative aspect-[4/3] overflow-hidden img-zoom"
          >
            <Image
              src={roomImage}
              alt={featuredRoom?.title || 'Luxury Room'}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Content - Right Side */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={slideInRightVariants}
          >
            <p className="text-xs tracking-[0.2em] uppercase mb-4 text-gold font-sans">
              Our Accommodation
            </p>
            <h2 className="text-section text-luxury-black font-sans font-light uppercase tracking-[0.05em] mb-6">
              Rooms and Suites
            </h2>
            <div className="w-16 h-px bg-gold mb-6" />
            <p className="text-body text-text-muted font-serif mb-8 leading-relaxed">
              Each of our beautifully designed rooms and suites offers a sanctuary of comfort 
              and style. From intimate rooms to expansive suites, every space has been 
              thoughtfully crafted with luxury finishes, sumptuous bedding, and state-of-the-art 
              amenities to ensure an unforgettable stay.
            </p>
            <Button variant="outline" href="/rooms">
              Explore Rooms
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
