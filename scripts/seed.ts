import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || "";

// Schemas - all with relaxed validation for seed data
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ["admin", "editor"], default: "editor" },
  },
  { timestamps: true },
);

const roomSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    subtitle: String,
    description: String,
    price: { type: Number, required: true },
    size: String,
    bedType: String,
    maxGuests: { type: Number, default: 2 },
    amenities: [String],
    images: [
      {
        url: String,
        publicId: { type: String, default: "" },
        caption: String,
        type: {
          type: String,
          enum: [
            "main",
            "bedroom",
            "bathroom",
            "balcony",
            "workspace",
            "other",
          ],
          default: "other",
        },
      },
    ],
    featured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const offerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    subtitle: String,
    description: String,
    price: String,
    validity: String,
    includes: [String],
    image: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    featured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const spaceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    subtitle: String,
    description: String,
    capacity: {
      theatre: Number,
      classroom: Number,
      boardroom: Number,
      reception: Number,
      banquet: Number,
    },
    size: String,
    features: [String],
    image: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    priceFrom: String,
    featured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: String,
    content: String,
    featuredImage: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category: { type: String, default: "News" },
    tags: [String],
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    publishedAt: Date,
    viewCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const galleryCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const settingsSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: "Neoprime" },
    tagline: { type: String, default: "Luxury Redefined" },
    contact: {
      phone: String,
      email: String,
      address: String,
    },
    booking: {
      bookingPhone: String,
      reservationsEmail: String,
      diningEmail: String,
      eventsEmail: String,
    },
    social: {
      instagram: String,
      facebook: String,
      twitter: String,
      linkedin: String,
      youtube: String,
    },
    announcement: {
      text: String,
      link: String,
      isActive: { type: Boolean, default: false },
    },
    showEvents: { type: Boolean, default: true },
    seo: {
      metaTitle: String,
      metaDescription: String,
    },
  },
  { timestamps: true },
);

// Clear cached models to avoid issues
if (mongoose.models.User) delete mongoose.models.User;
if (mongoose.models.Room) delete mongoose.models.Room;
if (mongoose.models.Offer) delete mongoose.models.Offer;
if (mongoose.models.Space) delete mongoose.models.Space;
if (mongoose.models.Post) delete mongoose.models.Post;
if (mongoose.models.GalleryCategory) delete mongoose.models.GalleryCategory;
if (mongoose.models.Settings) delete mongoose.models.Settings;

const User = mongoose.model("User", userSchema);
const Room = mongoose.model("Room", roomSchema);
const Offer = mongoose.model("Offer", offerSchema);
const Space = mongoose.model("Space", spaceSchema);
const Post = mongoose.model("Post", postSchema);
const GalleryCategory = mongoose.model(
  "GalleryCategory",
  galleryCategorySchema,
);
const Settings = mongoose.model("Settings", settingsSchema);

