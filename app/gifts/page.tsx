'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import PageHero from '@/components/ui/PageHero';
import Button from '@/components/ui/Button';
import { fadeUpVariants, staggerContainerVariants, viewportSettings } from '@/lib/utils';
import { Gift, Heart, Star, Clock } from 'lucide-react';

const giftCards = [
  {
    title: 'Monetary Gift Card',
    description: 'Give the gift of choice with our flexible monetary gift cards. Recipients can use their credit towards accommodation, dining, or spa experiences.',
    values: ['£50', '£100', '£250', '£500', 'Custom amount'],
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80'
  },
  {
    title: 'Overnight Stay',
    description: 'Treat someone special to a luxurious overnight escape including breakfast and all the amenities of Neoprime.',
    values: ['Cosy Room', 'Classic Room', 'Deluxe Room', 'Suite'],
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80'
  },
  {
    title: 'Dining Experience',
    description: 'An unforgettable culinary journey at The Neoprime Grill, perfect for food lovers and special celebrations.',
    values: ['Lunch for Two', 'Dinner for Two', 'Tasting Menu', 'Chef\'s Table'],
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80'
  },
  {
    title: 'Afternoon Tea',
    description: 'A quintessentially British experience featuring delicate sandwiches, freshly baked scones, and exquisite pastries.',
    values: ['Traditional Tea', 'Champagne Tea'],
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80'
  }
];

const occasions = [
  { icon: Heart, label: 'Anniversaries' },
  { icon: Star, label: 'Birthdays' },
  { icon: Gift, label: 'Thank You' },
  { icon: Clock, label: 'Just Because' }
];

export default function GiftsPage() {
  return (
    <main className="min-h-screen bg-luxury-black">
      <PageHero
        title="Gift Cards"
        subtitle="Give the Gift of Luxury"
        image="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1920&q=80"
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
            Unforgettable Experiences
          </motion.p>
          <motion.h2 variants={fadeUpVariants} className="text-section text-luxury-black font-sans font-light uppercase tracking-wide mb-6">
            The Perfect Gift
          </motion.h2>
          <motion.p variants={fadeUpVariants} className="text-text-muted font-serif text-lg max-w-3xl mx-auto leading-relaxed mb-12">
            Whether celebrating a special occasion or simply showing appreciation, 
            a Neoprime gift card offers the promise of exceptional experiences. 
            From luxurious overnight stays to exquisite dining, give the gift of memories.
          </motion.p>

          {/* Occasions */}
          <motion.div variants={fadeUpVariants} className="flex flex-wrap justify-center gap-8">
            {occasions.map((occasion) => (
              <div key={occasion.label} className="flex items-center gap-3">
                <occasion.icon size={20} className="text-gold" />
                <span className="text-luxury-black font-serif">{occasion.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Gift Cards */}
      <section className="section-padding bg-luxury-black">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainerVariants}
          className="section-container"
        >
          <motion.div variants={fadeUpVariants} className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-sans">
              Our Selection
            </p>
            <h2 className="text-section text-white font-sans font-light uppercase tracking-wide">
              Choose Your Gift
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {giftCards.map((card) => (
              <motion.div
                key={card.title}
                variants={fadeUpVariants}
                className="bg-luxury-dark overflow-hidden"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-gold text-xl font-sans uppercase tracking-wide mb-3">
                    {card.title}
                  </h3>
                  <p className="text-text-secondary font-serif leading-relaxed mb-6">
                    {card.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {card.values.map((value) => (
                      <span
                        key={value}
                        className="px-3 py-1 border border-gold/30 text-white text-sm font-sans"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                  <Button variant="outline" href="/buy-gift">
                    Purchase
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
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
              Simple Process
            </p>
            <h2 className="text-section text-white font-sans font-light uppercase tracking-wide">
              How It Works
            </h2>
          </motion.div>

          <motion.div variants={fadeUpVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Choose', description: 'Select your preferred gift card type and value.' },
              { step: '02', title: 'Personalise', description: 'Add a personal message to make it extra special.' },
              { step: '03', title: 'Deliver', description: 'Send instantly via email or choose elegant physical delivery.' }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <span className="text-gold text-5xl font-sans font-light">{item.step}</span>
                <h3 className="text-white font-sans uppercase tracking-wide text-xl mt-4 mb-2">
                  {item.title}
                </h3>
                <p className="text-text-secondary font-serif">
                  {item.description}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Terms */}
      <section className="section-padding bg-luxury-black">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUpVariants}
          className="section-container"
        >
          <h3 className="text-white font-sans uppercase tracking-wide mb-6">Gift Card Terms</h3>
          <div className="text-text-secondary font-serif text-sm space-y-2">
            <p>• Gift cards are valid for 24 months from the date of purchase.</p>
            <p>• Gift cards are non-refundable and cannot be exchanged for cash.</p>
            <p>• Any unused balance can be used for future visits within the validity period.</p>
            <p>• Advance booking is required for overnight stays and dining experiences.</p>
            <p>• Gift cards can be used at any Neoprime Hotels location.</p>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUpVariants}
          className="section-container text-center"
        >
          <h2 className="text-section text-luxury-black font-sans font-light uppercase tracking-wide mb-6">
            Need Assistance?
          </h2>
          <p className="text-text-muted font-serif text-lg max-w-2xl mx-auto mb-8">
            Our team is happy to help you select the perfect gift or answer any questions.
          </p>
          <Button variant="filled" href="/contact">
            Contact Us
          </Button>
        </motion.div>
      </section>
    </main>
  );
}
