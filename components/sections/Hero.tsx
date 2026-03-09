"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { heroStaggerVariants, heroChildVariants, images } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={images.hero}
          alt="Neoprime Hotel"
          fill
          className="object-cover"
          priority
          loading="eager"
          sizes="100vw"
          quality={90}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/70 via-luxury-black/40 to-luxury-black/80" />
      </div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={heroStaggerVariants}
        className="relative z-10 text-center px-6 pt-8"
      >
        <motion.p
          variants={heroChildVariants}
          className="text-gold text-xs tracking-[0.3em] uppercase mb-6 font-sans"
        >
          Welcome to
        </motion.p>

        <motion.h1
          variants={heroChildVariants}
          className="text-hero text-white font-sans font-light uppercase tracking-[0.15em] mb-2"
        >
          Neoprime
        </motion.h1>

        <motion.h1
          variants={heroChildVariants}
          className="text-hero text-white font-sans font-light uppercase tracking-[0.15em] mb-8"
        >
          Newcastle
        </motion.h1>

        <motion.div
          variants={heroChildVariants}
          className="flex items-center justify-center gap-4"
        >
          <div className="w-16 h-px bg-gold" />
          <div className="w-2 h-2 rotate-45 border border-gold" />
          <div className="w-16 h-px bg-gold" />
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-16 bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
