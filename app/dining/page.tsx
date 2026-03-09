"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import PublicLayout from "@/components/layouts/PublicLayout";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import {
  fadeUpVariants,
  staggerContainerVariants,
  viewportSettings,
} from "@/lib/utils";
import { Clock, Phone, MapPin } from "lucide-react";

const menuCategories = [
  {
    name: "Breakfast",
    description:
      "Start your day with our carefully crafted breakfast menu, featuring locally sourced ingredients and classic favorites.",
    items: [
      "Full English Breakfast",
      "Eggs Benedict with Smoked Salmon",
      "Avocado Toast with Poached Eggs",
      "Belgian Waffles with Berries",
      "Granola with Greek Yogurt",
    ],
  },
  {
    name: "Lunch",
    description:
      "Light yet satisfying dishes perfect for a midday meal, from fresh salads to gourmet sandwiches.",
    items: [
      "Caesar Salad with Grilled Chicken",
      "Club Sandwich",
      "Fish & Chips",
      "Wagyu Beef Burger",
      "Seasonal Soup",
    ],
  },
  {
    name: "Dinner",
    description:
      "An exquisite evening dining experience featuring prime cuts, fresh seafood, and seasonal specialties.",
    items: [
      "Dry-Aged Ribeye Steak",
      "Pan-Seared Sea Bass",
      "Lamb Rack with Rosemary",
      "Lobster Thermidor",
      "Wild Mushroom Risotto",
    ],
  },
];

const drinks = [
  {
    category: "Cocktails",
    items: [
      "Neoprime Martini",
      "Old Fashioned",
      "Espresso Martini",
      "Champagne Cocktail",
    ],
  },
  {
    category: "Wines",
    items: [
      "Over 200 labels from renowned vineyards",
      "Sommelier recommendations",
      "Wine pairing available",
    ],
  },
  {
    category: "Spirits",
    items: [
      "Premium whisky collection",
      "Rare cognacs",
      "Artisan gins",
      "Craft vodkas",
    ],
  },
];

