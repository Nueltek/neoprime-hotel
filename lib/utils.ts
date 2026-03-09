import { Variants } from "framer-motion";
import { clsx, type ClassValue } from "clsx";

// Utility for merging class names
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Framer Motion animation variants as per spec

// Scroll reveal - opacity 0→1, y 40→0, duration 0.6
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Fade in without Y movement
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Scale up variant
export const scaleUpVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Stagger container for child animations
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Hero sequential fade in
export const heroStaggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

// Hero child elements
export const heroChildVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Image hover - scale 1→1.05, duration 0.4
export const imageHoverVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// Card hover effect
export const cardHoverVariants: Variants = {
  initial: { y: 0 },
  hover: {
    y: -8,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Slide in from left
export const slideInLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Slide in from right
export const slideInRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Viewport settings for scroll animations
export const viewportSettings = {
  once: true,
  margin: "-100px",
};

// Unsplash image URLs for hotel imagery
export const images = {
  hero: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80",
  heroAlt:
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80",

  // Feature cards
  sleepInStyle:
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",

  dineAtGrill:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
  drinksAtBar:
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",

  // Rooms
  roomLuxury:
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
  roomSuite:
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80",

  // Dining
  dining1:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
  dining2:
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
  restaurant:
    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1200&q=80",

  // Location/Building
  building:
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80",
  exterior:
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80",

  // Events
  meetings:
    "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&q=80",
  privateDining:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",

  // Offers
  offer1:
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
  offer2:
    "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80",
  offer3:
    "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80",

  // Gallery
  gallery1:
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80",
  gallery2:
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&q=80",
  gallery3:
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
  gallery4:
    "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",

  // CTA sections
  stayAt:
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
  dineAt:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
};
