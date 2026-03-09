"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import {
  fadeUpVariants,
  slideInLeftVariants,
  slideInRightVariants,
  viewportSettings,
  images,
} from "@/lib/utils";

export default function DiningSection() {
  return (
    <section id="restaurants" className="bg-luxury-dark section-padding">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content - Left Side */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={slideInLeftVariants}
            className="order-2 lg:order-1"
          >
            <p className="text-xs tracking-[0.2em] uppercase mb-4 text-gold font-sans">
              Culinary Excellence
            </p>
            <h2 className="text-section text-white font-sans font-light uppercase tracking-[0.05em] mb-6">
              Drink and Dine
            </h2>
            <div className="w-16 h-px bg-gold mb-6" />
            <p className="text-body text-text-secondary font-serif mb-8 leading-relaxed">
              The Neoprime Grill offers an exceptional dining experience with a
              menu that celebrates the finest seasonal ingredients. Our expert
              chefs craft dishes that are both innovative and comforting,
              complemented by an extensive wine list and creative cocktails from
              our stylish bar.
            </p>
            <Button variant="outline" href="/menu">
              View Menus
            </Button>
          </motion.div>

          {/* Images - Right Side (Stacked) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={slideInRightVariants}
            className="order-1 lg:order-2 grid grid-cols-1 gap-6"
          >
            <div className="relative aspect-[16/10] overflow-hidden img-zoom">
              <Image
                src={images.dining1}
                alt="Restaurant Interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-[16/10] overflow-hidden img-zoom">
              <Image
                src={images.dining2}
                alt="Fine Dining"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
