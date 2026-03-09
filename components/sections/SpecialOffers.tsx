"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { images } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface Offer {
  _id: string;
  title: string;
  subtitle?: string;
  description: string;
  slug: string;
  image?: { url: string };
}

// Fallback static offers for when API returns nothing
const fallbackOffers = [
  {
    _id: "1",
    title: "Romantic Escape",
    subtitle: "Love in Luxury",
    description:
      "Celebrate your love with an unforgettable romantic getaway including champagne and couples spa.",
    slug: "romantic-escape",
    image: { url: images.offer1 },
  },
  {
    _id: "2",
    title: "Spa & Wellness Retreat",
    subtitle: "Restore Your Balance",
    description:
      "Immerse yourself in total relaxation with our comprehensive wellness package.",
    slug: "spa-wellness-retreat",
    image: { url: images.offer2 },
  },
  {
    _id: "3",
    title: "Weekend Indulgence",
    subtitle: "Perfect Getaway",
    description:
      "Make the most of your weekend with premium dining, relaxation, and city exploration.",
    slug: "weekend-indulgence",
    image: { url: images.offer3 },
  },
];

export default function SpecialOffers() {
  const [offers, setOffers] = useState<Offer[]>(fallbackOffers);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch("/api/offers?featured=true&limit=3");
        const data = await res.json();
        if (data.offers && data.offers.length > 0) {
          setOffers(data.offers);
        }
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return (
    <section id="offers" className="bg-luxury-navy section-padding">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.2em] uppercase mb-4 text-gold font-sans">
            Exclusive
          </p>
          <h2 className="text-section text-white font-sans font-light uppercase tracking-[0.05em]">
            Special Offers
          </h2>
        </motion.div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.slice(0, 3).map((offer, index) => (
            <motion.div
              key={offer._id}
              initial={{ opacity: 0, y: 40 }}
              animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
            >
              <Link href={`/offers`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden mb-6">
                  <Image
                    src={offer.image?.url || images.offer1}
                    alt={offer.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <p className="text-gold text-xs tracking-[0.15em] uppercase font-sans mb-2">
                  {offer.subtitle || "Special Offer"}
                </p>
                <h3 className="text-white font-sans text-xl uppercase tracking-wide mb-3 group-hover:text-gold transition-colors">
                  {offer.title}
                </h3>
                <p className="text-text-muted font-serif text-sm leading-relaxed mb-4 line-clamp-2">
                  {offer.description}
                </p>
                <span className="inline-flex items-center gap-2 text-gold text-sm font-sans uppercase tracking-wider group-hover:gap-3 transition-all">
                  View Offer
                  <ArrowRight size={16} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/offers"
            className="inline-flex items-center gap-3 px-8 py-4 border border-gold text-gold font-sans text-sm uppercase tracking-widest hover:bg-gold hover:text-luxury-black transition-all duration-300"
          >
            View All Offers
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
