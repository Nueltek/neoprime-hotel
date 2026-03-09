"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import {
  fadeUpVariants,
  staggerContainerVariants,
  viewportSettings,
} from "@/lib/utils";

export default function IntroSection() {
  return (
    <section className="bg-white section-padding">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        variants={staggerContainerVariants}
        className="section-container text-center"
      >
        {/* Editorial Statement */}
        <motion.div variants={fadeUpVariants} className="mb-10">
          <h2 className="text-section text-luxury-black font-sans font-light uppercase tracking-[0.08em] leading-tight">
            Bold Design
          </h2>
          <h2 className="text-section text-luxury-black font-sans font-light uppercase tracking-[0.08em] leading-tight">
            Warm Hospitality
          </h2>
          <h2 className="text-section text-luxury-black font-sans font-light uppercase tracking-[0.08em] leading-tight">
            Unmistakably <span className="text-gold">Neoprime</span>
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUpVariants}
          className="text-body text-text-muted max-w-2xl mx-auto mb-10 font-serif"
        >
          Welcome to Neoprime Newcastle, where contemporary luxury meets
          timeless elegance. Experience exceptional dining, sophisticated
          accommodations, and impeccable service in the heart of the city.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={fadeUpVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="outline" href="/rooms">
            Explore Rooms
          </Button>
          <Button variant="outline" href="#reservations">
            Make a Reservation
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
