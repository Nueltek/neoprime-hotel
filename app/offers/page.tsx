"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import PublicLayout from "@/components/layouts/PublicLayout";
import PageHero from "@/components/ui/PageHero";
import { Calendar, Check } from "lucide-react";
import { useBookingPhone } from "@/components/providers/SiteSettingsProvider";

interface Offer {
  _id: string;
  title: string;
  slug: string;
  subtitle?: string;
  description: string;
  price: string;
  validity: string;
  includes: string[];
  image: { url: string; publicId: string };
  featured: boolean;
}

// Fallback static offers
const staticOffers: Offer[] = [
  {
    _id: "reset",
    title: "A Neoprime Reset",
    slug: "neoprime-reset",
    subtitle: "Wellness Package",
    description:
      "Escape the everyday and rejuvenate your mind, body, and soul with our signature wellness retreat.",
    image: {
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80",
      publicId: "",
    },
    price: "From £349 per night",
    validity: "Valid until 31 December 2025",
    includes: [
      "Luxury room accommodation",
      "60-minute spa treatment",
      "Full English breakfast",
      "Late checkout (2pm)",
    ],
    featured: true,
  },
  {
    _id: "soft-life",
    title: "The Soft Life",
    slug: "soft-life",
    subtitle: "Luxury Experience",
    description:
      "Indulge in the ultimate luxury experience with champagne, suite upgrades, and more.",
    image: {
      url: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80",
      publicId: "",
    },
    price: "From £499 per night",
    validity: "Available year-round",
    includes: [
      "Suite accommodation",
      "Champagne on arrival",
      "Breakfast in bed",
      "Late checkout (3pm)",
    ],
    featured: true,
  },
  {
    _id: "romance",
    title: "Romance Package",
    slug: "romance-package",
    subtitle: "Couples Retreat",
    description: "Create unforgettable memories with your special someone.",
    image: {
      url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80",
      publicId: "",
    },
    price: "From £389 per night",
    validity: "Available year-round",
    includes: [
      "Deluxe room with rose petals",
      "Bottle of champagne",
      "Couples spa treatment",
      "Three-course dinner",
    ],
    featured: false,
  },
];

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>(staticOffers);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const bookingPhone = useBookingPhone();
  const phoneLink = `tel:${bookingPhone.replace(/\s/g, "").replace(/[()]/g, "")}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch("/api/offers");
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
    <PublicLayout>
      <main className="min-h-screen bg-luxury-black">
        <PageHero
          title="Special Offers"
          subtitle="Exclusive"
          image="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1920&q=80"
          height="medium"
        />

        <section className="section-padding bg-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="section-container text-center"
          >
            <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-sans">
              Exclusive Packages
            </p>
            <h2 className="text-section text-luxury-black font-sans font-light uppercase tracking-wide mb-6">
              Newcastle Specials
            </h2>
            <p className="text-text-muted font-serif text-lg max-w-3xl mx-auto leading-relaxed">
              Discover our carefully curated collection of packages and special
              offers.
            </p>
          </motion.div>
        </section>

        <section className="section-padding bg-luxury-black">
          <div className="section-container">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full" />
              </div>
            ) : (
              <div className="space-y-16">
                {offers.map((offer, index) => (
                  <motion.div
                    key={offer._id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={
                      mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                    }
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                  >
                    <div
                      className={`relative aspect-[4/3] overflow-hidden ${index % 2 === 1 ? "lg:order-2" : ""}`}
                    >
                      {offer.image?.url && (
                        <Image
                          src={offer.image.url}
                          alt={offer.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      )}
                      {offer.featured && (
                        <span className="absolute top-4 left-4 bg-gold text-luxury-black text-xs px-3 py-1 font-sans uppercase tracking-wide">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                      {offer.subtitle && (
                        <p className="text-gold text-xs tracking-[0.2em] uppercase mb-3 font-sans">
                          {offer.subtitle}
                        </p>
                      )}
                      <h3 className="text-3xl md:text-4xl text-white font-sans font-light uppercase tracking-wide mb-4">
                        {offer.title}
                      </h3>
                      <div className="w-12 h-px bg-gold mb-6" />
                      <p className="text-text-secondary font-serif text-lg leading-relaxed mb-6">
                        {offer.description}
                      </p>

                      {offer.includes?.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-white font-sans uppercase tracking-wide text-sm mb-3">
                            Package Includes:
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {offer.includes.map((item) => (
                              <li
                                key={item}
                                className="text-text-muted text-sm font-serif flex items-center gap-2"
                              >
                                <Check
                                  size={14}
                                  className="text-gold flex-shrink-0"
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex flex-wrap items-center gap-6 mb-8">
                        <span className="text-gold font-sans text-lg">
                          {offer.price}
                        </span>
                        <span className="flex items-center gap-2 text-text-muted text-sm font-serif">
                          <Calendar size={14} />
                          {offer.validity}
                        </span>
                      </div>

                      <a
                        href={phoneLink}
                        className="inline-block border border-gold text-gold hover:bg-gold hover:text-luxury-black px-6 py-3 font-serif uppercase tracking-widest text-sm transition-colors"
                      >
                        Book This Offer
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="section-padding bg-luxury-dark">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="section-container"
          >
            <h3 className="text-white font-sans uppercase tracking-wide mb-6">
              Terms & Conditions
            </h3>
            <div className="text-text-secondary font-serif text-sm space-y-2">
              <p>
                • All offers are subject to availability and may be withdrawn at
                any time.
              </p>
              <p>
                • Offers cannot be combined with other promotions or discounts.
              </p>
              <p>
                • Please contact reservations for full terms and conditions.
              </p>
            </div>
          </motion.div>
        </section>

        <section className="section-padding bg-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="section-container text-center"
          >
            <h2 className="text-section text-luxury-black font-sans font-light uppercase tracking-wide mb-6">
              Need Help Choosing?
            </h2>
            <p className="text-text-muted font-serif text-lg max-w-2xl mx-auto mb-8">
              Our reservations team is here to help you select the perfect
              package.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-gold hover:bg-gold-dark text-luxury-black px-8 py-4 font-sans uppercase tracking-widest text-sm transition-colors"
            >
              Contact Reservations
            </Link>
          </motion.div>
        </section>
      </main>
    </PublicLayout>
  );
}
