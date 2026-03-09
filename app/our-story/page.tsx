'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import PageHero from '@/components/ui/PageHero';
import Button from '@/components/ui/Button';
import { fadeUpVariants, staggerContainerVariants, viewportSettings } from '@/lib/utils';

const timeline = [
  {
    year: '2008',
    title: 'The Beginning',
    description: 'Neoprime Hotels was founded with a clear vision: to create hotels that celebrate bold design and genuine hospitality. Our first property opened its doors in Manchester, setting the tone for what was to come.'
  },
  {
    year: '2012',
    title: 'Expanding Horizons',
    description: 'With the success of Manchester, we opened our Leeds property, bringing our signature style to Yorkshire. Each hotel unique, yet unmistakably Neoprime.'
  },
  {
    year: '2016',
    title: 'Scotland Calling',
    description: 'Glasgow welcomed Neoprime, followed shortly by Edinburgh. Our expansion into Scotland marked a new chapter, with properties that honour local heritage while embracing contemporary design.'
  },
  {
    year: '2020',
    title: 'Newcastle Arrives',
    description: 'Despite global challenges, we opened Neoprime Newcastle, our most ambitious project yet. A testament to resilience and our commitment to exceptional hospitality.'
  },
  {
    year: 'Today',
    title: 'Looking Forward',
    description: 'With five properties across the UK, we continue to evolve, innovate, and create memorable experiences for our guests while staying true to our founding principles.'
  }
];

const values = [
  {
    title: 'Bold Design',
    description: 'We believe spaces should inspire. Every Neoprime hotel is a carefully crafted environment that stimulates the senses and sparks joy.'
  },
  {
    title: 'Warm Hospitality',
    description: 'Luxury isn\'t just about thread counts and marble floors—it\'s about how you feel. We create genuine connections with every guest.'
  },
  {
    title: 'Local Character',
    description: 'Each property reflects its city\'s unique personality. We celebrate local culture, cuisine, and craftsmanship.'
  },
  {
    title: 'Sustainable Future',
    description: 'We\'re committed to reducing our environmental impact while maintaining the highest standards of service and comfort.'
  }
];

export default function OurStoryPage() {
  return (
    <main className="min-h-screen bg-luxury-black">
      <PageHero
        title="Our Story"
        subtitle="About Neoprime"
        image="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&q=80"
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
                Our Philosophy
              </p>
              <h2 className="text-section text-luxury-black font-sans font-light uppercase tracking-wide mb-6">
                Bold Design, Warm Hospitality
              </h2>
              <div className="w-16 h-px bg-gold mb-8" />
              <p className="text-text-muted font-serif text-lg leading-relaxed mb-6">
                Neoprime was born from a simple belief: that a hotel can be more than just a place to sleep. 
                It can be a destination in itself—a space that delights, inspires, and leaves a lasting impression.
              </p>
              <p className="text-text-muted font-serif text-lg leading-relaxed mb-6">
                Every Neoprime hotel is designed to be unmistakably unique yet instantly recognisable. 
                We celebrate bold architecture, thoughtful interiors, and the kind of warm, personal service 
                that turns first-time guests into lifelong friends.
              </p>
              <p className="text-text-muted font-serif text-lg leading-relaxed">
                From the moment you step through our doors, you'll sense something different. 
                That's the Neoprime effect—and it's what drives everything we do.
              </p>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="relative aspect-[4/5] overflow-hidden">
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

      {/* Timeline */}
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
              Our Journey
            </p>
            <h2 className="text-section text-white font-sans font-light uppercase tracking-wide">
              Through the Years
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gold/30" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                variants={fadeUpVariants}
                className={`relative flex flex-col md:flex-row gap-8 mb-16 last:mb-0 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Year */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-left md:pl-16' : 'md:text-right md:pr-16'}`}>
                  <span className="text-gold text-4xl font-sans font-light">{item.year}</span>
                </div>

                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-gold rounded-full transform -translate-x-1/2 mt-3" />

                {/* Content */}
                <div className={`md:w-1/2 pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <h3 className="text-white font-sans uppercase tracking-wide text-xl mb-3">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary font-serif leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Values */}
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
              What We Believe
            </p>
            <h2 className="text-section text-white font-sans font-light uppercase tracking-wide">
              Our Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeUpVariants}
                className="border border-white/10 p-8 hover:border-gold/50 transition-colors duration-300"
              >
                <h3 className="text-gold text-xl font-sans uppercase tracking-wide mb-4">
                  {value.title}
                </h3>
                <p className="text-text-secondary font-serif leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Quote */}
      <section className="section-padding bg-luxury-black">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUpVariants}
          className="section-container text-center"
        >
          <blockquote className="text-3xl md:text-4xl text-white font-serif italic leading-relaxed max-w-4xl mx-auto mb-8">
            "We don't just build hotels—we create spaces where memories are made, 
            connections are forged, and every stay becomes a story worth telling."
          </blockquote>
          <cite className="text-gold font-sans uppercase tracking-wide not-italic">
            — The Founders, Neoprime Hotels
          </cite>
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
            Experience Neoprime
          </h2>
          <p className="text-text-muted font-serif text-lg max-w-2xl mx-auto mb-8">
            Discover what makes Neoprime different. Book your stay and become part of our story.
          </p>
          <Button variant="filled" href="/book-room">
            Book Now
          </Button>
        </motion.div>
      </section>
    </main>
  );
}
