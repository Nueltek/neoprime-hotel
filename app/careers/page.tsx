'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import PageHero from '@/components/ui/PageHero';
import Button from '@/components/ui/Button';
import { fadeUpVariants, staggerContainerVariants, viewportSettings } from '@/lib/utils';
import { Briefcase, Heart, Users, TrendingUp, Coffee, Star } from 'lucide-react';

const benefits = [
  { icon: Heart, title: 'Health & Wellness', description: 'Comprehensive health insurance and wellness programmes' },
  { icon: TrendingUp, title: 'Career Growth', description: 'Training programmes and promotion opportunities' },
  { icon: Coffee, title: 'Staff Meals', description: 'Complimentary meals during shifts' },
  { icon: Star, title: 'Hotel Discounts', description: 'Reduced rates at all Neoprime properties' },
  { icon: Users, title: 'Team Events', description: 'Regular social events and team building' },
  { icon: Briefcase, title: 'Pension Scheme', description: 'Competitive pension contributions' }
];

const openings = [
  {
    title: 'Front Desk Receptionist',
    department: 'Guest Services',
    type: 'Full-time',
    description: 'Be the welcoming face of Neoprime Newcastle. You\'ll handle check-ins, guest enquiries, and ensure every arrival is flawless.'
  },
  {
    title: 'Sous Chef',
    department: 'Culinary',
    type: 'Full-time',
    description: 'Support our Executive Chef in delivering exceptional cuisine at The Neoprime Grill. Experience in fine dining required.'
  },
  {
    title: 'Housekeeping Supervisor',
    department: 'Housekeeping',
    type: 'Full-time',
    description: 'Lead our housekeeping team to maintain impeccable standards throughout the property.'
  },
  {
    title: 'Bartender',
    department: 'Food & Beverage',
    type: 'Part-time',
    description: 'Craft exceptional cocktails and provide outstanding service in our sophisticated bar setting.'
  },
  {
    title: 'Events Coordinator',
    department: 'Events',
    type: 'Full-time',
    description: 'Plan and execute memorable events, from corporate meetings to wedding celebrations.'
  }
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-luxury-black">
      <PageHero
        title="Careers"
        subtitle="Join Our Team"
        image="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80"
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
                Work With Us
              </p>
              <h2 className="text-section text-luxury-black font-sans font-light uppercase tracking-wide mb-6">
                Build Your Career at Neoprime
              </h2>
              <div className="w-16 h-px bg-gold mb-8" />
              <p className="text-text-muted font-serif text-lg leading-relaxed mb-6">
                At Neoprime Hotels, we believe our people are our greatest asset. We're looking for 
                passionate individuals who share our commitment to exceptional hospitality and want 
                to be part of something special.
              </p>
              <p className="text-text-muted font-serif text-lg leading-relaxed mb-8">
                Whether you're starting your career or looking for your next challenge, we offer 
                opportunities to grow, learn, and make a real impact on our guests' experiences.
              </p>
              <Button variant="filled" href="#openings">
                View Open Positions
              </Button>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                alt="Neoprime Team"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Benefits */}
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
              Why Neoprime
            </p>
            <h2 className="text-section text-white font-sans font-light uppercase tracking-wide">
              Benefits & Perks
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={fadeUpVariants}
                className="border border-white/10 p-8 text-center hover:border-gold/50 transition-colors duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 border border-gold rounded-full flex items-center justify-center">
                  <benefit.icon className="text-gold" size={28} />
                </div>
                <h3 className="text-gold font-sans uppercase tracking-wide mb-3">
                  {benefit.title}
                </h3>
                <p className="text-text-secondary font-serif">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Open Positions */}
      <section id="openings" className="section-padding bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainerVariants}
          className="section-container"
        >
          <motion.div variants={fadeUpVariants} className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-sans">
              Current Vacancies
            </p>
            <h2 className="text-section text-luxury-black font-sans font-light uppercase tracking-wide">
              Open Positions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {openings.map((job) => (
              <motion.div
                key={job.title}
                variants={fadeUpVariants}
                className="border border-gray-200 p-8 hover:border-gold transition-colors duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl text-luxury-black font-sans uppercase tracking-wide">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-gold text-sm font-sans">{job.department}</span>
                      <span className="text-text-muted text-sm font-serif">·</span>
                      <span className="text-text-muted text-sm font-serif">{job.type}</span>
                    </div>
                  </div>
                  <Button variant="outline" href={`/careers/${job.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    Apply Now
                  </Button>
                </div>
                <p className="text-text-muted font-serif">
                  {job.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-luxury-dark">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUpVariants}
          className="section-container text-center"
        >
          <h2 className="text-section text-white font-sans font-light uppercase tracking-wide mb-6">
            Don't See the Right Role?
          </h2>
          <p className="text-text-secondary font-serif text-lg max-w-2xl mx-auto mb-8">
            We're always looking for exceptional talent. Send us your CV and we'll keep you in mind 
            for future opportunities.
          </p>
          <Button variant="filled" href="mailto:careers@neoprimehotels.com">
            Send Your CV
          </Button>
        </motion.div>
      </section>
    </main>
  );
}
