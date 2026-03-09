'use client';

import { motion } from 'framer-motion';
import PageHero from '@/components/ui/PageHero';
import { fadeUpVariants, viewportSettings } from '@/lib/utils';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-luxury-black">
      <PageHero
        title="Privacy Policy"
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
              1. Introduction
            </h2>
            <p>
              Neoprime Hotels ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your 
              information when you visit our website, make a reservation, or stay at our hotels.
            </p>

            <h2 className="text-2xl text-luxury-black font-sans uppercase tracking-wide mt-12 mb-6">
              2. Information We Collect
            </h2>
            <h3 className="text-xl text-luxury-black font-sans mt-8 mb-4">Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide, including:</p>
            <ul>
              <li>Name, email address, and phone number</li>
              <li>Billing and payment information</li>
              <li>Travel dates and preferences</li>
              <li>Identification documents (as required by law)</li>
              <li>Dietary requirements and special requests</li>
              <li>Feedback and survey responses</li>
            </ul>

            <h3 className="text-xl text-luxury-black font-sans mt-8 mb-4">Automatically Collected Information</h3>
            <p>When you visit our website, we automatically collect certain information:</p>
            <ul>
              <li>IP address and browser type</li>
              <li>Device information</li>
              <li>Pages visited and time spent</li>
              <li>Referring website</li>
              <li>Cookies and similar technologies</li>
            </ul>

            <h2 className="text-2xl text-luxury-black font-sans uppercase tracking-wide mt-12 mb-6">
              3. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process reservations and payments</li>
              <li>Provide and personalise our services</li>
              <li>Communicate with you about your stay</li>
              <li>Send promotional materials (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
              <li>Protect against fraud and unauthorised activity</li>
            </ul>

            <h2 className="text-2xl text-luxury-black font-sans uppercase tracking-wide mt-12 mb-6">
              4. Information Sharing
            </h2>
            <p>We may share your information with:</p>
            <ul>
              <li>Service providers who assist in our operations</li>
              <li>Payment processors for transaction completion</li>
              <li>Marketing partners (with your consent)</li>
              <li>Legal authorities when required by law</li>
              <li>Affiliated Neoprime properties for service continuity</li>
            </ul>
            <p>
              We do not sell your personal information to third parties.
            </p>

            <h2 className="text-2xl text-luxury-black font-sans uppercase tracking-wide mt-12 mb-6">
              5. Cookies and Tracking
            </h2>
            <p>
              We use cookies and similar tracking technologies to enhance your browsing experience, 
              analyse website traffic, and personalise content. You can manage cookie preferences 
              through your browser settings.
            </p>

            <h2 className="text-2xl text-luxury-black font-sans uppercase tracking-wide mt-12 mb-6">
              6. Data Security
            </h2>
            <p>
              We implement appropriate technical and organisational measures to protect your 
              personal information against unauthorised access, alteration, disclosure, or destruction. 
              However, no method of transmission over the Internet is 100% secure.
            </p>

            <h2 className="text-2xl text-luxury-black font-sans uppercase tracking-wide mt-12 mb-6">
              7. Your Rights
            </h2>
            <p>Under applicable data protection laws, you have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2 className="text-2xl text-luxury-black font-sans uppercase tracking-wide mt-12 mb-6">
              8. Data Retention
            </h2>
            <p>
              We retain your personal information for as long as necessary to fulfil the purposes 
              outlined in this policy, comply with legal obligations, resolve disputes, and 
              enforce our agreements.
            </p>

            <h2 className="text-2xl text-luxury-black font-sans uppercase tracking-wide mt-12 mb-6">
              9. Children's Privacy
            </h2>
            <p>
              Our services are not directed to individuals under 16. We do not knowingly collect 
              personal information from children without parental consent.
            </p>

            <h2 className="text-2xl text-luxury-black font-sans uppercase tracking-wide mt-12 mb-6">
              10. Contact Us
            </h2>
            <p>
              For questions about this Privacy Policy or to exercise your rights, contact us at:
            </p>
            <p className="mt-4">
              <strong className="text-luxury-black font-sans">Data Protection Officer</strong><br />
              Neoprime Hotels<br />
              Email: privacy@neoprimehotels.com<br />
              Phone: +44 (0) 191 234 5678
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
