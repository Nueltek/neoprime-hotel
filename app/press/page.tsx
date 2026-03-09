'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import PublicLayout from '@/components/layouts/PublicLayout';
import PageHero from '@/components/ui/PageHero';
import Button from '@/components/ui/Button';
import { fadeUpVariants, staggerContainerVariants, viewportSettings } from '@/lib/utils';
import { Download, Mail, Phone } from 'lucide-react';

const pressReleases = [
  {
    date: 'January 2025',
    title: 'Neoprime Hotels Announces Sustainability Milestone',
    excerpt: 'Neoprime Hotels has achieved its target of 100% renewable electricity across all UK properties, marking a significant step in our commitment to sustainable hospitality.'
  },
  {
    date: 'November 2024',
    title: 'The Neoprime Grill Awarded 2 AA Rosettes',
    excerpt: 'Our Newcastle restaurant has been recognised for culinary excellence, receiving the prestigious 2 AA Rosettes award for the second consecutive year.'
  },
  {
    date: 'September 2024',
    title: 'Neoprime Newcastle Celebrates 5th Anniversary',
    excerpt: 'We mark five years of bold design and warm hospitality in Newcastle, with over 100,000 guests welcomed since opening our doors in 2020.'
  },
  {
    date: 'July 2024',
    title: 'New Wellness Programme Launch',
    excerpt: 'Introducing our comprehensive wellness programme featuring partnerships with local wellness experts and new spa treatments.'
  }
];

const mediaFeatures = [
  { publication: 'The Telegraph', title: 'Best Hotels in Newcastle', year: '2024' },
  { publication: 'Condé Nast Traveller', title: 'UK Hotels to Watch', year: '2024' },
  { publication: 'The Guardian', title: 'Sustainable Luxury Hotels', year: '2024' },
  { publication: 'GQ', title: 'Best Business Hotels', year: '2023' },
  { publication: 'Tatler', title: 'Great British Hotels', year: '2023' }
];

export default function PressPage() {
  return (
    <PublicLayout>
    <main className="min-h-screen bg-luxury-black">
      <PageHero
        title="Press"
        subtitle="Media Centre"
        image="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&q=80"
        height="short"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div variants={fadeUpVariants}>
              <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-sans">
                Media Centre
              </p>
              <h2 className="text-section text-luxury-black font-sans font-light uppercase tracking-wide mb-6">
                Press & Media
              </h2>
              <div className="w-16 h-px bg-gold mb-8" />
              <p className="text-text-muted font-serif text-lg leading-relaxed mb-6">
                Welcome to the Neoprime Hotels media centre. Here you'll find our latest news, 
                press releases, and resources for journalists and media professionals.
              </p>
              <p className="text-text-muted font-serif text-lg leading-relaxed mb-8">
                For press enquiries, interview requests, or high-resolution images, 
                please contact our communications team.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-gold" size={18} />
                  <a href="mailto:press@neoprimehotels.com" className="text-luxury-black font-serif hover:text-gold transition-colors">
                    press@neoprimehotels.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-gold" size={18} />
                  <a href="tel:+441912345682" className="text-luxury-black font-serif hover:text-gold transition-colors">
                    +44 (0) 191 234 5682
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80"
                alt="Neoprime Hotel"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Press Releases */}
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
              Latest News
            </p>
            <h2 className="text-section text-white font-sans font-light uppercase tracking-wide">
              Press Releases
            </h2>
          </motion.div>

          <div className="space-y-6">
            {pressReleases.map((release) => (
              <motion.div
                key={release.title}
                variants={fadeUpVariants}
                className="border border-white/10 p-8 hover:border-gold/50 transition-colors duration-300"
              >
                <span className="text-gold text-xs uppercase tracking-widest font-sans">
                  {release.date}
                </span>
                <h3 className="text-white font-sans text-xl uppercase tracking-wide mt-2 mb-4">
                  {release.title}
                </h3>
                <p className="text-text-secondary font-serif mb-4">
                  {release.excerpt}
                </p>
                <button className="text-gold text-sm uppercase tracking-widest font-sans hover:text-gold-light transition-colors">
                  Read More →
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Media Features */}
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
              Recognition
            </p>
            <h2 className="text-section text-white font-sans font-light uppercase tracking-wide">
              As Featured In
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaFeatures.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUpVariants}
                className="bg-luxury-black p-6 text-center"
              >
                <span className="text-gold font-sans uppercase tracking-wide text-lg">
                  {feature.publication}
                </span>
                <p className="text-white font-serif mt-2">{feature.title}</p>
                <span className="text-text-muted text-sm font-serif">{feature.year}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Press Kit */}
      <section className="section-padding bg-luxury-black">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUpVariants}
          className="section-container text-center"
        >
          <h2 className="text-2xl text-white font-sans uppercase tracking-wide mb-6">
            Press Kit
          </h2>
          <p className="text-text-secondary font-serif mb-8 max-w-2xl mx-auto">
            Download our press kit for brand assets, fact sheets, and high-resolution images.
          </p>
          <Button variant="outline" href="#">
            <Download className="mr-2" size={16} />
            Download Press Kit
          </Button>
        </motion.div>
      </section>
    </main>
    </PublicLayout>
  );
}
