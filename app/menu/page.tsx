'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import PublicLayout from '@/components/layouts/PublicLayout';
import PageHero from '@/components/ui/PageHero';
import { useBookingPhone } from '@/components/providers/SiteSettingsProvider';

interface MenuItem {
  name: string;
  description: string;
  price: string;
  tags?: string[];
}

interface MenuSection {
  title: string;
  subtitle?: string;
  items: MenuItem[];
}

const breakfastMenu: MenuSection = {
  title: 'Breakfast',
  subtitle: 'Served 7:00am - 10:30am',
  items: [
    { name: 'Full English Breakfast', description: 'Free-range eggs, Cumberland sausage, smoked bacon, grilled tomato, mushrooms, baked beans, hash brown, toast', price: '£18', tags: ['Signature'] },
    { name: 'Eggs Benedict', description: 'Poached eggs, honey-roast ham, hollandaise sauce on toasted English muffin', price: '£14' },
    { name: 'Eggs Royale', description: 'Poached eggs, Scottish smoked salmon, hollandaise sauce on toasted English muffin', price: '£16' },
    { name: 'Avocado Toast', description: 'Smashed avocado, poached eggs, chilli flakes, lime, sourdough', price: '£13', tags: ['V'] },
    { name: 'Buttermilk Pancakes', description: 'Maple syrup, crispy bacon, fresh berries, whipped cream', price: '£12' },
    { name: 'Smoked Salmon & Scrambled Eggs', description: 'Scottish smoked salmon, chive scrambled eggs, toasted brioche', price: '£15' },
    { name: 'Continental Selection', description: 'Freshly baked pastries, artisan breads, preserves, fresh fruit, yogurt', price: '£14' },
    { name: 'Granola Bowl', description: 'House-made granola, Greek yogurt, seasonal fruits, honey', price: '£10', tags: ['V'] },
  ]
};

const startersMenu: MenuSection = {
  title: 'Starters',
  subtitle: 'To Begin',
  items: [
    { name: 'Soup of the Day', description: 'Served with warm artisan bread and butter', price: '£8', tags: ['V'] },
    { name: 'Seared Scallops', description: 'Pan-seared king scallops, black pudding crumb, pea purée, crispy pancetta', price: '£16', tags: ['Signature'] },
    { name: 'Beef Carpaccio', description: 'Thinly sliced beef fillet, rocket, parmesan shavings, truffle oil', price: '£14' },
    { name: 'Prawn Cocktail', description: 'Atlantic prawns, Marie Rose sauce, baby gem, brown bread', price: '£12' },
    { name: 'Duck Liver Parfait', description: 'Orange gel, toasted brioche, cornichons', price: '£13' },
    { name: 'Burrata', description: 'Fresh burrata, heritage tomatoes, basil pesto, aged balsamic', price: '£14', tags: ['V'] },
  ]
};

const mainsMenu: MenuSection = {
  title: 'Main Courses',
  subtitle: 'The Heart of the Meal',
  items: [
    { name: 'Fillet Steak', description: '8oz prime beef fillet, triple-cooked chips, peppercorn sauce, roasted vine tomatoes', price: '£38', tags: ['Signature'] },
    { name: 'Ribeye Steak', description: '10oz 35-day aged ribeye, garlic butter, hand-cut chips, watercress', price: '£34' },
    { name: 'Pan-Roasted Sea Bass', description: 'Crushed new potatoes, samphire, lemon butter sauce', price: '£28' },
    { name: 'Lamb Rump', description: 'Herb-crusted lamb rump, dauphinoise potatoes, seasonal vegetables, red wine jus', price: '£32' },
    { name: 'Duck Breast', description: 'Pan-seared duck breast, fondant potato, cherry reduction, braised red cabbage', price: '£29' },
    { name: 'Lobster Thermidor', description: 'Half lobster, thermidor sauce, triple-cooked chips, dressed salad', price: '£45', tags: ['Signature'] },
    { name: 'Chicken Supreme', description: 'Free-range chicken, wild mushroom risotto, truffle oil, parmesan crisp', price: '£26' },
    { name: 'Wild Mushroom Risotto', description: 'Arborio rice, mixed wild mushrooms, truffle oil, aged parmesan', price: '£22', tags: ['V'] },
    { name: 'Fish & Chips', description: 'Beer-battered haddock, mushy peas, tartare sauce, hand-cut chips', price: '£19' },
  ]
};

