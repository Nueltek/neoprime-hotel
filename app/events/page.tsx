'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import PublicLayout from '@/components/layouts/PublicLayout';
import PageHero from '@/components/ui/PageHero';
import { fadeUpVariants, staggerContainerVariants, viewportSettings } from '@/lib/utils';
import { Calendar, Clock, MapPin, ArrowRight, Ticket } from 'lucide-react';

interface Event {
  _id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  endDate?: string;
  time: string;
  location: string;
  image?: { url: string };
  ticketLink?: string;
  featured: boolean;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events?upcoming=true');
        const data = await res.json();
        setEvents(data.events || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Separate featured and regular events
  const featuredEvents = events.filter(e => e.featured);
  const regularEvents = events.filter(e => !e.featured);

  return (
    <PublicLayout>
      <main className="min-h-screen bg-luxury-black">
        <PageHero
          title="Upcoming Events"
          subtitle="What's On"
          image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80"
          height="medium"
        />

        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <section className="section-padding bg-luxury-dark">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={staggerContainerVariants}
              className="section-container"
            >
              <motion.div variants={fadeUpVariants} className="mb-12">
                <span className="text-gold text-xs tracking-[0.4em] uppercase font-sans mb-4 block">
                  Featured
                </span>
              </motion.div>

              {featuredEvents.map((event) => (
                <motion.div
                  key={event._id}
                  variants={fadeUpVariants}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-luxury-black border border-white/10 overflow-hidden mb-8"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[400px]">
                    {event.image?.url ? (
                      <Image
                        src={event.image.url}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-luxury-dark flex items-center justify-center">
                        <Calendar className="text-gold/30" size={64} />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-gold text-luxury-black px-4 py-3 text-center">
                        <span className="block text-3xl font-sans font-bold leading-none">
                          {format(new Date(event.date), 'd')}
                        </span>
                        <span className="block text-sm uppercase tracking-wide">
                          {format(new Date(event.date), 'MMM yyyy')}
                        </span>
                      </div>
                      <span className="bg-gold/20 text-gold px-3 py-1 text-xs font-sans uppercase tracking-wide">
                        Featured Event
                      </span>
                    </div>

                    <h2 className="text-3xl text-white font-sans uppercase tracking-wide mb-4">
                      {event.title}
                    </h2>

                    <p className="text-text-secondary font-serif text-lg mb-6 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="flex flex-wrap gap-6 mb-8 text-sm">
                      <div className="flex items-center gap-2 text-text-muted">
                        <Clock size={16} className="text-gold" />
                        <span className="font-serif">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-text-muted">
                        <MapPin size={16} className="text-gold" />
                        <span className="font-serif">{event.location}</span>
                      </div>
                    </div>

                    {event.ticketLink && (
                      <a
                        href={event.ticketLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-luxury-black px-6 py-3 font-sans uppercase tracking-widest text-sm transition-colors w-fit"
                      >
                        <Ticket size={16} />
                        Get Tickets
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        {/* All Events */}
        <section className="section-padding bg-white">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainerVariants}
            className="section-container"
          >
            <motion.div variants={fadeUpVariants} className="text-center mb-12">
              <h2 className="text-section text-luxury-black font-sans font-light uppercase tracking-wide">
                All Upcoming Events
              </h2>
            </motion.div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full" />
              </div>
            ) : regularEvents.length === 0 && featuredEvents.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="mx-auto text-text-muted mb-4" size={48} />
                <p className="text-text-muted font-serif text-lg">
                  No upcoming events at the moment. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularEvents.map((event, index) => (
                  <motion.div
                    key={event._id}
                    variants={fadeUpVariants}
                    className="group"
                  >
                    <div className="bg-luxury-black border border-white/10 overflow-hidden hover:border-gold/30 transition-colors h-full flex flex-col">
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
                            <Calendar className="text-gold/30" size={40} />
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
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-white font-sans uppercase tracking-wide text-lg mb-3 group-hover:text-gold transition-colors">
                          {event.title}
                        </h3>

                        <p className="text-text-muted font-serif text-sm line-clamp-2 mb-4 flex-1">
                          {event.description}
                        </p>

                        <div className="space-y-2 text-sm mb-4">
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
                            className="inline-flex items-center gap-2 text-gold text-sm font-sans uppercase tracking-wide hover:gap-3 transition-all"
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
            )}
          </motion.div>
        </section>

        {/* Contact CTA */}
        <section className="section-padding bg-luxury-black">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUpVariants}
            className="section-container text-center"
          >
            <h2 className="text-section text-white font-sans font-light uppercase tracking-wide mb-6">
              Host Your Event With Us
            </h2>
            <p className="text-text-secondary font-serif text-lg max-w-2xl mx-auto mb-8">
              From intimate gatherings to grand celebrations, our versatile spaces and dedicated team ensure every event is extraordinary.
            </p>
            <a
              href="/meetings"
              className="inline-block bg-gold hover:bg-gold-dark text-luxury-black px-8 py-4 font-sans uppercase tracking-widest text-sm transition-colors"
            >
              View Event Spaces
            </a>
          </motion.div>
        </section>
      </main>
    </PublicLayout>
  );
}
