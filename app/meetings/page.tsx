"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import PublicLayout from "@/components/layouts/PublicLayout";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import {
  fadeUpVariants,
  staggerContainerVariants,
  viewportSettings,
  images,
} from "@/lib/utils";
import { Users, Maximize, Check, Phone, Mail, ArrowRight } from "lucide-react";
import {
  useBookingInfo,
  useContactInfo,
} from "@/components/providers/SiteSettingsProvider";

interface Space {
  _id: string;
  title: string;
  subtitle?: string;
  description: string;
  capacity: {
    theatre?: number;
    classroom?: number;
    boardroom?: number;
    reception?: number;
    banquet?: number;
  };
  size?: string;
  features: string[];
  image?: { url: string };
  priceFrom?: string;
  featured: boolean;
}

// Fallback static data
const fallbackSpaces: Space[] = [
  {
    _id: "1",
    title: "The Boardroom",
    subtitle: "Executive Meetings",
    description:
      "An intimate space designed for executive meetings and private discussions. Features state-of-the-art video conferencing and presentation facilities.",
    capacity: { boardroom: 14, theatre: 20 },
    size: "45 m²",
    features: [
      "Natural daylight",
      "Video conferencing",
      "Private entrance",
      "Catering available",
    ],
    image: {
      url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    },
    priceFrom: "From £500/day",
    featured: true,
  },
  {
    _id: "2",
    title: "The Gallery",
    subtitle: "Versatile Event Space",
    description:
      "A flexible space perfect for presentations, workshops, and medium-sized gatherings. Natural light floods through floor-to-ceiling windows.",
    capacity: { theatre: 80, classroom: 50, reception: 100 },
    size: "120 m²",
    features: [
      "Natural daylight",
      "Built-in AV",
      "Breakout area",
      "Flexible layout",
    ],
    image: {
      url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80",
    },
    priceFrom: "From £1,200/day",
    featured: true,
  },
  {
    _id: "3",
    title: "The Grand Ballroom",
    subtitle: "Our Signature Venue",
    description:
      "Our largest and most prestigious space, featuring soaring ceilings, crystal chandeliers, and elegant décor. Perfect for gala dinners, conferences, and celebrations.",
    capacity: { theatre: 300, banquet: 200, reception: 400 },
    size: "450 m²",
    features: [
      "Crystal chandeliers",
      "Stage area",
      "Private bar",
      "Green room",
    ],
    image: {
      url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
    },
    priceFrom: "From £3,500/day",
    featured: true,
  },
];