// Seed Data
const roomsData = [
  {
    title: "Classic Room",
    slug: "classic-room",
    subtitle: "Timeless Elegance",
    description:
      "Our Classic Rooms offer a refined retreat with carefully curated furnishings, premium bedding, and thoughtful amenities. Each room features floor-to-ceiling windows that flood the space with natural light.",
    price: 295,
    size: "32 m²",
    bedType: "King or Twin",
    maxGuests: 2,
    amenities: [
      "King-size bed",
      "Rainfall shower",
      "Smart TV",
      "Nespresso machine",
      "High-speed WiFi",
      "Air conditioning",
      "Room service",
      "Minibar",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
        publicId: "",
        type: "main",
        caption: "Classic Room",
      },
    ],
    featured: false,
    sortOrder: 1,
    isActive: true,
  },
  {
    title: "Deluxe Room",
    slug: "deluxe-room",
    subtitle: "Elevated Comfort",
    description:
      "Experience heightened luxury in our Deluxe Rooms, featuring expanded living space and enhanced amenities. The contemporary design seamlessly blends comfort with style.",
    price: 395,
    size: "42 m²",
    bedType: "King",
    maxGuests: 2,
    amenities: [
      "King-size bed",
      "Rainfall shower",
      "Bathtub",
      "Smart TV",
      "Nespresso machine",
      "High-speed WiFi",
      "Air conditioning",
      "Minibar",
      "City views",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80",
        publicId: "",
        type: "main",
        caption: "Deluxe Room",
      },
    ],
    featured: true,
    sortOrder: 2,
    isActive: true,
  },
  {
    title: "Junior Suite",
    slug: "junior-suite",
    subtitle: "Sophisticated Space",
    description:
      "Our Junior Suites offer a generous open-plan layout with distinct living and sleeping areas. Floor-to-ceiling windows frame spectacular views.",
    price: 525,
    size: "55 m²",
    bedType: "King",
    maxGuests: 3,
    amenities: [
      "King-size bed",
      "Rainfall shower",
      "Soaking tub",
      "Smart TV",
      "Nespresso machine",
      "High-speed WiFi",
      "Living area",
      "Panoramic views",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80",
        publicId: "",
        type: "main",
        caption: "Junior Suite",
      },
    ],
    featured: true,
    sortOrder: 3,
    isActive: true,
  },
  {
    title: "Executive Suite",
    slug: "executive-suite",
    subtitle: "Business Excellence",
    description:
      "Designed for the discerning business traveler, our Executive Suites combine workspace functionality with residential comfort.",
    price: 695,
    size: "68 m²",
    bedType: "King",
    maxGuests: 2,
    amenities: [
      "King-size bed",
      "Dual showers",
      "Soaking tub",
      '65" Smart TV',
      "Executive lounge access",
      "Dedicated workspace",
      "Meeting area",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80",
        publicId: "",
        type: "main",
        caption: "Executive Suite",
      },
    ],
    featured: true,
    sortOrder: 4,
    isActive: true,
  },
  {
    title: "Neoprime Suite",
    slug: "neoprime-suite",
    subtitle: "Ultimate Luxury",
    description:
      "The pinnacle of luxury accommodation, our signature Neoprime Suite spans an impressive space with separate living room, dining area, and master bedroom with butler service.",
    price: 1250,
    size: "120 m²",
    bedType: "Super King",
    maxGuests: 4,
    amenities: [
      "Super King bed",
      "Spa bathroom",
      "Steam shower",
      "Freestanding tub",
      '75" Smart TV',
      "Premium sound system",
      "Private bar",
      "Butler service",
      "Terrace",
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
        publicId: "",
        type: "main",
        caption: "Neoprime Suite",
      },
    ],
    featured: true,
    sortOrder: 5,
    isActive: true,
  },
];

const offersData = [
  {
    title: "Romantic Escape",
    slug: "romantic-escape",
    subtitle: "Love in Luxury",
    description:
      "Celebrate your love with an unforgettable romantic getaway. This exclusive package includes champagne on arrival, couples spa treatments, and an intimate dinner.",
    price: "From £595",
    validity: "Valid until December 2026",
    includes: [
      "Two nights in a Junior Suite",
      "Champagne & chocolates",
      "60-minute couples massage",
      "Five-course dinner for two",
      "Late checkout",
      "Full breakfast daily",
    ],
    image: {
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
      publicId: "",
    },
    featured: true,
    sortOrder: 1,
    isActive: true,
  },
  {
    title: "Spa & Wellness Retreat",
    slug: "spa-wellness-retreat",
    subtitle: "Restore Your Balance",
    description:
      "Immerse yourself in total relaxation with our comprehensive wellness package featuring unlimited spa access and personalized treatments.",
    price: "From £475",
    validity: "Valid until March 2027",
    includes: [
      "Two nights in a Deluxe Room",
      "Unlimited spa access",
      "Daily 90-minute treatment",
      "Wellness breakfast",
      "Yoga session",
      "Aromatherapy kit",
    ],
    image: {
      url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80",
      publicId: "",
    },
    featured: true,
    sortOrder: 2,
    isActive: true,
  },
  {
    title: "Weekend Indulgence",
    slug: "weekend-indulgence",
    subtitle: "Perfect Getaway",
    description:
      "Make the most of your weekend with our curated indulgence package featuring premium dining and relaxation.",
    price: "From £425",
    validity: "Friday to Sunday stays",
    includes: [
      "Two nights accommodation",
      "Afternoon tea for two",
      "Three-course dinner",
      "Full breakfast daily",
      "Late checkout",
      "Welcome amenity",
    ],
    image: {
      url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80",
      publicId: "",
    },
    featured: true,
    sortOrder: 3,
    isActive: true,
  },
];

