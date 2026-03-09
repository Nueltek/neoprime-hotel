"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { MapPin } from "lucide-react";
import {
  slideInLeftVariants,
  slideInRightVariants,
  viewportSettings,
  images,
} from "@/lib/utils";

export default function LocationSection() {
  return (
    <section className="bg-luxury-black">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image - Left Side */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={slideInLeftVariants}
          className="relative aspect-square lg:aspect-auto lg:min-h-[600px] overflow-hidden img-zoom"
        >
          <Image
            src={images.building}
            alt="Neoprime Newcastle Building"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Content - Right Side */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={slideInRightVariants}
          className="flex items-center p-8 lg:p-16"
        >
          <div>
            <p className="text-xs tracking-[0.2em] uppercase mb-4 text-gold font-sans">
              Neoprime Newcastle
            </p>
            <h2 className="text-section text-white font-sans font-light uppercase tracking-[0.05em] mb-6">
              How to Find Us
            </h2>
            <div className="w-16 h-px bg-gold mb-6" />
            <p className="text-body text-text-secondary font-serif mb-6 leading-relaxed">
              Located in the heart of Newcastle city centre, Neoprime Newcastle
              offers the perfect base for exploring everything this vibrant city
              has to offer. Just moments from the iconic Quayside and Grey
              Street.
            </p>

            {/* Address */}
            <div className="flex items-start gap-3 mb-8">
              <MapPin className="text-gold flex-shrink-0 mt-1" size={18} />
              <div className="text-text-secondary font-serif">
                <p>Neoprime Newcastle</p>
                <p>New Bridge Street West</p>
                <p>Newcastle upon Tyne</p>
                <p>NE1 8BS</p>
              </div>
            </div>

            <Button variant="outline" href="/location">
              View Location
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