const dessertsMenu: MenuSection = {
  title: 'Desserts',
  subtitle: 'Sweet Endings',
  items: [
    { name: 'Sticky Toffee Pudding', description: 'Warm date sponge, butterscotch sauce, vanilla ice cream', price: '£9', tags: ['Signature'] },
    { name: 'Dark Chocolate Fondant', description: 'Molten chocolate centre, salted caramel ice cream', price: '£10' },
    { name: 'Crème Brûlée', description: 'Classic vanilla crème brûlée, shortbread', price: '£8' },
    { name: 'Lemon Tart', description: 'Citrus tart, raspberry sorbet, fresh berries', price: '£9' },
    { name: 'Cheesecake of the Day', description: 'Ask your server for today\'s flavour', price: '£8' },
    { name: 'British Cheese Selection', description: 'Selection of artisan British cheeses, crackers, chutney, grapes', price: '£14' },
    { name: 'Affogato', description: 'Vanilla gelato, shot of espresso, amaretti biscuit', price: '£7' },
  ]
};

const drinksMenu: MenuSection = {
  title: 'Signature Cocktails',
  subtitle: 'From Our Bar',
  items: [
    { name: 'Neoprime Negroni', description: 'House-infused gin, Campari, sweet vermouth, orange twist', price: '£12', tags: ['Signature'] },
    { name: 'Newcastle Mule', description: 'Local vodka, ginger beer, lime, mint', price: '£11' },
    { name: 'Quayside Spritz', description: 'Aperol, prosecco, soda, orange slice', price: '£10' },
    { name: 'Espresso Martini', description: 'Vodka, Kahlúa, fresh espresso, coffee beans', price: '£12' },
    { name: 'Old Fashioned', description: 'Bourbon, Angostura bitters, sugar, orange zest', price: '£13' },
    { name: 'French 75', description: 'Gin, lemon juice, sugar, champagne', price: '£14' },
  ]
};

const allMenus = [breakfastMenu, startersMenu, mainsMenu, dessertsMenu, drinksMenu];

