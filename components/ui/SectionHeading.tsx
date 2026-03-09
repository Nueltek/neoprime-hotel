'use client';

import { motion } from 'framer-motion';
import { cn, fadeUpVariants, viewportSettings } from '@/lib/utils';
import type { SectionHeadingProps } from '@/types';

export default function SectionHeading({ 
  subtitle, 
  title, 
  light = false, 
  centered = false,
  className = '' 
}: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      variants={fadeUpVariants}
      className={cn(
        centered && 'text-center',
        className
      )}
    >
      {subtitle && (
        <p className="text-xs tracking-[0.2em] uppercase mb-4 text-gold font-sans">
          {subtitle}
        </p>
      )}
      <h2 
        className={cn(
          'text-section tracking-[0.05em] uppercase font-sans font-light',
          light ? 'text-white' : 'text-luxury-black'
        )}
      >
        {title}
      </h2>
    </motion.div>
  );
}
