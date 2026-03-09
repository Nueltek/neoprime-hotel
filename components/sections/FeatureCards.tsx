'use client';

import { motion } from 'framer-motion';
import FeatureCard from '@/components/ui/FeatureCard';
import { staggerContainerVariants, fadeUpVariants, viewportSettings, images } from '@/lib/utils';

const features = [
  {
    image: images.sleepInStyle,
    title: 'Sleep in Style',
    description: 'Stylish and modern rooms designed for ultimate comfort and relaxation.',
    link: '#rooms'
  },
  {
    image: images.dineAtGrill,
    title: 'Dine at the Grill',
    description: 'Explore our signature restaurant featuring contemporary British cuisine.',
    link: '#restaurant'
  },
  {
    image: images.drinksAtBar,
    title: 'Drinks at the Bar',
    description: 'Sophisticated cocktails and fine wines in an intimate setting.',
    link: '#bar'
  }
];

export default function FeatureCards() {
  return (
    <section className="bg-luxury-black section-padding">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        variants={staggerContainerVariants}
        className="section-container"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div key={feature.title} variants={fadeUpVariants}>
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
