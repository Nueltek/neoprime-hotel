'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PublicLayout from '@/components/layouts/PublicLayout';
import PageHero from '@/components/ui/PageHero';
import Button from '@/components/ui/Button';
import { fadeUpVariants, staggerContainerVariants, viewportSettings } from '@/lib/utils';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import { useContactInfo, useBookingInfo } from '@/components/providers/SiteSettingsProvider';

export default function ContactPage() {
  const contact = useContactInfo();
  const booking = useBookingInfo();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Dynamic departments based on settings
  const departments = [
    {
      name: 'Reservations',
      email: booking.reservationsEmail || 'reservations@neoprimehotels.com',
      phone: booking.bookingPhone || contact.phone,
      description: 'For room bookings and accommodation enquiries'
    },
    {
      name: 'Restaurant',
      email: booking.diningEmail || 'dining@neoprimehotels.com',
      phone: contact.phone,
      description: 'For table reservations and dining enquiries'
    },
    {
      name: 'Events',
      email: booking.eventsEmail || 'events@neoprimehotels.com',
      phone: contact.phone,
      description: 'For meetings, weddings, and private events'
    },
    {
      name: 'General',
      email: contact.email || 'hello@neoprimehotels.com',
      phone: contact.phone,
      description: 'For all other enquiries'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const phoneLink = contact.phone.replace(/\s/g, '').replace(/[()]/g, '');

  return (
    <PublicLayout>
      <main className="min-h-screen bg-luxury-black">
        <PageHero
          title="Contact Us"
          subtitle="Get in Touch"
          image="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&q=80"
          height="short"
        />

        {/* Contact Info */}
        <section className="section-padding bg-white">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainerVariants}
            className="section-container"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Address */}
              <motion.div variants={fadeUpVariants} className="text-center">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="text-gold" size={28} />
                </div>
                <h3 className="text-lg font-sans text-luxury-black uppercase tracking-wide mb-4">
                  Location
                </h3>
                <p className="text-text-muted font-serif">
                  {contact.address || '1 Neoprime Square, Newcastle upon Tyne, NE1 4AD, United Kingdom'}
                </p>
              </motion.div>

              {/* Phone */}
              <motion.div variants={fadeUpVariants} className="text-center">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="text-gold" size={28} />
                </div>
                <h3 className="text-lg font-sans text-luxury-black uppercase tracking-wide mb-4">
                  Phone
                </h3>
                <a 
                  href={`tel:${phoneLink}`}
                  className="text-text-muted font-serif hover:text-gold transition-colors"
                >
                  {contact.phone}
                </a>
              </motion.div>

              {/* Email */}
              <motion.div variants={fadeUpVariants} className="text-center">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="text-gold" size={28} />
                </div>
                <h3 className="text-lg font-sans text-luxury-black uppercase tracking-wide mb-4">
                  Email
                </h3>
                <a 
                  href={`mailto:${contact.email}`}
                  className="text-text-muted font-serif hover:text-gold transition-colors"
                >
                  {contact.email}
                </a>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Contact Form & Info */}
        <section className="section-padding bg-luxury-black">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainerVariants}
            className="section-container"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Form */}
              <motion.div variants={fadeUpVariants}>
                <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-sans">
                  Send a Message
                </p>
                <h2 className="text-section text-white font-sans font-light uppercase tracking-wide mb-8">
                  We'd Love to Hear From You
                </h2>

                {isSubmitted ? (
                  <div className="bg-gold/10 border border-gold/30 p-8 text-center">
                    <MessageSquare className="text-gold mx-auto mb-4" size={40} />
                    <h3 className="text-white text-xl font-sans mb-2">Thank You!</h3>
                    <p className="text-text-muted font-serif">
                      Your message has been received. We'll be in touch soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="w-full bg-transparent border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        required
                        className="w-full bg-transparent border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone (optional)"
                        className="w-full bg-transparent border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                      />
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                      >
                        <option value="">Select Subject</option>
                        <option value="reservations">Room Reservations</option>
                        <option value="dining">Dining Enquiry</option>
                        <option value="events">Events & Meetings</option>
                        <option value="general">General Enquiry</option>
                      </select>
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                      rows={5}
                      required
                      className="w-full bg-transparent border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gold text-luxury-black py-4 font-sans uppercase tracking-wider hover:bg-white transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </motion.div>

              {/* Opening Hours & Info */}
              <motion.div variants={fadeUpVariants}>
                <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-sans">
                  Information
                </p>
                <h2 className="text-section text-white font-sans font-light uppercase tracking-wide mb-8">
                  Opening Hours
                </h2>

                <div className="space-y-6 mb-12">
                  <div className="flex items-start gap-4">
                    <Clock className="text-gold flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-white font-sans mb-2">Reception</h4>
                      <p className="text-text-muted font-serif text-sm">24 hours, 7 days a week</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="text-gold flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-white font-sans mb-2">Restaurant</h4>
                      <p className="text-text-muted font-serif text-sm">
                        Breakfast: 7:00 - 10:30<br />
                        Lunch: 12:00 - 14:30<br />
                        Dinner: 18:00 - 22:00
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="text-gold flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-white font-sans mb-2">Spa & Wellness</h4>
                      <p className="text-text-muted font-serif text-sm">Daily: 7:00 - 21:00</p>
                    </div>
                  </div>
                </div>

                <div className="w-full h-px bg-white/10 mb-8" />

                <h3 className="text-white font-sans uppercase tracking-wide mb-6">
                  Direct Contacts
                </h3>
                <div className="space-y-4">
                  {departments.map((dept) => (
                    <div key={dept.name} className="flex justify-between items-start py-3 border-b border-white/10">
                      <div>
                        <h4 className="text-white font-sans text-sm">{dept.name}</h4>
                        <p className="text-text-muted text-xs font-serif">{dept.description}</p>
                      </div>
                      <a 
                        href={`mailto:${dept.email}`}
                        className="text-gold text-sm font-sans hover:underline"
                      >
                        Email
                      </a>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>
    </PublicLayout>
  );
}
