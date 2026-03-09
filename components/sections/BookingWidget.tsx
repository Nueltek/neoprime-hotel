'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown } from 'lucide-react';
import CalendarPicker from '@/components/ui/CalendarPicker';
import { fadeUpVariants, viewportSettings } from '@/lib/utils';

export default function BookingWidget() {
  const [arrivalDate, setArrivalDate] = useState<Date | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState('2 Guests');
  const [rooms, setRooms] = useState('1 Room');
  const [promoCode, setPromoCode] = useState('');

  // Minimum departure date is day after arrival
  const minDepartureDate = arrivalDate 
    ? new Date(arrivalDate.getTime() + 24 * 60 * 60 * 1000) 
    : new Date(Date.now() + 24 * 60 * 60 * 1000);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      variants={fadeUpVariants}
      className="relative z-20 -mt-12 px-6 lg:px-8"
    >
      <div className="max-w-content mx-auto">
        <div className="bg-white shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6">
            {/* Arrival */}
            <div className="border-b md:border-b lg:border-b-0 lg:border-r border-gray-200 p-6">
              <label className="block text-xs text-text-muted uppercase tracking-widest mb-3 font-sans">
                Arrival
              </label>
              <div className="flex items-center justify-between">
                <CalendarPicker
                  value={arrivalDate}
                  onChange={(date) => {
                    setArrivalDate(date);
                    // Reset departure if it's before new arrival
                    if (departureDate && departureDate <= date) {
                      setDepartureDate(null);
                    }
                  }}
                  placeholder="Select date"
                  label="Arrival date"
                />
                <Calendar size={18} className="text-gold flex-shrink-0 ml-2" />
              </div>
            </div>

            {/* Departure */}
            <div className="border-b md:border-b lg:border-b-0 lg:border-r border-gray-200 p-6">
              <label className="block text-xs text-text-muted uppercase tracking-widest mb-3 font-sans">
                Departure
              </label>
              <div className="flex items-center justify-between">
                <CalendarPicker
                  value={departureDate}
                  onChange={setDepartureDate}
                  minDate={minDepartureDate}
                  placeholder="Select date"
                  label="Departure date"
                />
                <Calendar size={18} className="text-gold flex-shrink-0 ml-2" />
              </div>
            </div>

            {/* Guests */}
            <div className="border-b md:border-b lg:border-b-0 lg:border-r border-gray-200 p-6">
              <label className="block text-xs text-text-muted uppercase tracking-widest mb-3 font-sans">
                Guests
              </label>
              <div className="flex items-center justify-between">
                <select 
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full text-luxury-black font-serif text-base focus:outline-none appearance-none bg-transparent cursor-pointer"
                >
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4 Guests</option>
                  <option>5+ Guests</option>
                </select>
                <ChevronDown size={18} className="text-gold flex-shrink-0" />
              </div>
            </div>

            {/* Rooms */}
            <div className="border-b md:border-b-0 lg:border-r border-gray-200 p-6">
              <label className="block text-xs text-text-muted uppercase tracking-widest mb-3 font-sans">
                Rooms
              </label>
              <div className="flex items-center justify-between">
                <select 
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                  className="w-full text-luxury-black font-serif text-base focus:outline-none appearance-none bg-transparent cursor-pointer"
                >
                  <option>1 Room</option>
                  <option>2 Rooms</option>
                  <option>3 Rooms</option>
                  <option>4+ Rooms</option>
                </select>
                <ChevronDown size={18} className="text-gold flex-shrink-0" />
              </div>
            </div>

            {/* Promo Code */}
            <div className="border-b md:border-b-0 lg:border-r border-gray-200 p-6">
              <label className="block text-xs text-text-muted uppercase tracking-widest mb-3 font-sans">
                Promo Code
              </label>
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter code"
                className="w-full text-luxury-black font-serif text-base focus:outline-none placeholder:text-gray-400"
              />
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-6 flex items-center justify-center bg-gold hover:bg-gold-dark transition-colors duration-300 cursor-pointer"
            >
              <span className="text-luxury-black text-sm font-sans uppercase tracking-widest font-medium">
                Check Availability
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
