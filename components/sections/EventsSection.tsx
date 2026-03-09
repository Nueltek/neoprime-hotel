'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fadeUpVariants, staggerContainerVariants, viewportSettings } from '@/lib/utils';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';

interface Event {
  _id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image?: { url: string };
  ticketLink?: string;
}

export default function EventsSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSection, setShowSection] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch settings to check if events should be shown
        const settingsRes = await fetch('/api/settings');
        const settingsData = await settingsRes.json();
        
        if (!settingsData.settings?.showEvents) {
          setShowSection(false);
          setIsLoading(false);
          return;
        }

        // Fetch upcoming events
        const eventsRes = await fetch('/api/events?upcoming=true&limit=3');
        const eventsData = await eventsRes.json();
        setEvents(eventsData.events || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!showSection || isLoading || events.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-luxury-dark">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportSettings}
        variants={staggerContainerVariants}
        className="section-container"
      >
        {/* Section Header */}
        <motion.div variants={fadeUpVariants} className="text-center mb-16">
          <span className="text-gold text-xs tracking-[0.4em] uppercase font-sans mb-4 block">
            What's On
          </span>
          <h2 className="text-section text-white font-sans font-light uppercase tracking-wide">
            Upcoming Events
          </h2>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event._id}
              variants={fadeUpVariants}
              className="group"
            >
              <div className="bg-luxury-black border border-white/10 overflow-hidden hover:border-gold/30 transition-colors">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  {event.image?.url ? (
                    <Image
                      src={event.image.url}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-luxury-dark flex items-center justify-center">
                      <Calendar className="text-gold/30" size={48} />
                    </div>
                  )}
                  
                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 bg-gold text-luxury-black px-3 py-2 text-center">
                    <span className="block text-2xl font-sans font-bold leading-none">
                      {format(new Date(event.date), 'd')}
                    </span>
                    <span className="block text-xs uppercase tracking-wide">
                      {format(new Date(event.date), 'MMM')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-white font-sans uppercase tracking-wide text-lg mb-3 group-hover:text-gold transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-text-muted font-serif text-sm line-clamp-2 mb-4">
                    {event.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-text-muted">
                      <Clock size={14} className="text-gold" />
                      <span className="font-serif">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-muted">
                      <MapPin size={14} className="text-gold" />
                      <span className="font-serif">{event.location}</span>
                    </div>
                  </div>

                  {event.ticketLink && (
                    <a
                      href={event.ticketLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-gold text-sm font-sans uppercase tracking-wide mt-4 hover:gap-3 transition-all"
                    >
                      Get Tickets
                      <ArrowRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div variants={fadeUpVariants} className="text-center mt-12">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light text-sm font-sans uppercase tracking-widest transition-colors"
          >
            View All Events
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
