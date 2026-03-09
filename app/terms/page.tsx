'use client';

import { motion } from 'framer-motion';
import PageHero from '@/components/ui/PageHero';
import { fadeUpVariants, viewportSettings } from '@/lib/utils';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-luxury-black">
      <PageHero
        title="Terms & Conditions"
        subtitle="Legal"
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80"
        height="short"
      />

      <section className="section-padding bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUpVariants}
          className="section-container max-w-4xl mx-auto"
        >
          <div className="prose prose-lg max-w-none font-serif text-text-muted">
            <p className="text-sm text-text-muted mb-8">Last updated: January 2025</p>

            <h2 className="text-2xl text-luxury-black font-sans uppercase tracking-wide mt-12 mb-6">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using the Neoprime Hotels website or making a reservation, 
              you agree to be bound by these Terms and Conditions. If you do not agree to 
              these terms, please do not use our services.
            </p>

            <h2 className="text-2xl text-luxury-black font-sans uppercase tracking-wide mt-12 mb-6">
              2. Reservations
            </h2>
            <h3 className="text-xl text-luxury-black font-sans mt-8 mb-4">Booking Confirmation</h3>
            <p>
              A reservation is confirmed only when you receive a confirmation email with your 
              booking reference number. Please review all details carefully and contact us 
              immediately if any information is incorrect.
            </p>

            <h3 className="text-xl text-luxury-black font-sans mt-8 mb-4">Rate Guarantee</h3>
            <p>
              Rates are per room, per night unless otherwise stated. All rates are subject to 
              availability and may change without notice until a booking is confirmed.
            </p>

            <h2 className="text-2xl text-luxury-black font-sans uppercase tracking-wide mt-12 mb-6">
              3. Cancellation Policy
            </h2>
            <p>
              <strong className="text-luxury-black">Standard Bookings:</strong> Free cancellation up to 48 hours 
              before arrival. Cancellations within 48 hours will be charged one night's stay.
            </p>
            <p>
              <strong className="text-luxury-black">Non-Refundable Rates:</strong> As indicated at time of booking, 
              these rates cannot be cancelled, modified, or refunded.
            </p>
            <p>
              <strong className="text-luxury-black">No-Shows:</strong> Failure to arrive without notice will result 
              in the full booking amount being charged.
            </p>

            <h2 className="text-2xl text-luxury-black font-sans uppercase tracking-wide mt-12 mb-6">
              4. Check-in & Check-out
            </h2>
            <p>
              Check-in time: 3:00 PM<br />
              Check-out time: 11:00 AM
            </p>
            <p>
              Early check-in and late check-out may be available upon request, subject to 
              availability and potential additional charges.
            </p>

            <h2 className="text-2xl text-luxury-black font-sans uppercase tracking-wide mt-12 mb-6">
              5. Guest Conduct
            </h2>
            <p>Guests are expected to:</p>
            <ul>
              <li>Behave responsibly and respect other guests</li>
              <li>Not engage in illegal activities on the premises</li>
              <li>Not exceed room occupancy limits</li>
              <li>Not smoke in non-designated areas</li>
              <li>Report any damage or incidents promptly</li>
            </ul>
            <p>
              We reserve the right to refuse service or terminate a stay without refund if 
              these conditions are violated.
            </p>

            <h2 className="text-2xl text-luxury-black font-sans uppercase tracking-wide mt-12 mb-6">
              6. Liability
            </h2>
            <p>
              Neoprime Hotels is not liable for loss, theft, or damage to guest belongings. 
              We recommend using in-room safes for valuables. Our liability for any claim 
              shall not exceed the total amount paid for your reservation.
            </p>

            <h2 className="text-2xl text-luxury-black font-sans uppercase tracking-wide mt-12 mb-6">
              7. Intellectual Property
            </h2>
            <p>
              All content on this website, including text, images, logos, and design elements, 
              is the property of Neoprime Hotels and protected by copyright laws. Unauthorised 
              use is prohibited.
            </p>

            <h2 className="text-2xl text-luxury-black font-sans uppercase tracking-wide mt-12 mb-6">
              8. Modifications
            </h2>
            <p>
              We reserve the right to modify these Terms and Conditions at any time. Changes 
              will be effective immediately upon posting. Your continued use of our services 
              constitutes acceptance of any modifications.
            </p>

            <h2 className="text-2xl text-luxury-black font-sans uppercase tracking-wide mt-12 mb-6">
              9. Governing Law
            </h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with 
              the laws of England and Wales. Any disputes shall be subject to the exclusive 
              jurisdiction of the English courts.
            </p>

            <h2 className="text-2xl text-luxury-black font-sans uppercase tracking-wide mt-12 mb-6">
              10. Contact
            </h2>
            <p>
              For questions regarding these Terms and Conditions, please contact:
            </p>
            <p className="mt-4">
              <strong className="text-luxury-black font-sans">Neoprime Hotels</strong><br />
              Email: legal@neoprimehotels.com<br />
              Phone: +44 (0) 191 234 5678
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