export default function MeetingsPage() {
  const [spaces, setSpaces] = useState<Space[]>(fallbackSpaces);
  const [isLoading, setIsLoading] = useState(true);
  const booking = useBookingInfo();
  const contact = useContactInfo();

  const phoneLink = contact.phone.replace(/\s/g, "").replace(/[()]/g, "");

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const res = await fetch("/api/spaces");
        const data = await res.json();
        if (data.spaces && data.spaces.length > 0) {
          setSpaces(data.spaces);
        }
      } catch (error) {
        console.error("Error fetching spaces:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpaces();
  }, []);

  const getMaxCapacity = (capacity: Space["capacity"]) => {
    const values = Object.values(capacity).filter(
      (v) => v !== undefined,
    ) as number[];
    return values.length > 0 ? Math.max(...values) : 0;
  };

  return (
    <PublicLayout>
      <main className="min-h-screen bg-luxury-black">
        <PageHero
          title="Meetings & Events"
          subtitle="Exceptional Spaces"
          image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
        />

        {/* Intro */}
        <section className="section-padding bg-white">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainerVariants}
            className="section-container"
          >
            <div className="max-w-3xl mx-auto text-center">
              <motion.p
                variants={fadeUpVariants}
                className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-sans"
              >
                Host Your Event
              </motion.p>
              <motion.h2
                variants={fadeUpVariants}
                className="text-section text-luxury-black font-sans font-light uppercase tracking-wide mb-6"
              >
                Spaces That Inspire
              </motion.h2>
              <motion.div
                variants={fadeUpVariants}
                className="w-16 h-px bg-gold mx-auto mb-6"
              />
              <motion.p
                variants={fadeUpVariants}
                className="text-body text-text-muted font-serif leading-relaxed"
              >
                From intimate boardroom meetings to grand celebrations, our
                versatile venues provide the perfect backdrop for your events.
                Each space is equipped with state-of-the-art technology and
                supported by our dedicated events team.
              </motion.p>
            </div>
          </motion.div>
        </section>

        {/* Spaces */}
        <section className="section-padding bg-luxury-black">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainerVariants}
            className="section-container"
          >
            <motion.div variants={fadeUpVariants} className="text-center mb-12">
              <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-sans">
                Our Venues
              </p>
              <h2 className="text-section text-white font-sans font-light uppercase tracking-wide">
                Event Spaces
              </h2>
            </motion.div>

            <div className="space-y-16">
              {spaces.map((space, index) => (
                <motion.div
                  key={space._id}
                  variants={fadeUpVariants}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={space.image?.url || images.meetings}
                        alt={space.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>

                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    {space.subtitle && (
                      <p className="text-gold text-xs tracking-[0.2em] uppercase mb-3 font-sans">
                        {space.subtitle}
                      </p>
                    )}
                    <h3 className="text-2xl lg:text-3xl text-white font-sans font-light uppercase tracking-wide mb-4">
                      {space.title}
                    </h3>
                    <p className="text-text-muted font-serif leading-relaxed mb-6">
                      {space.description}
                    </p>

                    <div className="flex flex-wrap gap-6 mb-6">
                      <div className="flex items-center gap-2 text-white">
                        <Users size={18} className="text-gold" />
                        <span className="font-serif">
                          Up to {getMaxCapacity(space.capacity)} guests
                        </span>
                      </div>
                      {space.size && (
                        <div className="flex items-center gap-2 text-white">
                          <Maximize size={18} className="text-gold" />
                          <span className="font-serif">{space.size}</span>
                        </div>
                      )}
                    </div>

                    {space.features.length > 0 && (
                      <ul className="grid grid-cols-2 gap-2 mb-6">
                        {space.features.slice(0, 4).map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-2 text-text-muted text-sm font-serif"
                          >
                            <Check size={14} className="text-gold" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}

                    {space.priceFrom && (
                      <p className="text-gold font-sans text-lg mb-6">
                        {space.priceFrom}
                      </p>
                    )}

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-gold font-sans uppercase tracking-wider hover:gap-3 transition-all"
                    >
                      Enquire Now
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Capacity Table */}
        <section className="section-padding bg-luxury-dark">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainerVariants}
            className="section-container"
          >
            <motion.div variants={fadeUpVariants} className="text-center mb-12">
              <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-sans">
                At a Glance
              </p>
              <h2 className="text-section text-white font-sans font-light uppercase tracking-wide">
                Capacity Chart
              </h2>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-4 px-4 text-white font-sans uppercase tracking-wide">
                      Space
                    </th>
                    <th className="text-center py-4 px-4 text-white font-sans uppercase tracking-wide text-sm">
                      Theatre
                    </th>
                    <th className="text-center py-4 px-4 text-white font-sans uppercase tracking-wide text-sm">
                      Classroom
                    </th>
                    <th className="text-center py-4 px-4 text-white font-sans uppercase tracking-wide text-sm">
                      Boardroom
                    </th>
                    <th className="text-center py-4 px-4 text-white font-sans uppercase tracking-wide text-sm">
                      Reception
                    </th>
                    <th className="text-center py-4 px-4 text-white font-sans uppercase tracking-wide text-sm">
                      Banquet
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {spaces.map((space) => (
                    <tr key={space._id} className="border-b border-white/10">
                      <td className="py-4 px-4 text-white font-serif">
                        {space.title}
                      </td>
                      <td className="py-4 px-4 text-center text-text-muted font-serif">
                        {space.capacity.theatre || "-"}
                      </td>
                      <td className="py-4 px-4 text-center text-text-muted font-serif">
                        {space.capacity.classroom || "-"}
                      </td>
                      <td className="py-4 px-4 text-center text-text-muted font-serif">
                        {space.capacity.boardroom || "-"}
                      </td>
                      <td className="py-4 px-4 text-center text-text-muted font-serif">
                        {space.capacity.reception || "-"}
                      </td>
                      <td className="py-4 px-4 text-center text-text-muted font-serif">
                        {space.capacity.banquet || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-luxury-navy">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUpVariants}
            className="section-container text-center"
          >
            <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-sans">
              Plan Your Event
            </p>
            <h2 className="text-section text-white font-sans font-light uppercase tracking-wide mb-6">
              Let's Create Something Special
            </h2>
            <p className="text-text-muted font-serif mb-8 max-w-2xl mx-auto">
              Our dedicated events team is here to help you plan every detail.
              Contact us to discuss your requirements and receive a tailored
              proposal.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <a
                href={`tel:${phoneLink}`}
                className="flex items-center justify-center gap-2 text-gold hover:text-white transition-colors"
              >
                <Phone size={18} />
                <span className="font-serif">{contact.phone}</span>
              </a>
              <a
                href={`mailto:${booking.eventsEmail}`}
                className="flex items-center justify-center gap-2 text-gold hover:text-white transition-colors"
              >
                <Mail size={18} />
                <span className="font-serif">{booking.eventsEmail}</span>
              </a>
            </div>
            <Button href="/contact" variant="filled" className="py-5 px-8">
              Request a Proposal
            </Button>
          </motion.div>
        </section>
      </main>
    </PublicLayout>
  );
}
