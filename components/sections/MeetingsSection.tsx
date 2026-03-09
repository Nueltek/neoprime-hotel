"use client";

import { motion } from "framer-motion";
import EventCard from "@/components/ui/EventCard";
import {
  staggerContainerVariants,
  fadeUpVariants,
  viewportSettings,
  images,
} from "@/lib/utils";

const events = [
  {
    image: images.meetings,
    title: "Meetings and Events",
    description:
      "From intimate boardroom meetings to large-scale conferences, our versatile event spaces offer the perfect setting for any occasion with state-of-the-art facilities.",
    link: "/meetings",
  },
  {
    image: images.privateDining,
    title: "Private Dining",
    description:
      "Host your next special occasion in our elegant private dining rooms. Perfect for celebrations, corporate entertaining, and intimate gatherings.",
    link: "/dining",
  },
];

export default function MeetingsSection() {
  return (
    <section id="meetings" className="bg-luxury-black section-padding">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        variants={staggerContainerVariants}
        className="section-container"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event) => (
            <motion.div key={event.title} variants={fadeUpVariants}>
              <EventCard {...event} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
