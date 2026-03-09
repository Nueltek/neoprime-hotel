'use client';

import { motion } from 'framer-motion';
import PublicLayout from '@/components/layouts/PublicLayout';
import PageHero from '@/components/ui/PageHero';
import Accordion from '@/components/ui/Accordion';
import Button from '@/components/ui/Button';
import { fadeUpVariants, staggerContainerVariants, viewportSettings } from '@/lib/utils';

const faqCategories = [
  {
    title: 'Reservations & Booking',
    faqs: [
      {
        question: 'What is your cancellation policy?',
        answer: 'We offer free cancellation up to 48 hours before your scheduled arrival date. Cancellations made within 48 hours of arrival will incur a charge equal to one night\'s stay. For special rates and promotional offers, specific cancellation terms may apply and will be clearly stated at the time of booking.'
      },
      {
        question: 'What time is check-in and check-out?',
        answer: 'Check-in begins at 3:00 PM and check-out is at 11:00 AM. Early check-in and late check-out can be arranged subject to availability. Please contact our front desk in advance to request these services. Guests arriving before check-in time are welcome to store their luggage and enjoy our hotel facilities.'
      },
      {
        question: 'Can I request a specific room or view?',
        answer: 'While we cannot guarantee specific room numbers, we are happy to note your preferences at the time of booking. We will do our best to accommodate requests for higher floors, specific views, or particular room locations. Please include any preferences in the special requests section when booking or contact us directly.'
      },
      {
        question: 'Do you offer group booking rates?',
        answer: 'Yes, we offer special rates for group bookings of 10 rooms or more. Our events team can create a customized package including accommodation, meeting spaces, and dining options. Please contact our sales department at least 4 weeks in advance to discuss your requirements.'
      },
      {
        question: 'Is a deposit required when booking?',
        answer: 'A valid credit card is required to secure your reservation. For standard bookings, your card will not be charged until check-out unless otherwise specified. Some promotional rates or peak season bookings may require a deposit at the time of reservation.'
      }
    ]
  },
  {
    title: 'Dining & Restaurants',
    faqs: [
      {
        question: 'Do I need to make a restaurant reservation?',
        answer: 'While walk-ins are welcome subject to availability, we strongly recommend making a reservation, especially for dinner service and weekends. Reservations can be made through our website, by calling the restaurant directly, or through your guest services representative if you are staying with us.'
      },
      {
        question: 'What are the restaurant opening hours?',
        answer: 'The Neoprime Grill is open for breakfast from 7:00 AM to 10:30 AM, lunch from 12:00 PM to 2:30 PM, and dinner from 6:00 PM to 10:00 PM. The Bar is open from 11:00 AM until late. Room service is available 24 hours a day for hotel guests.'
      },
      {
        question: 'Can you accommodate dietary requirements?',
        answer: 'Absolutely. Our chefs are experienced in catering to a wide range of dietary requirements including vegetarian, vegan, gluten-free, dairy-free, and various allergies. Please inform us of any dietary needs when making your reservation or speak with your server upon arrival.'
      },
      {
        question: 'Is there a dress code for the restaurant?',
        answer: 'We maintain a smart casual dress code in our restaurant and bar areas. We kindly ask guests to avoid athletic wear, beachwear, and flip-flops in our dining spaces. For evening dining, we suggest smart attire to complement the elegant atmosphere.'
      }
    ]
  },
  {
    title: 'Hotel Services & Facilities',
    faqs: [
      {
        question: 'Is parking available at the hotel?',
        answer: 'Yes, we offer both self-parking and valet parking services. Self-parking is available at £25 per day, while valet parking is £35 per day. Electric vehicle charging stations are available on a first-come, first-served basis at no additional charge for parking guests.'
      },
      {
        question: 'Do you have a gym or fitness facilities?',
        answer: 'Our 24-hour fitness center is equipped with state-of-the-art cardio machines, free weights, and resistance equipment. Complimentary fresh towels, water, and fruit are provided. Personal training sessions can be arranged through our concierge for an additional fee.'
      },
      {
        question: 'Is WiFi available throughout the hotel?',
        answer: 'Complimentary high-speed WiFi is available throughout the hotel, including all guest rooms, public areas, and meeting spaces. No password is required – simply connect to the "Neoprime Guest" network and accept the terms of service.'
      },
      {
        question: 'Do you offer laundry and dry cleaning services?',
        answer: 'Yes, we offer same-day laundry and dry cleaning services when items are submitted before 9:00 AM. Express service is also available for an additional fee. Laundry bags and request forms can be found in your wardrobe, or you may contact housekeeping for assistance.'
      },
      {
        question: 'Can I arrange airport transfers?',
        answer: 'Our concierge team is happy to arrange airport transfers in luxury vehicles. Please provide your flight details at least 24 hours in advance. We offer transfers from Newcastle International Airport, with journey times of approximately 20-30 minutes depending on traffic.'
      }
    ]
  },
  {
    title: 'Accessibility & Special Needs',
    faqs: [
      {
        question: 'Are your facilities accessible?',
        answer: 'Neoprime Newcastle is committed to accessibility. We offer wheelchair-accessible rooms, accessible parking, and elevator access to all floors. Our restaurant and public areas are fully accessible. Please inform us of any specific requirements when booking so we can ensure your comfort.'
      },
      {
        question: 'Do you accommodate guests with allergies?',
        answer: 'We take allergies very seriously. Please inform us of any allergies when making your reservation and remind your server when dining. We use hypoallergenic bedding and can arrange rooms free from certain products upon request. Our housekeeping team is trained in allergy-aware cleaning protocols.'
      },
      {
        question: 'Are assistance animals permitted?',
        answer: 'Service animals are welcome throughout our hotel with no additional charge. We kindly ask that guests notify us in advance so we can ensure appropriate accommodations. Water bowls and relief areas can be arranged upon request.'
      }
    ]
  },
  {
    title: 'Policies',
    faqs: [
      {
        question: 'What is your pet policy?',
        answer: 'We welcome well-behaved dogs in designated pet-friendly rooms for a supplemental fee of £30 per night. This includes a dog bed, bowls, and treats upon arrival. Dogs must be kept on a lead in public areas and are not permitted in the restaurant, though our bar terrace is dog-friendly. A maximum of two dogs per room is permitted.'
      },
      {
        question: 'Is smoking permitted anywhere in the hotel?',
        answer: 'Neoprime Newcastle is a non-smoking property. Smoking, including e-cigarettes and vaping, is not permitted anywhere inside the hotel. A designated outdoor smoking area is available at the rear of the building. A cleaning fee of £250 will be charged for smoking in non-designated areas.'
      },
      {
        question: 'What is your policy on children?',
        answer: 'Children of all ages are welcome at Neoprime Newcastle. Children under 12 stay free when sharing a room with parents using existing bedding. Cots and additional beds can be arranged upon request. Our restaurant offers a children\'s menu, and babysitting services can be arranged through our concierge.'
      },
      {
        question: 'Do you have age restrictions?',
        answer: 'The primary guest making the reservation must be at least 18 years of age. Valid photo identification will be required at check-in. For bar service, guests must be 18 years or older and may be asked to provide proof of age.'
      }
    ]
  }
];

