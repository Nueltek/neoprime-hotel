'use client';

import { motion } from 'framer-motion';
import PageHero from '@/components/ui/PageHero';
import Button from '@/components/ui/Button';
import { fadeUpVariants, staggerContainerVariants, viewportSettings } from '@/lib/utils';
import { Accessibility, Eye, Ear, Move, Hand, Phone } from 'lucide-react';

const features = [
  {
    icon: Accessibility,
    title: 'Wheelchair Accessible Rooms',
    description: 'Spacious rooms with wider doorways, roll-in showers, grab bars, and lowered fixtures. Available upon request.'
  },
  {
    icon: Eye,
    title: 'Visual Assistance',
    description: 'Large-print menus and in-room information available. Guide dogs welcome throughout the property.'
  },
  {
    icon: Ear,
    title: 'Hearing Support',
    description: 'Visual alarms and notification devices available. Our staff is trained in basic sign language.'
  },
  {
    icon: Move,
    title: 'Mobility Access',
    description: 'Step-free access to all public areas. Lifts to all floors with audio announcements.'
  },
  {
    icon: Hand,
    title: 'Service Excellence',
    description: 'Our team is trained to assist guests with additional needs. Just let us know how we can help.'
  },
  {
    icon: Phone,
    title: '24/7 Assistance',
    description: 'Round-the-clock support available through our front desk for any accessibility requirements.'
  }
];

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-luxury-black">
      <PageHero
        title="Accessibility"
        subtitle="Inclusive Experience"
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
          className="section-container text-center"
        >
          <motion.p variants={fadeUpVariants} className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-sans">
            Everyone Welcome
          </motion.p>
          <motion.h2 variants={fadeUpVariants} className="text-section text-luxury-black font-sans font-light uppercase tracking-wide mb-6">
            Our Commitment to Accessibility
          </motion.h2>
          <motion.p variants={fadeUpVariants} className="text-text-muted font-serif text-lg max-w-3xl mx-auto leading-relaxed">
            At Neoprime Hotels, we believe exceptional hospitality means welcoming everyone. 
            We are committed to providing accessible facilities and services to ensure all guests 
            can enjoy a comfortable and memorable stay.
          </motion.p>
        </motion.div>
      </section>

      {/* Features */}
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
              Facilities & Services
            </p>
            <h2 className="text-section text-white font-sans font-light uppercase tracking-wide">
              Accessibility Features
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUpVariants}
                className="border border-white/10 p-8 text-center hover:border-gold/50 transition-colors duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 border border-gold rounded-full flex items-center justify-center">
                  <feature.icon className="text-gold" size={28} />
                </div>
                <h3 className="text-gold font-sans uppercase tracking-wide mb-3">
                  {feature.title}
                </h3>
                <p className="text-text-secondary font-serif">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Additional Information */}
      <section className="section-padding bg-luxury-dark">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUpVariants}
          className="section-container max-w-4xl mx-auto"
        >
          <h2 className="text-2xl text-white font-sans uppercase tracking-wide mb-8 text-center">
            Additional Information
          </h2>
          
          <div className="space-y-8 text-text-secondary font-serif">
            <div>
              <h3 className="text-gold font-sans uppercase tracking-wide mb-3">Parking</h3>
              <p>
                Accessible parking spaces are available in our car park, located nearest to the 
                hotel entrance. Please inform us at the time of booking if you require an 
                accessible parking space.
              </p>
            </div>
            
            <div>
              <h3 className="text-gold font-sans uppercase tracking-wide mb-3">Restaurant & Bar</h3>
              <p>
                The Neoprime Grill and Bar are fully accessible with step-free entry. 
                We can accommodate wheelchairs and mobility aids, and menus are available 
                in large print upon request. Please inform our team of any dietary requirements.
              </p>
            </div>
            
            <div>
              <h3 className="text-gold font-sans uppercase tracking-wide mb-3">Assistance Animals</h3>
              <p>
                Service animals and assistance dogs are welcome throughout the hotel at no 
                additional charge. Water bowls and relief areas can be arranged upon request.
              </p>
            </div>
            
            <div>
              <h3 className="text-gold font-sans uppercase tracking-wide mb-3">Website Accessibility</h3>
              <p>
                We are committed to making our website accessible to all users. If you 
                experience any difficulty accessing information on our site, please contact 
                us and we will be happy to assist.
              </p>
            </div>
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
            Questions or Special Requirements?
          </h2>
          <p className="text-text-muted font-serif text-lg max-w-2xl mx-auto mb-8">
            Our team is here to help ensure your stay is comfortable. Please contact us 
            before your arrival to discuss your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="filled" href="/contact">
              Contact Us
            </Button>
            <Button variant="outline" href="tel:+441912345678">
              Call: +44 (0) 191 234 5678
            </Button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