const spacesData = [
  {
    title: "The Boardroom",
    slug: "the-boardroom",
    subtitle: "Executive Meetings",
    description:
      "An intimate space designed for executive meetings and private discussions with state-of-the-art video conferencing.",
    capacity: { boardroom: 14, theatre: 20, classroom: 12 },
    size: "45 m²",
    features: [
      "Natural daylight",
      "Video conferencing",
      "Private entrance",
      "Catering available",
    ],
    image: {
      url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      publicId: "",
    },
    priceFrom: "From £500/day",
    featured: true,
    sortOrder: 1,
    isActive: true,
  },
  {
    title: "The Gallery",
    slug: "the-gallery",
    subtitle: "Versatile Event Space",
    description:
      "A flexible space perfect for presentations, workshops, and medium-sized gatherings with natural light.",
    capacity: { theatre: 80, classroom: 50, reception: 100, boardroom: 30 },
    size: "120 m²",
    features: [
      "Natural daylight",
      "Built-in AV",
      "Breakout area",
      "Flexible layout",
    ],
    image: {
      url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80",
      publicId: "",
    },
    priceFrom: "From £1,200/day",
    featured: true,
    sortOrder: 2,
    isActive: true,
  },
  {
    title: "The Grand Ballroom",
    slug: "the-grand-ballroom",
    subtitle: "Our Signature Venue",
    description:
      "Our largest and most prestigious space featuring soaring ceilings and crystal chandeliers. Perfect for gala dinners and conferences.",
    capacity: { theatre: 300, banquet: 200, reception: 400, classroom: 150 },
    size: "450 m²",
    features: [
      "Crystal chandeliers",
      "Stage area",
      "Private bar",
      "Green room",
      "Dance floor",
    ],
    image: {
      url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
      publicId: "",
    },
    priceFrom: "From £3,500/day",
    featured: true,
    sortOrder: 3,
    isActive: true,
  },
];

const galleryCategoriesData = [
  { name: "Rooms", slug: "rooms", sortOrder: 1 },
  { name: "Dining", slug: "dining", sortOrder: 2 },
  { name: "Events", slug: "events", sortOrder: 3 },
  { name: "Exterior", slug: "exterior", sortOrder: 4 },
  { name: "Amenities", slug: "amenities", sortOrder: 5 },
];

const settingsData = {
  siteName: "Neoprime",
  tagline: "Luxury Redefined",
  contact: {
    phone: "+44 (0) 191 234 5678",
    email: "hello@neoprimehotels.com",
    address: "1 Neoprime Square\nNewcastle upon Tyne\nNE1 4AD\nUnited Kingdom",
  },
  booking: {
    bookingPhone: "+44 (0) 191 234 5679",
    reservationsEmail: "reservations@neoprimehotels.com",
    diningEmail: "dining@neoprimehotels.com",
    eventsEmail: "events@neoprimehotels.com",
  },
  social: {
    instagram: "https://instagram.com/neoprimehotels",
    facebook: "https://facebook.com/neoprimehotels",
    twitter: "https://twitter.com/neoprimehotels",
    linkedin: "https://linkedin.com/company/neoprimehotels",
  },
  announcement: {
    text: "Spring Special: 20% off weekend stays. Book now!",
    link: "/offers",
    isActive: true,
  },
  showEvents: true,
  seo: {
    metaTitle: "Neoprime Hotel | Luxury Accommodation in Newcastle",
    metaDescription:
      "Experience unparalleled luxury at Neoprime Hotel. Premium rooms, fine dining, spa & wellness.",
  },
};

