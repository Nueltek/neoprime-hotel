'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import PublicLayout from '@/components/layouts/PublicLayout';
import PageHero from '@/components/ui/PageHero';
import Button from '@/components/ui/Button';
import { fadeUpVariants, staggerContainerVariants, viewportSettings } from '@/lib/utils';
import { Clock, Phone, MapPin, Star } from 'lucide-react';
import { useBookingInfo, useContactInfo } from '@/components/providers/SiteSettingsProvider';

const menuHighlights = [
  {
    category: 'Starters',
    items: [
      { name: 'Hand-Dived Scottish Scallops', description: 'Cauliflower purée, crispy pancetta, brown butter', price: '£18' },
      { name: 'Beef Tartare', description: 'Quail egg, cornichons, capers, sourdough crisp', price: '£16' },
      { name: 'Burrata', description: 'Heritage tomatoes, basil oil, aged balsamic', price: '£14' }
    ]
  },
  {
    category: 'Mains',
    items: [
      { name: '35-Day Dry-Aged Ribeye', description: '300g, hand-cut chips, peppercorn sauce', price: '£45' },
      { name: 'Pan-Seared Sea Bass', description: 'Crushed new potatoes, samphire, lemon beurre blanc', price: '£32' },
      { name: 'Herb-Crusted Lamb Rack', description: 'Dauphinoise potatoes, minted pea purée, red wine jus', price: '£38' }
    ]
  },
  {
    category: 'Desserts',
    items: [
      { name: 'Valrhona Chocolate Fondant', description: 'Salted caramel ice cream, honeycomb', price: '£12' },
      { name: 'Seasonal Tarte Tatin', description: 'Vanilla crème fraîche', price: '£10' },
      { name: 'British Cheese Selection', description: 'Quince paste, crackers, celery', price: '£14' }
    ]
  }
];

const accolades = [
  '2 AA Rosettes',
  'Michelin Plate',
  'Good Food Guide Featured',
  'Sustainable Restaurant Association Member'
];

