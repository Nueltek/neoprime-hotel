'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import PublicLayout from '@/components/layouts/PublicLayout';
import PageHero from '@/components/ui/PageHero';
import Button from '@/components/ui/Button';
import { fadeUpVariants, staggerContainerVariants, viewportSettings } from '@/lib/utils';
import { MapPin, Phone, Mail, Clock, Car, Train, Plane } from 'lucide-react';
import { useContactInfo, useBookingInfo } from '@/components/providers/SiteSettingsProvider';

const nearbyAttractions = [
  {
    name: 'Newcastle Quayside',
    distance: '5 min walk',
    description: 'Iconic waterfront with restaurants, bars, and the famous Tyne Bridge.'
  },
  {
    name: 'Grey Street',
    distance: '7 min walk',
    description: 'One of Britain\'s finest streets, lined with elegant Georgian architecture.'
  },
  {
    name: 'Theatre Royal',
    distance: '8 min walk',
    description: 'Grade I listed theatre hosting world-class performances since 1837.'
  },
  {
    name: 'St. James\' Park',
    distance: '12 min walk',
    description: 'Home of Newcastle United FC, offering stadium tours and match experiences.'
  },
  {
    name: 'The BALTIC',
    distance: '10 min walk',
    description: 'International centre for contemporary art on the Gateshead Quays.'
  },
  {
    name: 'Sage Gateshead',
    distance: '12 min walk',
    description: 'Iconic music venue and conference centre designed by Norman Foster.'
  }
];

const transportOptions = [
  {
    icon: Plane,
    title: 'By Air',
    details: [
      'Newcastle International Airport: 20 minutes by car',
      'Airport transfers available upon request',
      'Direct flights from major UK and European cities'
    ]
  },
  {
    icon: Train,
    title: 'By Train',
    details: [
      'Newcastle Central Station: 10 minutes walk',
      'Direct services from London Kings Cross (2h 45m)',
      'Connections from Edinburgh, Manchester, and beyond'
    ]
  },
  {
    icon: Car,
    title: 'By Car',
    details: [
      'A1(M) motorway: Exit at Newcastle city centre',
      'Valet parking available (£35/day)',
      'Self-parking at nearby NCP (£25/day)'
    ]
  }
];

export default function LocationPage() {
  const contact = useContactInfo();
  const booking = useBookingInfo();
  
  const phoneLink = contact.phone.replace(/\s/g, '').replace(/[()]/g, '');

  return (
    <PublicLayout>
      <main className="min-h-screen bg-luxury-black">
        <PageHero
          title="Location"
          subtitle="Find Us"
          image="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&q=80"
          height="medium"
        />

        {/* Address & Contact */}
        <section className="section-padding bg-white">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainerVariants}
            className="section-container"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <motion.div variants={fadeUpVariants}>
                <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-sans">
                  Neoprime Hotel
                </p>
                <h2 className="text-section text-luxury-black font-sans font-light uppercase tracking-wide mb-6">
                  How to Find Us
                </h2>
                <div className="w-16 h-px bg-gold mb-8" />

                {/* Address */}
                <div className="flex gap-4 mb-6">
                  <MapPin className="text-gold flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="text-luxury-black font-sans uppercase tracking-wide mb-2">Address</h3>
                    <p className="text-text-muted font-serif whitespace-pre-line">
                      {contact.address || '1 Neoprime Square\nNewcastle upon Tyne\nNE1 4AD\nUnited Kingdom'}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4 mb-6">
                  <Phone className="text-gold flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="text-luxury-black font-sans uppercase tracking-wide mb-2">Telephone</h3>
                    <p className="text-text-muted font-serif">
                      <a href={`tel:${phoneLink}`} className="hover:text-gold transition-colors">
                        {contact.phone}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 mb-6">
                  <Mail className="text-gold flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="text-luxury-black font-sans uppercase tracking-wide mb-2">Email</h3>
                    <p className="text-text-muted font-serif">
                      <a href={`mailto:${contact.email}`} className="hover:text-gold transition-colors">
                        {contact.email}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Reception Hours */}
                <div className="flex gap-4">
                  <Clock className="text-gold flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="text-luxury-black font-sans uppercase tracking-wide mb-2">Reception</h3>
                    <p className="text-text-muted font-serif">
                      24 hours, 7 days a week
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Map Placeholder */}
              <motion.div variants={fadeUpVariants} className="relative aspect-square lg:aspect-auto">
                <div className="absolute inset-0 bg-luxury-dark flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin className="text-gold mx-auto mb-4" size={48} />
                    <p className="text-white font-sans uppercase tracking-wide mb-2">Interactive Map</p>
                    <p className="text-text-muted font-serif text-sm mb-6">
                      Embed your Google Maps here
                    </p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 border border-gold text-gold font-sans text-sm uppercase tracking-wider hover:bg-gold hover:text-luxury-black transition-colors"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Getting Here */}
        <section className="section-padding bg-luxury-black">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainerVariants}
            className="section-container"
          >
            <motion.div variants={fadeUpVariants} className="text-center mb-12">
              <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-sans">
                Travel Information
              </p>
              <h2 className="text-section text-white font-sans font-light uppercase tracking-wide">
                Getting Here
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {transportOptions.map((option) => (
                <motion.div
                  key={option.title}
                  variants={fadeUpVariants}
                  className="bg-luxury-dark border border-white/10 p-8"
                >
                  <option.icon className="text-gold mb-6" size={32} />
                  <h3 className="text-white font-sans uppercase tracking-wide mb-4">
                    {option.title}
                  </h3>
                  <ul className="space-y-3">
                    {option.details.map((detail, index) => (
                      <li key={index} className="text-text-muted font-serif text-sm">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Nearby Attractions */}
        <section className="section-padding bg-white">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainerVariants}
            className="section-container"
          >
            <motion.div variants={fadeUpVariants} className="text-center mb-12">
              <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-sans">
                Explore Newcastle
              </p>
              <h2 className="text-section text-luxury-black font-sans font-light uppercase tracking-wide">
                Nearby Attractions
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {nearbyAttractions.map((attraction) => (
                <motion.div
                  key={attraction.name}
                  variants={fadeUpVariants}
                  className="p-6 border border-luxury-black/10 hover:border-gold transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-luxury-black font-sans uppercase tracking-wide">
                      {attraction.name}
                    </h3>
                    <span className="text-gold text-xs font-sans whitespace-nowrap ml-4">
                      {attraction.distance}
                    </span>
                  </div>
                  <p className="text-text-muted font-serif text-sm">
                    {attraction.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-luxury-navy">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUpVariants}
            className="section-container text-center"
          >
            <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-sans">
              Need Assistance?
            </p>
            <h2 className="text-section text-white font-sans font-light uppercase tracking-wide mb-6">
              We're Here to Help
            </h2>
            <p className="text-text-muted font-serif mb-8 max-w-2xl mx-auto">
              Our concierge team is available around the clock to assist with transportation, 
              directions, and local recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="primary">
                Contact Us
              </Button>
              <a
                href={`tel:${phoneLink}`}
                className="px-8 py-4 border border-gold text-gold font-sans text-sm uppercase tracking-widest hover:bg-gold hover:text-luxury-black transition-colors"
              >
                Call {contact.phone}
              </a>
            </div>
          </motion.div>
        </section>
      </main>
    </PublicLayout>
  );
}