export default function FAQsPage() {
  return (
    <PublicLayout>
    <main className="min-h-screen bg-luxury-black">
      <PageHero
        title="FAQs"
        subtitle="Need Help?"
        image="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&q=80"
        height="short"
      />

      {/* Introduction */}
      <section className="section-padding bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainerVariants}
          className="section-container text-center"
        >
          <motion.p variants={fadeUpVariants} className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-sans">
            Your Questions Answered
          </motion.p>
          <motion.h2 variants={fadeUpVariants} className="text-section text-luxury-black font-sans font-light uppercase tracking-wide mb-6">
            How Can We Help?
          </motion.h2>
          <motion.p variants={fadeUpVariants} className="text-text-muted font-serif text-lg max-w-3xl mx-auto leading-relaxed">
            Find answers to the most commonly asked questions about your stay at Neoprime Newcastle. 
            If you can't find what you're looking for, our team is always happy to assist.
          </motion.p>
        </motion.div>
      </section>

      {/* FAQ Categories */}
      <section className="section-padding bg-luxury-black">
        <div className="section-container space-y-16">
          {faqCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              variants={fadeUpVariants}
            >
              <h3 className="text-2xl text-white font-sans font-light uppercase tracking-wide mb-8">
                {category.title}
              </h3>
              <Accordion items={category.faqs} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="section-padding bg-luxury-dark">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUpVariants}
          className="section-container text-center"
        >
          <h2 className="text-section text-white font-sans font-light uppercase tracking-wide mb-6">
            Still Have Questions?
          </h2>
          <p className="text-text-secondary font-serif text-lg max-w-2xl mx-auto mb-8">
            Our dedicated team is available 24/7 to assist with any enquiries. 
            Whether you're planning your stay or need assistance during your visit, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="filled" href="/contact">
              Contact Us
            </Button>
            <Button variant="outline" href="tel:+441onal234567890">
              Call Us
            </Button>
          </div>
        </motion.div>
      </section>
    </main>
    </PublicLayout>
  );
}
