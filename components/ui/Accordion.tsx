'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export default function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenItems((prev) =>
        prev.includes(index) ? [] : [index]
      );
    }
  };

  const isOpen = (index: number) => openItems.includes(index);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            'border transition-colors duration-300',
            isOpen(index) ? 'border-gold' : 'border-white/20'
          )}
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full flex items-center justify-between p-6 text-left"
          >
            <span className={cn(
              'font-sans text-lg tracking-wide transition-colors duration-300',
              isOpen(index) ? 'text-gold' : 'text-white'
            )}>
              {item.question}
            </span>
            <span className={cn(
              'flex-shrink-0 ml-4 transition-colors duration-300',
              isOpen(index) ? 'text-gold' : 'text-white'
            )}>
              {isOpen(index) ? <Minus size={20} /> : <Plus size={20} />}
            </span>
          </button>
          
          <AnimatePresence>
            {isOpen(index) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <div className="w-12 h-px bg-gold/30 mb-4" />
                  <p className="text-text-secondary font-serif leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