async function seed() {
  try {
    console.log("🌱 Starting database seed...\n");

    await mongoose.connect(MONGODB_URI);
    console.log("✓ Connected to MongoDB\n");

    // Create admin user
    const adminEmail = process.env.ADMIN_EMAIL || "admin@neoprimehotels.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    let adminUser = await User.findOne({ email: adminEmail });
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      adminUser = await User.create({
        email: adminEmail,
        password: hashedPassword,
        name: "Admin",
        role: "admin",
      });
      console.log("✓ Admin user created");
    } else {
      console.log("○ Admin user already exists");
    }
    console.log(`  Email: ${adminEmail}`);
    console.log(`  Password: ${adminPassword}\n`);

    // Clear existing data and reseed
    await Room.deleteMany({});
    await Offer.deleteMany({});
    await Space.deleteMany({});
    await Post.deleteMany({});
    console.log("✓ Cleared existing data\n");

    // Seed rooms
    for (const room of roomsData) {
      await Room.create(room);
      console.log(`✓ Created room: ${room.title}`);
    }
    console.log("");

    // Seed offers
    for (const offer of offersData) {
      await Offer.create(offer);
      console.log(`✓ Created offer: ${offer.title}`);
    }
    console.log("");

    // Seed spaces
    for (const space of spacesData) {
      await Space.create(space);
      console.log(`✓ Created space: ${space.title}`);
    }
    console.log("");

    // Seed blog posts
    const postsData = [
      {
        title: "A New Chapter for Neoprime Newcastle",
        slug: "new-chapter-neoprime-newcastle",
        excerpt:
          "We are thrilled to announce the completion of our latest renovation, bringing a fresh perspective to luxury hospitality.",
        content:
          "<p>After months of careful planning, Neoprime Newcastle emerges renewed and reimagined. Our commitment to excellence has driven us to create spaces that honor the building's heritage while embracing contemporary luxury.</p>",
        featuredImage: {
          url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80",
          publicId: "",
        },
        author: adminUser._id,
        category: "News",
        tags: ["renovation", "newcastle"],
        status: "published",
        publishedAt: new Date(),
      },
      {
        title: "Award-Winning Dining at The Neoprime Grill",
        slug: "award-winning-dining-neoprime-grill",
        excerpt:
          "The Neoprime Grill has been recognized with two prestigious accolades this season.",
        content:
          "<p>We are honored to share that The Neoprime Grill has received recognition from both the AA Rosette Awards and the Michelin Guide this year.</p>",
        featuredImage: {
          url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
          publicId: "",
        },
        author: adminUser._id,
        category: "Press",
        tags: ["dining", "awards"],
        status: "published",
        publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
      {
        title: "Sustainability Initiatives at Neoprime Hotels",
        slug: "sustainability-initiatives-neoprime",
        excerpt:
          "Our journey towards a more sustainable future continues with new initiatives.",
        content:
          "<p>At Neoprime Hotels, we believe that luxury and sustainability can coexist harmoniously. This year, we've implemented several new initiatives.</p>",
        featuredImage: {
          url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80",
          publicId: "",
        },
        author: adminUser._id,
        category: "News",
        tags: ["sustainability"],
        status: "published",
        publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      },
    ];

    for (const post of postsData) {
      await Post.create(post);
      console.log(`✓ Created post: ${post.title}`);
    }
    console.log("");

    // Seed gallery categories
    await GalleryCategory.deleteMany({});
    for (const cat of galleryCategoriesData) {
      await GalleryCategory.create(cat);
      console.log(`✓ Created category: ${cat.name}`);
    }
    console.log("");

    // Seed settings
    await Settings.deleteMany({});
    await Settings.create(settingsData);
    console.log("✓ Created site settings\n");

    console.log("🎉 Seed completed successfully!\n");
    console.log("You can now:");
    console.log("  1. Run: npm run dev");
    console.log("  2. Visit: http://localhost:3000");
    console.log("  3. Login at: http://localhost:3000/admin/login\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

seed();
