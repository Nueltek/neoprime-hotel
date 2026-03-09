"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { FeatureCardProps } from "@/types";

export default function FeatureCard({
  image,
  title,
  description,
  link,
}: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={link} className="block">
        {/* Image Container */}
        <div className="aspect-[4/5] overflow-hidden">
          <motion.div
            className="w-full h-full relative"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              loading="eager"
            />
          </motion.div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-luxury-black/30 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-white text-card-title font-sans uppercase tracking-[0.1em] mb-2">
            {title}
          </h3>
          <p className="text-text-secondary text-sm font-serif mb-4 opacity-90">
            {description}
          </p>

          {/* Link with arrow */}
          <motion.div
            className="flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-sans"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span>Explore</span>
            <ArrowRight size={14} />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