export default function DiningPage() {
  return (
    <PublicLayout>
      <main className="min-h-screen bg-luxury-black">
        <PageHero
          title="Drink & Dine"
          subtitle="Culinary Excellence"
          image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
          height="medium"
        />

        {/* Introduction */}
        <section className="section-padding bg-white">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainerVariants}
            className="section-container"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeUpVariants}>
                <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-sans">
                  The Neoprime Grill
                </p>
                <h2 className="text-section text-luxury-black font-sans font-light uppercase tracking-wide mb-6">
                  Where Flavour Meets Finesse
                </h2>
                <div className="w-16 h-px bg-gold mb-6" />
                <p className="text-text-muted font-serif text-lg leading-relaxed mb-6">
                  Step into The Neoprime Grill and discover a world where
                  culinary artistry meets warm hospitality. Our award-winning
                  chefs craft each dish with passion, using only the finest
                  seasonal ingredients sourced from trusted local suppliers.
                </p>
                <p className="text-text-muted font-serif text-lg leading-relaxed mb-8">
                  From perfectly aged steaks to fresh seafood, every plate tells
                  a story of quality and dedication. Complement your meal with
                  selections from our extensive wine cellar, curated by our
                  expert sommelier.
                </p>

                {/* Opening Hours */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-luxury-black">
                    <Clock size={18} className="text-gold" />
                    <span className="font-serif">
                      Breakfast: 7:00 AM - 10:30 AM
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-luxury-black">
                    <Clock size={18} className="text-gold" />
                    <span className="font-serif">
                      Lunch: 12:00 PM - 2:30 PM
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-luxury-black">
                    <Clock size={18} className="text-gold" />
                    <span className="font-serif">
                      Dinner: 6:00 PM - 10:00 PM
                    </span>
                  </div>
                </div>

                <Button variant="outline" href="/book-table">
                  Reserve a Table
                </Button>
              </motion.div>

              <motion.div
                variants={fadeUpVariants}
                className="relative aspect-[4/5] overflow-hidden"
              >
                <Image
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80"
                  alt="The Neoprime Grill Interior"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Menu Highlights */}
        <section className="section-padding bg-luxury-black">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainerVariants}
            className="section-container"
          >
            <motion.div variants={fadeUpVariants} className="text-center mb-16">
              <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-sans">
                Our Menus
              </p>
              <h2 className="text-section text-white font-sans font-light uppercase tracking-wide">
                Culinary Highlights
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {menuCategories.map((category) => (
                <motion.div
                  key={category.name}
                  variants={fadeUpVariants}
                  className="bg-luxury-dark p-8"
                >
                  <h3 className="text-gold text-xl font-sans uppercase tracking-wide mb-4">
                    {category.name}
                  </h3>
                  <p className="text-text-secondary font-serif text-sm mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="w-12 h-px bg-gold/30 mb-6" />
                  <ul className="space-y-3">
                    {category.items.map((item) => (
                      <li
                        key={item}
                        className="text-white font-serif flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-gold rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUpVariants} className="text-center mt-12">
              <Button variant="outline" href="/menu">
                View Full Menus
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* The Bar */}
        <section className="section-padding bg-luxury-dark" id="bar">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainerVariants}
            className="section-container"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                variants={fadeUpVariants}
                className="relative aspect-[4/3] overflow-hidden lg:order-2"
              >
                <Image
                  src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80"
                  alt="The Bar"
                  fill
                  className="object-cover"
                />
              </motion.div>

              <motion.div variants={fadeUpVariants} className="lg:order-1">
                <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-sans">
                  The Bar
                </p>
                <h2 className="text-section text-white font-sans font-light uppercase tracking-wide mb-6">
                  Sophisticated Spirits
                </h2>
                <div className="w-16 h-px bg-gold mb-6" />
                <p className="text-text-secondary font-serif text-lg leading-relaxed mb-8">
                  Whether you're settling in for pre-dinner drinks or winding
                  down after an eventful day, The Bar offers the perfect
                  setting. Our skilled mixologists craft innovative cocktails
                  alongside timeless classics, while our carefully curated
                  selection of wines and spirits caters to every palate.
                </p>

                <div className="space-y-6 mb-8">
                  {drinks.map((drink) => (
                    <div key={drink.category}>
                      <h4 className="text-gold font-sans uppercase tracking-wide mb-2">
                        {drink.category}
                      </h4>
                      <p className="text-text-secondary font-serif text-sm">
                        {drink.items.join(" · ")}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-white mb-8">
                  <Clock size={18} className="text-gold" />
                  <span className="font-serif">Open 11:00 AM - Late</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Private Dining */}
        <section className="section-padding bg-luxury-black">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUpVariants}
            className="section-container"
          >
            <div className="relative aspect-[1/1] md:aspect-[21/9] overflow-hidden mb-12">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80"
                alt="Private Dining"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-luxury-black/50" />
              <div className="absolute inset-0 flex items-center justify-center text-center">
                <div>
                  <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-sans">
                    Exclusive Experiences
                  </p>
                  <h2 className="text-4xl md:text-5xl text-white font-sans font-light uppercase tracking-wide mb-6">
                    Private Dining
                  </h2>
                  <p className="text-white/80 font-serif max-w-2xl mx-auto mb-8 px-6">
                    Host your special occasions in our elegant private dining
                    rooms. From intimate gatherings to corporate events, we
                    create bespoke experiences.
                  </p>
                  <Button variant="white" href="/private-dining">
                    Enquire Now
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-white">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUpVariants}
            className="section-container text-center"
          >
            <h2 className="text-section text-luxury-black font-sans font-light uppercase tracking-wide mb-6">
              Join Us for a Memorable Experience
            </h2>
            <p className="text-text-muted font-serif text-lg max-w-2xl mx-auto mb-8">
              Whether you're celebrating a special occasion or simply enjoying
              an evening out, we look forward to welcoming you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="filled" href="/book-table">
                Book a Table
              </Button>
              <Button variant="outline" href="/contact">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </section>
      </main>
    </PublicLayout>
  );
}
