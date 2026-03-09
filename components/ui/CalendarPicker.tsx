'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalendarPickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
  minDate?: Date;
  placeholder?: string;
  label: string;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function CalendarPicker({
  value,
  onChange,
  minDate = new Date(),
  placeholder = 'Select date',
  label
}: CalendarPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days: (Date | null)[] = [];
    
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const days = getDaysInMonth(currentMonth);

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isDateDisabled = (date: Date | null) => {
    if (!date) return true;
    const today = new Date(minDate);
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isDateSelected = (date: Date | null) => {
    if (!date || !value) return false;
    return date.toDateString() === value.toDateString();
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    return date.toDateString() === new Date().toDateString();
  };

  const handleDateSelect = (date: Date | null) => {
    if (date && !isDateDisabled(date)) {
      onChange(date);
      setIsOpen(false);
    }
  };

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = MONTHS[date.getMonth()].substring(0, 3);
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const canGoPrevious = () => {
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    const minMonth = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    return prevMonth >= minMonth;
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Input Display */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left focus:outline-none group"
      >
        <span className={cn(
          'font-serif text-base transition-colors',
          value ? 'text-luxury-black' : 'text-gray-400'
        )}>
          {value ? formatDate(value) : placeholder}
        </span>
      </button>

      {/* Calendar Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-4 bg-white shadow-2xl border border-gray-100 z-50 w-[320px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <button
                type="button"
                onClick={goToPreviousMonth}
                disabled={!canGoPrevious()}
                className={cn(
                  'p-2 rounded-full transition-colors',
                  canGoPrevious()
                    ? 'hover:bg-gray-100 text-luxury-black'
                    : 'text-gray-300 cursor-not-allowed'
                )}
              >
                <ChevronLeft size={20} />
              </button>
              
              <span className="font-sans text-sm tracking-wide uppercase text-luxury-black">
                {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </span>
              
              <button
                type="button"
                onClick={goToNextMonth}
                className="p-2 rounded-full hover:bg-gray-100 text-luxury-black transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 border-b border-gray-100">
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="py-3 text-center text-xs font-sans uppercase tracking-wider text-text-muted"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 p-2">
              {days.map((date, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleDateSelect(date)}
                  disabled={isDateDisabled(date)}
                  className={cn(
                    'h-10 w-10 mx-auto flex items-center justify-center text-sm font-serif rounded-full transition-all duration-200',
                    !date && 'invisible',
                    date && isDateDisabled(date) && 'text-gray-300 cursor-not-allowed',
                    date && !isDateDisabled(date) && !isDateSelected(date) && 'hover:bg-gold/10 text-luxury-black',
                    date && isDateSelected(date) && 'bg-gold text-luxury-black font-medium',
                    date && isToday(date) && !isDateSelected(date) && 'ring-1 ring-gold'
                  )}
                >
                  {date?.getDate()}
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 flex justify-between items-center">
              <button
                type="button"
                onClick={() => {
                  setCurrentMonth(new Date());
                  handleDateSelect(new Date());
                }}
                className="text-xs font-sans uppercase tracking-wide text-gold hover:text-gold-dark transition-colors"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-xs font-sans uppercase tracking-wide text-text-muted hover:text-luxury-black transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
