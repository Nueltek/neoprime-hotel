'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PublicLayout from '@/components/layouts/PublicLayout';
import PageHero from '@/components/ui/PageHero';
import CalendarPicker from '@/components/ui/CalendarPicker';
import Button from '@/components/ui/Button';
import { fadeUpVariants, staggerContainerVariants, viewportSettings } from '@/lib/utils';
import { Calendar, Clock, Users, Phone, Mail, MessageSquare } from 'lucide-react';
import { useBookingInfo, useContactInfo } from '@/components/providers/SiteSettingsProvider';

const timeSlots = [
  '12:00', '12:30', '13:00', '13:30', '14:00',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
];

const occasions = [
  'Casual Dining',
  'Business Lunch',
  'Birthday Celebration',
  'Anniversary',
  'Special Occasion',
  'Other'
];

export default function BookTablePage() {
  const booking = useBookingInfo();
  const contact = useContactInfo();
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('2');
  const [occasion, setOccasion] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [requests, setRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const phoneLink = contact.phone.replace(/\s/g, '').replace(/[()]/g, '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <PublicLayout>
      <main className="min-h-screen bg-luxury-black">
        <PageHero
          title="Table Reserved"
          subtitle="Confirmation"
          image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
          height="short"
        />
        <section className="section-padding bg-white">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUpVariants}
            className="section-container text-center max-w-2xl mx-auto"
          >
            <div className="w-20 h-20 border-2 border-gold rounded-full flex items-center justify-center mx-auto mb-8">
              <MessageSquare className="text-gold" size={32} />
            </div>
            <h2 className="text-3xl text-luxury-black font-sans uppercase tracking-wide mb-6">
              Thank You, {name}!
            </h2>
            <p className="text-text-muted font-serif text-lg mb-8">
              Your table reservation has been received. You will receive a confirmation email 
              at {email} shortly. If you don't see it, please check your spam folder.
            </p>
            <div className="bg-luxury-black/5 p-8 mb-8">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <span className="text-xs uppercase tracking-widest text-text-muted font-sans">Date</span>
                  <p className="text-luxury-black font-serif">
                    {date?.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-text-muted font-sans">Time</span>
                  <p className="text-luxury-black font-serif">{time}</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-text-muted font-sans">Party Size</span>
                  <p className="text-luxury-black font-serif">{guests} guests</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-text-muted font-sans">Occasion</span>
                  <p className="text-luxury-black font-serif">{occasion || 'Casual Dining'}</p>
                </div>
              </div>
            </div>
            <Button variant="filled" href="/">
              Return Home
            </Button>
          </motion.div>
        </section>
      </main>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
    <main className="min-h-screen bg-luxury-black">
      <PageHero
        title="Reserve a Table"
        subtitle="The Neoprime Grill"
        image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
        height="short"
      />

      <section className="section-padding bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainerVariants}
          className="section-container max-w-4xl mx-auto"
        >
          <motion.div variants={fadeUpVariants} className="text-center mb-12">
            <p className="text-text-muted font-serif text-lg">
              Join us at The Neoprime Grill for an unforgettable dining experience. 
              Reservations are recommended, especially for dinner service.
            </p>
          </motion.div>

          <motion.form variants={fadeUpVariants} onSubmit={handleSubmit} className="space-y-8">
            {/* Date, Time, Guests Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 p-6">
                <label className="block text-xs text-text-muted uppercase tracking-widest mb-3 font-sans">
                  Date *
                </label>
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-gold" />
                  <CalendarPicker
                    value={date}
                    onChange={setDate}
                    placeholder="Select date"
                    label="Reservation Date"
                  />
                </div>
              </div>

              <div className="border border-gray-200 p-6">
                <label className="block text-xs text-text-muted uppercase tracking-widest mb-3 font-sans">
                  Time *
                </label>
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-gold" />
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                    className="flex-1 text-luxury-black font-serif focus:outline-none bg-transparent"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border border-gray-200 p-6">
                <label className="block text-xs text-text-muted uppercase tracking-widest mb-3 font-sans">
                  Guests *
                </label>
                <div className="flex items-center gap-3">
                  <Users size={20} className="text-gold" />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    required
                    className="flex-1 text-luxury-black font-serif focus:outline-none bg-transparent"
                  >
                    {[1,2,3,4,5,6,7,8].map((num) => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                    <option value="9+">9+ Guests (Private Dining)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Occasion */}
            <div>
              <label className="block text-xs text-text-muted uppercase tracking-widest mb-3 font-sans">
                Occasion (Optional)
              </label>
              <div className="flex flex-wrap gap-3">
                {occasions.map((occ) => (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => setOccasion(occasion === occ ? '' : occ)}
                    className={`px-4 py-2 text-sm font-sans transition-all duration-300 ${
                      occasion === occ
                        ? 'bg-gold text-luxury-black'
                        : 'border border-gray-200 text-luxury-black hover:border-gold'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs text-text-muted uppercase tracking-widest mb-3 font-sans">
                  Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border-b border-gray-300 py-3 text-luxury-black font-serif focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block text-xs text-text-muted uppercase tracking-widest mb-3 font-sans">
                  Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border-b border-gray-300 py-3 text-luxury-black font-serif focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block text-xs text-text-muted uppercase tracking-widest mb-3 font-sans">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full border-b border-gray-300 py-3 text-luxury-black font-serif focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-xs text-text-muted uppercase tracking-widest mb-3 font-sans">
                Special Requests
              </label>
              <textarea
                value={requests}
                onChange={(e) => setRequests(e.target.value)}
                rows={3}
                placeholder="Dietary requirements, seating preferences, or any other requests..."
                className="w-full border-b border-gray-300 py-3 text-luxury-black font-serif focus:outline-none focus:border-gold resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6">
              <p className="text-text-muted text-sm font-serif">
                For parties of 9 or more, please contact us directly for private dining options.
              </p>
              <Button variant="filled" className="w-full sm:w-auto">
                {isSubmitting ? 'Reserving...' : 'Complete Reservation'}
              </Button>
            </div>
          </motion.form>
        </motion.div>
      </section>

      {/* Contact */}
      <section className="section-padding bg-luxury-dark">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUpVariants}
          className="section-container text-center"
        >
          <h2 className="text-2xl text-white font-sans uppercase tracking-wide mb-6">
            Prefer to Call?
          </h2>
          <p className="text-text-secondary font-serif mb-6">
            Our reservations team is happy to assist with your booking.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href={`tel:${phoneLink}`} className="flex items-center justify-center gap-2 text-gold hover:text-gold-light transition-colors">
              <Phone size={18} />
              <span className="font-serif">{contact.phone}</span>
            </a>
            <a href={`mailto:${booking.diningEmail}`} className="flex items-center justify-center gap-2 text-gold hover:text-gold-light transition-colors">
              <Mail size={18} />
              <span className="font-serif">{booking.diningEmail}</span>
            </a>
          </div>
        </motion.div>
      </section>
    </main>
    </PublicLayout>
  );
}
