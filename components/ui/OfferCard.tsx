'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { OfferCardProps } from '@/types';

export default function OfferCard({ image, title, description, link }: OfferCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden cursor-pointer bg-luxury-dark"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={link} className="block">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.div
            className="w-full h-full relative"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-white text-card-title font-sans uppercase tracking-[0.1em] mb-3">
            {title}
          </h3>
          <p className="text-text-secondary text-sm font-serif mb-4 leading-relaxed">
            {description}
          </p>
          
          {/* Link with arrow */}
          <motion.div 
            className="flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-sans"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span>View Offer</span>
            <ArrowRight size={14} />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