export default function MenuPage() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('Breakfast');
  const bookingPhone = useBookingPhone();
  const phoneLink = `tel:${bookingPhone.replace(/\s/g, '').replace(/[()]/g, '')}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentMenu = allMenus.find(m => m.title === activeSection) || breakfastMenu;

  return (
    <PublicLayout>
      <main className="min-h-screen bg-luxury-black">
        <PageHero
          title="Menus"
          subtitle="The Neoprime Grill"
          image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
          height="medium"
        />

        {/* Menu Navigation */}
        <section className="bg-luxury-dark border-b border-white/10 sticky top-0 z-30">
          <div className="section-container">
            <div className="flex overflow-x-auto py-4 gap-2 scrollbar-hide">
              {allMenus.map((menu) => (
                <button
                  key={menu.title}
                  onClick={() => setActiveSection(menu.title)}
                  className={`px-6 py-3 text-sm font-sans uppercase tracking-widest whitespace-nowrap transition-all ${
                    activeSection === menu.title
                      ? 'bg-gold text-luxury-black'
                      : 'text-text-muted hover:text-white border border-white/20 hover:border-gold'
                  }`}
                >
                  {menu.title}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="section-padding bg-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="section-container text-center"
          >
            <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-sans">
              Culinary Excellence
            </p>
            <h2 className="text-section text-luxury-black font-sans font-light uppercase tracking-wide mb-6">
              A Taste of Neoprime
            </h2>
            <p className="text-text-muted font-serif text-lg max-w-3xl mx-auto leading-relaxed">
              Our menus celebrate the finest seasonal ingredients, sourced locally where possible and prepared with passion by our expert culinary team. From hearty breakfasts to exquisite evening dining, every dish tells a story.
            </p>
          </motion.div>
        </section>

        {/* Menu Section */}
        <section className="section-padding bg-luxury-black">
          <div className="section-container">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Section Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl text-white font-sans font-light uppercase tracking-wide mb-2">
                  {currentMenu.title}
                </h2>
                {currentMenu.subtitle && (
                  <p className="text-gold font-serif italic">{currentMenu.subtitle}</p>
                )}
                <div className="w-16 h-px bg-gold mx-auto mt-6" />
              </div>

              {/* Menu Items */}
              <div className="max-w-3xl mx-auto">
                {currentMenu.items.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.05 * index }}
                    className="py-6 border-b border-white/10 last:border-0"
                  >
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-white font-sans text-lg">{item.name}</h3>
                        {item.tags?.map((tag) => (
                          <span
                            key={tag}
                            className={`text-xs px-2 py-0.5 font-sans uppercase tracking-wide ${
                              tag === 'Signature'
                                ? 'bg-gold/20 text-gold'
                                : tag === 'V'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-white/10 text-text-muted'
                            }`}
                          >
                            {tag === 'V' ? 'Vegetarian' : tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-gold font-sans text-lg flex-shrink-0">{item.price}</span>
                    </div>
                    <p className="text-text-muted font-serif text-sm leading-relaxed pr-16">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Dietary Info */}
        <section className="py-12 bg-luxury-dark border-t border-white/10">
          <div className="section-container">
            <div className="flex flex-wrap justify-center gap-8 text-sm text-text-muted font-serif">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-gold/20 rounded-full" />
                <span>Signature Dish</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500/20 rounded-full" />
                <span>Vegetarian</span>
              </div>
              <span>Please inform your server of any allergies or dietary requirements</span>
            </div>
          </div>
        </section>

        {/* Wine List CTA */}
        <section className="section-padding bg-luxury-black">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="section-container"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=80"
                  alt="Wine Selection"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4 font-sans">
                  The Cellar
                </p>
                <h2 className="text-3xl md:text-4xl text-white font-sans font-light uppercase tracking-wide mb-6">
                  Wine List
                </h2>
                <div className="w-12 h-px bg-gold mb-6" />
                <p className="text-text-secondary font-serif text-lg leading-relaxed mb-8">
                  Our sommelier has curated an exceptional wine list featuring over 200 labels from renowned vineyards around the world. From crisp champagnes to full-bodied reds, we have the perfect pairing for every dish.
                </p>
                <a
                  href={phoneLink}
                  className="inline-block border border-gold text-gold hover:bg-gold hover:text-luxury-black px-6 py-3 font-serif uppercase tracking-widest text-sm transition-colors"
                >
                  Reserve a Table
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Reservation CTA */}
        <section className="section-padding bg-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="section-container text-center"
          >
            <h2 className="text-section text-luxury-black font-sans font-light uppercase tracking-wide mb-6">
              Book Your Table
            </h2>
            <p className="text-text-muted font-serif text-lg max-w-2xl mx-auto mb-8">
              Experience the finest dining in Newcastle. For reservations, private dining enquiries, or to discuss dietary requirements, please contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={phoneLink}
                className="inline-block bg-gold hover:bg-gold-dark text-luxury-black px-8 py-4 font-sans uppercase tracking-widest text-sm transition-colors"
              >
                Call to Reserve
              </a>
              <Link
                href="/book-table"
                className="inline-block border border-luxury-black text-luxury-black hover:bg-luxury-black hover:text-white px-8 py-4 font-sans uppercase tracking-widest text-sm transition-colors"
              >
                Book Online
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </PublicLayout>
  );
}
