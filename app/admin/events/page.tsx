'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff, Star, Calendar, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';
import toast, { Toaster } from 'react-hot-toast';

interface Event {
  _id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  endDate?: string;
  time: string;
  location: string;
  image?: { url: string; publicId: string };
  ticketLink?: string;
  featured: boolean;
  isActive: boolean;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events');
      const data = await res.json();
      setEvents(data.events || []);
    } catch (error) {
      toast.error('Failed to load events');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Event deleted');
        setEvents(events.filter(e => e._id !== id));
      } else {
        toast.error('Failed to delete event');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setDeletingId(null);
    }
  };

  const toggleActive = async (event: Event) => {
    try {
      const res = await fetch(`/api/events/${event._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...event, isActive: !event.isActive }),
      });
      if (res.ok) {
        toast.success(event.isActive ? 'Event hidden' : 'Event visible');
        fetchEvents();
      }
    } catch (error) {
      toast.error('Failed to update event');
    }
  };

  const now = new Date();
  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    if (filter === 'upcoming') return eventDate >= now;
    if (filter === 'past') return eventDate < now;
    return true;
  });

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-white font-sans uppercase tracking-wide">Events</h1>
          <p className="text-text-muted font-serif mt-1">Manage your upcoming events</p>
        </div>
        <Link
          href="/admin/events/new"
          className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-luxury-black px-4 py-2 font-sans uppercase tracking-wide text-sm transition-colors"
        >
          <Plus size={18} />
          Add Event
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(['all', 'upcoming', 'past'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-lg font-sans text-sm capitalize transition-colors ${
              filter === tab
                ? 'bg-gold text-luxury-black'
                : 'bg-luxury-dark text-text-muted hover:text-white border border-white/10'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full" />
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="bg-luxury-dark border border-white/10 rounded-lg p-8 text-center">
            <Calendar className="mx-auto text-text-muted mb-4" size={40} />
            <p className="text-text-muted font-serif mb-4">No events found</p>
            <Link
              href="/admin/events/new"
              className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
            >
              <Plus size={18} />
              Create your first event
            </Link>
          </div>
        ) : (
          filteredEvents.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-luxury-dark border border-white/10 rounded-lg overflow-hidden hover:border-gold/30 transition-colors"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="relative w-full md:w-48 h-40 md:h-auto bg-luxury-black flex-shrink-0">
                  {event.image?.url ? (
                    <Image
                      src={event.image.url}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Calendar className="text-text-muted" size={32} />
                    </div>
                  )}
                  {!event.isActive && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white/80 font-sans uppercase tracking-wide text-xs">
                        Hidden
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-4 md:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {event.featured && (
                          <span className="inline-flex items-center gap-1 bg-gold text-luxury-black text-xs px-2 py-0.5 rounded">
                            <Star size={10} />
                            Featured
                          </span>
                        )}
                        {new Date(event.date) < now && (
                          <span className="text-xs text-text-muted bg-white/5 px-2 py-0.5 rounded">
                            Past Event
                          </span>
                        )}
                      </div>
                      <h3 className="text-white font-sans uppercase tracking-wide text-lg">
                        {event.title}
                      </h3>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleActive(event)}
                        className="p-2 hover:bg-white/10 rounded text-text-muted hover:text-white transition-colors"
                        title={event.isActive ? 'Hide' : 'Show'}
                      >
                        {event.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <Link
                        href={`/admin/events/${event._id}`}
                        className="p-2 hover:bg-white/10 rounded text-text-muted hover:text-white transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(event._id)}
                        disabled={deletingId === event._id}
                        className="p-2 hover:bg-red-500/10 rounded text-text-muted hover:text-red-400 transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <p className="text-text-muted font-serif line-clamp-2 mt-2">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-4 text-sm">
                    <span className="flex items-center gap-1.5 text-gold">
                      <Calendar size={14} />
                      {format(new Date(event.date), 'MMM d, yyyy')}
                      {event.endDate && ` - ${format(new Date(event.endDate), 'MMM d, yyyy')}`}
                    </span>
                    <span className="flex items-center gap-1.5 text-text-muted">
                      <Clock size={14} />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1.5 text-text-muted">
                      <MapPin size={14} />
                      {event.location}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
