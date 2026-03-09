'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { staggerContainerVariants, fadeUpVariants, viewportSettings, images } from '@/lib/utils';

const galleryImages = [
  { src: images.gallery1, alt: 'Neoprime Hotel Interior' },
  { src: images.gallery2, alt: 'Luxury Suite View' },
  { src: images.gallery3, alt: 'Hotel Lounge' },
  { src: images.gallery4, alt: 'Spa and Wellness' },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="bg-luxury-black section-padding">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        variants={staggerContainerVariants}
        className="section-container"
      >
        {/* Section Header */}
        <motion.div variants={fadeUpVariants} className="text-center mb-12">
          <p className="text-xs tracking-[0.2em] uppercase mb-4 text-gold font-sans">
            Experience
          </p>
          <h2 className="text-section text-white font-sans font-light uppercase tracking-[0.05em]">
            Discover Neoprime Newcastle
          </h2>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              variants={fadeUpVariants}
              className="relative overflow-hidden img-zoom"
            >
              <div className={`relative ${index < 2 ? 'aspect-[16/10]' : 'aspect-square'}`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
