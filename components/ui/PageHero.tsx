'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { heroStaggerVariants, heroChildVariants } from '@/lib/utils';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image: string;
  height?: 'full' | 'medium' | 'short';
}

export default function PageHero({ 
  title, 
  subtitle, 
  image,
  height = 'medium' 
}: PageHeroProps) {
  const heightClasses = {
    full: 'min-h-[70vh]',
    medium: 'min-h-[50vh]',
    short: 'min-h-[40vh]'
  };

  return (
    <section className={`relative ${heightClasses[height]} flex items-center justify-center overflow-hidden`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
          quality={85}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/60 via-luxury-black/40 to-luxury-black/70" />
      </div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={heroStaggerVariants}
        className="relative z-10 text-center px-6"
      >
        {subtitle && (
          <motion.p
            variants={heroChildVariants}
            className="text-gold text-xs tracking-[0.3em] uppercase mb-4 font-sans"
          >
            {subtitle}
          </motion.p>
        )}
        
        <motion.h1
          variants={heroChildVariants}
          className="text-4xl md:text-5xl lg:text-6xl text-white font-sans font-light uppercase tracking-[0.1em]"
        >
          {title}
        </motion.h1>
        
        <motion.div
          variants={heroChildVariants}
          className="flex items-center justify-center gap-4 mt-6"
        >
          <div className="w-12 h-px bg-gold" />
          <div className="w-2 h-2 rotate-45 border border-gold" />
          <div className="w-12 h-px bg-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
