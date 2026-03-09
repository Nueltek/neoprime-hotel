'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import PageHero from '@/components/ui/PageHero';
import Button from '@/components/ui/Button';
import { fadeUpVariants, staggerContainerVariants, viewportSettings } from '@/lib/utils';
import { Leaf, Droplets, Recycle, Sun, Heart, Users } from 'lucide-react';

const initiatives = [
  {
    icon: Leaf,
    title: 'Carbon Reduction',
    description: 'We\'re committed to achieving net-zero carbon emissions by 2030. Our properties use renewable energy where possible, and we\'ve reduced our carbon footprint by 40% since 2019.'
  },
  {
    icon: Droplets,
    title: 'Water Conservation',
    description: 'Through smart water management systems, low-flow fixtures, and linen reuse programmes, we\'ve reduced water consumption by 35% across all properties.'
  },
  {
    icon: Recycle,
    title: 'Waste Reduction',
    description: 'We\'ve eliminated single-use plastics, implemented comprehensive recycling, and divert 85% of our waste from landfill through recycling and composting.'
  },
  {
    icon: Sun,
    title: 'Renewable Energy',
    description: '100% of our electricity comes from certified renewable sources. We\'re also investing in on-site solar installations at select properties.'
  },
  {
    icon: Heart,
    title: 'Local Sourcing',
    description: 'Over 70% of our food and beverage supplies come from local producers within 50 miles, supporting local economies and reducing transport emissions.'
  },
  {
    icon: Users,
    title: 'Community Impact',
    description: 'We actively support local charities and community initiatives, contributing 2% of profits to local causes and providing volunteer days for our team members.'
  }
];

const certifications = [
  'Green Tourism Gold Award',
  'Carbon Trust Standard',
  'EarthCheck Certified',
  'Sustainable Restaurant Association Member'
];

export default function SustainabilityPage() {
  return (
    <main className="min-h-screen bg-luxury-black">
      <PageHero
        title="Sustainability"
        subtitle="Our Commitment"
        image="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80"
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
                A Greener Future
              </p>
              <h2 className="text-section text-luxury-black font-sans font-light uppercase tracking-wide mb-6">
                Luxury with Responsibility
              </h2>
              <div className="w-16 h-px bg-gold mb-8" />
              <p className="text-text-muted font-serif text-lg leading-relaxed mb-6">
                At Neoprime, we believe that luxury and sustainability must go hand in hand. 
                Our commitment to environmental responsibility extends across every aspect of our operations, 
                from the energy that powers our hotels to the food on your plate.
              </p>
              <p className="text-text-muted font-serif text-lg leading-relaxed mb-6">
                We're on a journey to minimize our environmental impact while maintaining the exceptional 
                standards our guests expect. This isn't about compromise—it's about innovation, 
                responsibility, and creating a better future for generations to come.
              </p>
              <p className="text-text-muted font-serif text-lg leading-relaxed">
                Every stay at Neoprime is a step towards a more sustainable hospitality industry.
              </p>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80"
                alt="Sustainability"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Initiatives */}
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
              Taking Action
            </p>
            <h2 className="text-section text-white font-sans font-light uppercase tracking-wide">
              Our Initiatives
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initiatives.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUpVariants}
                className="border border-white/10 p-8 hover:border-gold/50 transition-colors duration-300"
              >
                <div className="w-12 h-12 border border-gold rounded-full flex items-center justify-center mb-6">
                  <item.icon className="text-gold" size={24} />
                </div>
                <h3 className="text-gold text-xl font-sans uppercase tracking-wide mb-4">
                  {item.title}
                </h3>
                <p className="text-text-secondary font-serif leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-luxury-dark">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainerVariants}
          className="section-container"
        >
          <motion.div variants={fadeUpVariants} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '40%', label: 'Carbon Reduction Since 2019' },
              { value: '85%', label: 'Waste Diverted from Landfill' },
              { value: '100%', label: 'Renewable Electricity' },
              { value: '70%', label: 'Locally Sourced Ingredients' }
            ].map((stat) => (
              <div key={stat.label}>
                <span className="text-gold text-5xl font-sans font-light">{stat.value}</span>
                <p className="text-text-secondary font-serif text-sm mt-2">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-luxury-black">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainerVariants}
          className="section-container text-center"
        >
          <motion.div variants={fadeUpVariants}>
            <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-sans">
              Recognition
            </p>
            <h2 className="text-section text-white font-sans font-light uppercase tracking-wide mb-12">
              Certifications & Awards
            </h2>
          </motion.div>

          <motion.div variants={fadeUpVariants} className="flex flex-wrap justify-center gap-6">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="px-6 py-3 border border-gold/30 text-white font-serif"
              >
                {cert}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Get Involved */}
      <section className="section-padding bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUpVariants}
          className="section-container text-center"
        >
          <h2 className="text-section text-luxury-black font-sans font-light uppercase tracking-wide mb-6">
            Join Us on This Journey
          </h2>
          <p className="text-text-muted font-serif text-lg max-w-3xl mx-auto mb-8">
            As a guest, you play an important role in our sustainability efforts. From participating in our 
            linen reuse programme to choosing locally sourced menu options, every choice makes a difference. 
            Together, we can create meaningful change.
          </p>
          <Button variant="filled" href="/contact">
            Learn More
          </Button>
        </motion.div>
      </section>
    </main>
  );
}
