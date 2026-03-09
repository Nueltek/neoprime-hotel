'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import PublicLayout from '@/components/layouts/PublicLayout';
import PageHero from '@/components/ui/PageHero';
import { fadeUpVariants, staggerContainerVariants, viewportSettings } from '@/lib/utils';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryCategory {
  _id: string;
  name: string;
  slug: string;
}

interface GalleryImage {
  _id: string;
  title: string;
  alt: string;
  image: { url: string; publicId: string };
  category: GalleryCategory | string;
}

// Fallback static data
const staticCategories = ['All', 'Rooms', 'Dining', 'Events', 'Exterior', 'Amenities'];

const staticImages = [
  { _id: '1', image: { url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80', publicId: '' }, category: 'Rooms', alt: 'Luxury Room', title: 'Luxury Room' },
  { _id: '2', image: { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', publicId: '' }, category: 'Dining', alt: 'Restaurant', title: 'Restaurant' },
  { _id: '3', image: { url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80', publicId: '' }, category: 'Exterior', alt: 'Hotel Exterior', title: 'Hotel Exterior' },
  { _id: '4', image: { url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80', publicId: '' }, category: 'Rooms', alt: 'Classic Room', title: 'Classic Room' },
  { _id: '5', image: { url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80', publicId: '' }, category: 'Dining', alt: 'Fine Dining', title: 'Fine Dining' },
  { _id: '6', image: { url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&q=80', publicId: '' }, category: 'Events', alt: 'Conference Room', title: 'Conference Room' },
  { _id: '7', image: { url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80', publicId: '' }, category: 'Rooms', alt: 'Deluxe Suite', title: 'Deluxe Suite' },
  { _id: '8', image: { url: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1200&q=80', publicId: '' }, category: 'Dining', alt: 'The Bar', title: 'The Bar' },
  { _id: '9', image: { url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80', publicId: '' }, category: 'Rooms', alt: 'Suite Living Area', title: 'Suite Living Area' },
  { _id: '10', image: { url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80', publicId: '' }, category: 'Events', alt: 'Ballroom', title: 'Ballroom' },
  { _id: '11', image: { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', publicId: '' }, category: 'Dining', alt: 'Private Dining', title: 'Private Dining' },
  { _id: '12', image: { url: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80', publicId: '' }, category: 'Amenities', alt: 'Spa', title: 'Spa' },
];

export default function GalleryPage() {
  const [categories, setCategories] = useState<string[]>(staticCategories);
  const [images, setImages] = useState<GalleryImage[]>(staticImages);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        // Fetch categories
        const catRes = await fetch('/api/gallery/categories');
        const catData = await catRes.json();
        if (catData.categories && catData.categories.length > 0) {
          const catNames = ['All', ...catData.categories.map((c: GalleryCategory) => c.name)];
          setCategories(catNames);
        }

        // Fetch images
        const imgRes = await fetch('/api/gallery');
        const imgData = await imgRes.json();
        if (imgData.images && imgData.images.length > 0) {
          setImages(imgData.images);
        }
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const getCategoryName = (img: GalleryImage): string => {
    if (typeof img.category === 'string') return img.category;
    return img.category?.name || 'Other';
  };

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => getCategoryName(img) === activeCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => prev === 0 ? filteredImages.length - 1 : prev - 1);
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => prev === filteredImages.length - 1 ? 0 : prev + 1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, filteredImages.length]);

  return (
    <PublicLayout>
      <main className="min-h-screen bg-luxury-black">
        <PageHero
          title="Gallery"
          subtitle="Visual Stories"
          image="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1920&q=80"
          height="medium"
        />

        {/* Filter */}
        <section className="py-8 bg-luxury-dark sticky top-0 z-30">
          <div className="section-container">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 text-sm font-sans uppercase tracking-widest transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-gold text-luxury-black'
                      : 'border border-white/30 text-white hover:border-gold hover:text-gold'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="section-padding bg-luxury-black">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainerVariants}
            className="section-container"
          >
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full" />
              </div>
            ) : filteredImages.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-text-muted font-serif">No images found in this category.</p>
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                  {filteredImages.map((image, index) => (
                    <motion.div
                      key={image._id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="relative aspect-square overflow-hidden cursor-pointer group"
                      onClick={() => openLightbox(index)}
                    >
                      <Image
                        src={image.image?.url || ''}
                        alt={image.alt || image.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-luxury-black/0 group-hover:bg-luxury-black/40 transition-colors duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white font-sans text-sm uppercase tracking-widest text-center px-4">
                          {image.title || image.alt}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </motion.div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxOpen && filteredImages[currentImageIndex] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-luxury-black/95 flex items-center justify-center"
              onClick={closeLightbox}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 text-white hover:text-gold transition-colors z-10"
              >
                <X size={32} />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                className="absolute left-6 text-white hover:text-gold transition-colors z-10"
              >
                <ChevronLeft size={48} />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-6 text-white hover:text-gold transition-colors z-10"
              >
                <ChevronRight size={48} />
              </button>

              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-[90vw] h-[80vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={filteredImages[currentImageIndex].image?.url || ''}
                  alt={filteredImages[currentImageIndex].alt || filteredImages[currentImageIndex].title}
                  fill
                  className="object-contain"
                />
              </motion.div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
                <p className="text-white font-sans uppercase tracking-widest">
                  {filteredImages[currentImageIndex].title || filteredImages[currentImageIndex].alt}
                </p>
                <p className="text-text-muted text-sm mt-1">
                  {currentImageIndex + 1} / {filteredImages.length}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </PublicLayout>
  );
}
