"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  staggerContainerVariants,
  fadeUpVariants,
  viewportSettings,
  images,
} from "@/lib/utils";
import { useBookingPhone } from "@/components/providers/SiteSettingsProvider";

const ctaCards = [
  {
    image: images.stayAt,
    title: "Stay at Neoprime",
    isPhoneLink: true,
  },
  {
    image: images.dineAt,
    title: "Dine at the Grill",
    link: "/book-table",
  },
];

function CTACard({
  image,
  title,
  link,
  isPhoneLink,
  phoneLink,
}: {
  image: string;
  title: string;
  link?: string;
  isPhoneLink?: boolean;
  phoneLink: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const href = isPhoneLink ? phoneLink : link || "#";

  return (
    <motion.div
      className="relative overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href={href} className="block">
        <div className="relative aspect-[16/9] overflow-hidden">
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
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-luxury-black/50" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-white text-2xl md:text-3xl font-sans uppercase tracking-[0.1em] mb-4">
                {title}
              </h3>
              <motion.span
                className="inline-block px-6 py-3 border border-gold text-gold text-sm uppercase tracking-widest font-serif"
                animate={{
                  backgroundColor: isHovered ? "#C6A56A" : "rgba(0, 0, 0, 0)",
                  color: isHovered ? "#0A0B10" : "#C6A56A",
                }}
                transition={{ duration: 0.3 }}
              >
                Book Now
              </motion.span>
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

export default function CTASection() {
  const bookingPhone = useBookingPhone();
  const phoneLink = `tel:${bookingPhone.replace(/\s/g, "").replace(/[()]/g, "")}`;

  return (
    <section className="bg-luxury-black">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        variants={staggerContainerVariants}
        className="section-container section-padding"
      >
        {/* Main CTA Banner */}
        <motion.div variants={fadeUpVariants} className="text-center mb-16">
          <h2 className="text-section text-white font-sans font-light uppercase tracking-[0.05em] mb-8">
            Enhance Your Neoprime Experience
          </h2>
          <p className="text-text-secondary font-serif max-w-2xl mx-auto mb-8">
            From luxurious accommodations to exceptional dining, discover
            everything Neoprime Newcastle has to offer.
          </p>
        </motion.div>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ctaCards.map((card) => (
            <motion.div key={card.title} variants={fadeUpVariants}>
              <CTACard {...card} phoneLink={phoneLink} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