export default function GrillPage() {
  const booking = useBookingInfo();
  const contact = useContactInfo();
  const bookingPhone = booking.bookingPhone || contact.phone;
  const phoneLink = `tel:${bookingPhone.replace(/\s/g, '').replace(/[()]/g, '')}`;
  
  return (
    <PublicLayout>
    <main className="min-h-screen bg-luxury-black">
      <PageHero
        title="The Grill"
        subtitle="Neoprime Restaurant"
        image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
        height="medium"
      />

      {/* Introduction */}
      <section className="section-padding bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainerVariants}
          className="section-container"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUpVariants}>
              <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-sans">
                Fine Dining Newcastle
              </p>
              <h2 className="text-section text-luxury-black font-sans font-light uppercase tracking-wide mb-6">
                Where Every Meal is an Occasion
              </h2>
              <div className="w-16 h-px bg-gold mb-8" />
              <p className="text-text-muted font-serif text-lg leading-relaxed mb-6">
                The Neoprime Grill represents the pinnacle of modern British dining. Our award-winning 
                kitchen celebrates the finest seasonal ingredients, expertly prepared and elegantly presented.
              </p>
              <p className="text-text-muted font-serif text-lg leading-relaxed mb-8">
                Whether you're joining us for a leisurely lunch, an intimate dinner, or a special celebration, 
                expect exceptional cuisine in surroundings designed to make every visit memorable.
              </p>

              {/* Accolades */}
              <div className="flex flex-wrap gap-4 mb-8">
                {accolades.map((accolade) => (
                  <span key={accolade} className="flex items-center gap-2 text-luxury-black font-serif text-sm">
                    <Star size={14} className="text-gold" />
                    {accolade}
                  </span>
                ))}
              </div>

              <Button variant="filled" href="/book-table">
                Reserve Your Table
              </Button>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80"
                  alt="The Grill Interior"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden mt-8">
                <Image
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80"
                  alt="Signature Dish"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Menu Highlights */}
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
              Seasonal Selection
            </p>
            <h2 className="text-section text-white font-sans font-light uppercase tracking-wide">
              Menu Highlights
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {menuHighlights.map((section) => (
              <motion.div key={section.category} variants={fadeUpVariants}>
                <h3 className="text-gold text-xl font-sans uppercase tracking-wide mb-8 text-center">
                  {section.category}
                </h3>
                <div className="space-y-8">
                  {section.items.map((item) => (
                    <div key={item.name} className="border-b border-white/10 pb-6">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-sans text-lg">{item.name}</h4>
                        <span className="text-gold font-sans">{item.price}</span>
                      </div>
                      <p className="text-text-secondary font-serif text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUpVariants} className="text-center mt-16">
            <Button variant="outline" href="/menus">
              View Full Menus
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Chef's Philosophy */}
      <section className="section-padding bg-luxury-dark">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainerVariants}
          className="section-container"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUpVariants} className="relative aspect-square overflow-hidden lg:order-2">
              <Image
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80"
                alt="Executive Chef"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div variants={fadeUpVariants} className="lg:order-1">
              <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-sans">
                From Our Kitchen
              </p>
              <h2 className="text-section text-white font-sans font-light uppercase tracking-wide mb-6">
                Chef's Philosophy
              </h2>
              <div className="w-16 h-px bg-gold mb-8" />
              <blockquote className="text-2xl text-white font-serif italic leading-relaxed mb-6">
                "Great cooking starts with exceptional ingredients. We work with local farmers, 
                fishermen, and artisan producers to bring the very best to your plate."
              </blockquote>
              <p className="text-text-secondary font-serif leading-relaxed mb-4">
                Our commitment to quality means seasonal menus that evolve with nature's harvest. 
                From Northumbrian beef to North Sea seafood, every dish tells the story of our region.
              </p>
              <cite className="text-gold font-sans uppercase tracking-wide not-italic">
                — Executive Chef, The Neoprime Grill
              </cite>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Hours & Info */}
      <section className="section-padding bg-luxury-black">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainerVariants}
          className="section-container"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div variants={fadeUpVariants} className="border border-white/10 p-8">
              <Clock className="text-gold mx-auto mb-4" size={32} />
              <h3 className="text-gold font-sans uppercase tracking-wide mb-4">Opening Hours</h3>
              <p className="text-white font-serif mb-2">Breakfast: 7:00 AM - 10:30 AM</p>
              <p className="text-white font-serif mb-2">Lunch: 12:00 PM - 2:30 PM</p>
              <p className="text-white font-serif">Dinner: 6:00 PM - 10:00 PM</p>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="border border-white/10 p-8">
              <Phone className="text-gold mx-auto mb-4" size={32} />
              <h3 className="text-gold font-sans uppercase tracking-wide mb-4">Reservations</h3>
              <p className="text-white font-serif mb-2">
                <a href={phoneLink} className="hover:text-gold transition-colors">
                  {bookingPhone}
                </a>
              </p>
              <p className="text-text-secondary font-serif text-sm">
                Reservations recommended, especially for dinner
              </p>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="border border-white/10 p-8">
              <MapPin className="text-gold mx-auto mb-4" size={32} />
              <h3 className="text-gold font-sans uppercase tracking-wide mb-4">Dress Code</h3>
              <p className="text-white font-serif">Smart Casual</p>
              <p className="text-text-secondary font-serif text-sm mt-2">
                We kindly ask guests to avoid athletic wear
              </p>
            </motion.div>
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
            Join Us at The Grill
          </h2>
          <p className="text-text-muted font-serif text-lg max-w-2xl mx-auto mb-8">
            Whether for a business lunch, romantic dinner, or special celebration, 
            we look forward to welcoming you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="filled" href="/book-table">
              Reserve a Table
            </Button>
            <Button variant="outline" href="/private-dining">
              Private Dining
            </Button>
          </div>
        </motion.div>
      </section>
    </main>
    </PublicLayout>
  );
}
