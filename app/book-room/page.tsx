'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import PublicLayout from '@/components/layouts/PublicLayout';
import PageHero from '@/components/ui/PageHero';
import CalendarPicker from '@/components/ui/CalendarPicker';
import Button from '@/components/ui/Button';
import { fadeUpVariants, staggerContainerVariants, viewportSettings } from '@/lib/utils';
import { Calendar, Users, Home, Check, Phone, Mail } from 'lucide-react';
import { useBookingInfo, useContactInfo } from '@/components/providers/SiteSettingsProvider';

const roomTypes = [
  { id: 'cosy', name: 'Cosy Room', price: 189, description: '18-22 m² · King or Twin' },
  { id: 'classic', name: 'Classic Room', price: 249, description: '25-30 m² · King' },
  { id: 'deluxe', name: 'Deluxe Room', price: 329, description: '32-38 m² · Super King' },
  { id: 'suite', name: 'Neoprime Suite', price: 489, description: '50-65 m² · Super King' }
];

const benefits = [
  'Best rate guarantee',
  'Complimentary WiFi',
  'Flexible cancellation',
  'Earn loyalty points',
  'Room preferences honoured',
  'Direct hotel support'
];

export default function BookRoomPage() {
  const booking = useBookingInfo();
  const contact = useContactInfo();
  const [arrivalDate, setArrivalDate] = useState<Date | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState('2');
  const [rooms, setRooms] = useState('1');
  const [selectedRoom, setSelectedRoom] = useState('classic');
  const [step, setStep] = useState(1);

  const minDepartureDate = arrivalDate 
    ? new Date(arrivalDate.getTime() + 24 * 60 * 60 * 1000) 
    : new Date(Date.now() + 24 * 60 * 60 * 1000);

  const selectedRoomData = roomTypes.find(r => r.id === selectedRoom);
  const nights = arrivalDate && departureDate 
    ? Math.ceil((departureDate.getTime() - arrivalDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const totalPrice = selectedRoomData ? selectedRoomData.price * nights * parseInt(rooms) : 0;
  
  const phoneLink = (booking.bookingPhone || contact.phone).replace(/\s/g, '').replace(/[()]/g, '');

  return (
    <PublicLayout>
    <main className="min-h-screen bg-luxury-black">
      <PageHero
        title="Book Your Stay"
        subtitle="Reservations"
        image="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1920&q=80"
        height="short"
      />

      <section className="section-padding bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainerVariants}
          className="section-container"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Booking Form */}
            <motion.div variants={fadeUpVariants} className="lg:col-span-2">
              <h2 className="text-2xl text-luxury-black font-sans uppercase tracking-wide mb-8">
                Select Your Dates
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Arrival */}
                <div className="border border-gray-200 p-6">
                  <label className="block text-xs text-text-muted uppercase tracking-widest mb-3 font-sans">
                    Arrival Date
                  </label>
                  <div className="flex items-center gap-3">
                    <Calendar size={20} className="text-gold" />
                    <CalendarPicker
                      value={arrivalDate}
                      onChange={(date) => {
                        setArrivalDate(date);
                        if (departureDate && departureDate <= date) {
                          setDepartureDate(null);
                        }
                      }}
                      placeholder="Select arrival date"
                      label="Arrival"
                    />
                  </div>
                </div>

                {/* Departure */}
                <div className="border border-gray-200 p-6">
                  <label className="block text-xs text-text-muted uppercase tracking-widest mb-3 font-sans">
                    Departure Date
                  </label>
                  <div className="flex items-center gap-3">
                    <Calendar size={20} className="text-gold" />
                    <CalendarPicker
                      value={departureDate}
                      onChange={setDepartureDate}
                      minDate={minDepartureDate}
                      placeholder="Select departure date"
                      label="Departure"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="border border-gray-200 p-6">
                  <label className="block text-xs text-text-muted uppercase tracking-widest mb-3 font-sans">
                    Guests
                  </label>
                  <div className="flex items-center gap-3">
                    <Users size={20} className="text-gold" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="flex-1 text-luxury-black font-serif focus:outline-none bg-transparent"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                    </select>
                  </div>
                </div>

                {/* Rooms */}
                <div className="border border-gray-200 p-6">
                  <label className="block text-xs text-text-muted uppercase tracking-widest mb-3 font-sans">
                    Rooms
                  </label>
                  <div className="flex items-center gap-3">
                    <Home size={20} className="text-gold" />
                    <select
                      value={rooms}
                      onChange={(e) => setRooms(e.target.value)}
                      className="flex-1 text-luxury-black font-serif focus:outline-none bg-transparent"
                    >
                      <option value="1">1 Room</option>
                      <option value="2">2 Rooms</option>
                      <option value="3">3 Rooms</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Room Selection */}
              <h3 className="text-xl text-luxury-black font-sans uppercase tracking-wide mb-6">
                Select Room Type
              </h3>

              <div className="space-y-4 mb-8">
                {roomTypes.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoom(room.id)}
                    className={`border p-6 cursor-pointer transition-all duration-300 ${
                      selectedRoom === room.id
                        ? 'border-gold bg-gold/5'
                        : 'border-gray-200 hover:border-gold/50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-luxury-black font-sans uppercase tracking-wide mb-1">
                          {room.name}
                        </h4>
                        <p className="text-text-muted font-serif text-sm">{room.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-gold font-sans text-xl">£{room.price}</span>
                        <span className="text-text-muted font-serif text-sm block">per night</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                variant="filled" 
                className="w-full md:w-auto"
                href={arrivalDate && departureDate ? '/checkout' : '#'}
              >
                {arrivalDate && departureDate ? 'Continue to Checkout' : 'Select Dates to Continue'}
              </Button>
            </motion.div>

            {/* Summary Sidebar */}
            <motion.div variants={fadeUpVariants}>
              <div className="bg-luxury-black p-8 sticky top-40">
                <h3 className="text-gold font-sans uppercase tracking-wide mb-6">
                  Booking Summary
                </h3>

                {arrivalDate && departureDate ? (
                  <>
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-white font-serif">
                        <span>Check-in</span>
                        <span>{arrivalDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                      <div className="flex justify-between text-white font-serif">
                        <span>Check-out</span>
                        <span>{departureDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                      <div className="flex justify-between text-white font-serif">
                        <span>Nights</span>
                        <span>{nights}</span>
                      </div>
                      <div className="flex justify-between text-white font-serif">
                        <span>Room</span>
                        <span>{selectedRoomData?.name}</span>
                      </div>
                      <div className="flex justify-between text-white font-serif">
                        <span>Guests</span>
                        <span>{guests}</span>
                      </div>
                    </div>

                    <div className="border-t border-white/20 pt-4">
                      <div className="flex justify-between text-white">
                        <span className="font-sans uppercase tracking-wide">Total</span>
                        <span className="text-gold text-2xl font-sans">£{totalPrice}</span>
                      </div>
                      <p className="text-text-muted text-xs font-serif mt-2">
                        Includes VAT. Additional fees may apply.
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="text-text-secondary font-serif">
                    Select your dates to see pricing.
                  </p>
                )}

                <div className="mt-8 pt-6 border-t border-white/20">
                  <h4 className="text-white font-sans uppercase tracking-wide text-sm mb-4">
                    Book Direct Benefits
                  </h4>
                  <ul className="space-y-2">
                    {benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2 text-text-secondary text-sm font-serif">
                        <Check size={14} className="text-gold" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Need Help */}
      <section className="section-padding bg-luxury-dark">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUpVariants}
          className="section-container text-center"
        >
          <h2 className="text-2xl text-white font-sans uppercase tracking-wide mb-6">
            Need Assistance?
          </h2>
          <p className="text-text-secondary font-serif mb-8 max-w-2xl mx-auto">
            Our reservations team is available to help with special requests, 
            group bookings, or any questions about your stay.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href={`tel:${phoneLink}`} className="flex items-center justify-center gap-2 text-gold hover:text-gold-light transition-colors">
              <Phone size={18} />
              <span className="font-serif">{booking.bookingPhone || contact.phone}</span>
            </a>
            <a href={`mailto:${booking.reservationsEmail}`} className="flex items-center justify-center gap-2 text-gold hover:text-gold-light transition-colors">
              <Mail size={18} />
              <span className="font-serif">{booking.reservationsEmail}</span>
            </a>
          </div>
        </motion.div>
      </section>
    </main>
    </PublicLayout>
  );
}
