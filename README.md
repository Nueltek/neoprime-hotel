# Neoprime Hotel - Fullstack Luxury Hotel CMS

A premium luxury hotel website with a complete content management system, built with Next.js 16, TypeScript, MongoDB, Cloudinary, and NextAuth.

## 🏨 Overview

This is a fullstack hotel website featuring:

- **Beautiful Frontend**: Professional 3-tier navigation, 20+ fully designed pages
- **Admin Dashboard**: Modern CMS for managing all content
- **Dynamic Content**: Rooms, Offers, Blog, Gallery, Events - all manageable
- **Secure Authentication**: NextAuth with role-based access control
- **Image Management**: Cloudinary integration for optimized images
- **Responsive Design**: Mobile-first approach with elegant animations

## 🛠 Tech Stack

### Frontend

- **Framework**: Next.js 16.1.6 (App Router, React 19.2)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Rich Text Editor**: TinyMCE

### Backend

- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js with credentials provider
- **Image Storage**: Cloudinary
- **API**: Next.js API Routes

## 📁 Project Structure

```
neoprime-hotel/
├── app/
│   ├── api/                    # API Routes
│   │   ├── auth/[...nextauth]/ # NextAuth handler
│   │   ├── rooms/              # Rooms CRUD
│   │   ├── offers/             # Offers CRUD
│   │   ├── posts/              # Blog posts CRUD
│   │   ├── gallery/            # Gallery images CRUD
│   │   ├── events/             # Events CRUD
│   │   └── settings/           # Site settings
│   ├── admin/                  # Admin Dashboard
│   │   ├── login/              # Admin login
│   │   ├── rooms/              # Rooms management
│   │   ├── offers/             # Offers management
│   │   ├── posts/              # Blog management
│   │   ├── gallery/            # Gallery management
│   │   ├── events/             # Events management
│   │   └── settings/           # Site settings
│   ├── blog/                   # Blog pages
│   │   ├── page.tsx            # Blog listing
│   │   └── [slug]/             # Individual posts
│   └── [other pages]/          # Public pages
├── components/
│   ├── admin/                  # Admin components
│   ├── layouts/                # Layout wrappers
│   ├── providers/              # Context providers
│   ├── sections/               # Page sections
│   └── ui/                     # Reusable components
├── lib/
│   ├── db/mongoose.ts          # Database connection
│   ├── auth.ts                 # NextAuth config
│   ├── cloudinary.ts           # Cloudinary utilities
│   └── utils.ts                # Helpers & animations
├── models/                     # Mongoose models
│   ├── User.ts
│   ├── Room.ts
│   ├── Offer.ts
│   ├── Post.ts
│   ├── Gallery.ts
│   ├── Event.ts
│   └── Settings.ts
├── scripts/
│   └── seed.ts                 # Database seeding
└── types/                      # TypeScript types
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- MongoDB database (Atlas or local)
- Cloudinary account
- TinyMCE API key (free at tiny.cloud)

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create a `.env.local` file:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/neoprime

# NextAuth
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# TinyMCE (get free API key at https://www.tiny.cloud/auth/signup/)
NEXT_PUBLIC_TINYMCE_API_KEY=your-tinymce-api-key

# Admin Setup
ADMIN_EMAIL=admin@neoprimehotels.com
ADMIN_PASSWORD=your-secure-password
```

### 3. Seed Database

```bash
npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/seed.ts
```

### 4. Run Development Server

```bash
npm run dev
```

### 5. Access the Application

- **Website**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin

## 📊 Admin Dashboard Features

### Dashboard Overview

- Quick stats for all content types
- Quick action buttons
- Recent posts and events preview
- Website preview iframe

### Room Management

- Add/edit/delete rooms
- Multiple images per room (bedroom, bathroom, balcony, etc.)
- Image gallery with lightbox preview
- Drag & drop image upload
- Amenities management
- Featured rooms toggle
- Active/hidden status

### Offers Management

- Create promotional packages
- Upload offer images
- Manage "what's included" lists
- Set pricing and validity periods
- Featured offers

### Blog / Press System

- Rich text editor (TinyMCE)
- Featured image upload
- Categories and tags
- Draft/published status
- SEO meta fields
- View count tracking

### Gallery Management

- Bulk image upload
- Category management
- Alt text and captions
- Drag & drop interface
- Category filtering

### Events Management

- Create upcoming events
- Date and time management
- Event images
- Location details
- Ticket links
- Featured events

### Settings

- Site name and tagline
- Contact information
- Booking phone number
- Department emails
- Social media links
- Announcement bar (text, link, toggle)
- Events section toggle
- SEO defaults

## 🔒 Security Features

- **Authentication**: NextAuth with secure session management
- **Authorization**: Role-based access (admin/editor)
- **API Protection**: All admin routes require authentication
- **Input Validation**: Mongoose schema validation
- **Password Hashing**: bcrypt with salt rounds
- **Secure Uploads**: Cloudinary validation

## 🎨 Design System

### Colors

- **Primary Backgrounds**: `#0A0B10`, `#111318`, `#16181E`
- **Gold Accents**: `#C6A56A`, `#D4AF72`, `#B8975A`
- **Text**: Primary `#FFFFFF`, Secondary `#D0D0D0`, Muted `#9C9C9C`

### Typography

- **Body Font**: Newsreader (elegant serif)
- **Headings**: GT America style (modern sans-serif)

### Animations

- Scroll reveal (fade up)
- Image hover zoom
- Button transitions
- Sequential fade-in
- Card lift effects

## 📱 Public Pages

| Page           | Route             | Description                            |
| -------------- | ----------------- | -------------------------------------- |
| Homepage       | `/`               | Hero, booking widget, feature sections |
| Rooms          | `/rooms`          | Room listings with details             |
| Dining         | `/dining`         | Restaurant information                 |
| The Grill      | `/grill`          | Restaurant page                        |
| Meetings       | `/meetings`       | Event venues                           |
| Offers         | `/offers`         | Special packages                       |
| Gallery        | `/gallery`        | Image gallery                          |
| Gift Cards     | `/gifts`          | Gift card options                      |
| Location       | `/location`       | Maps and directions                    |
| Blog           | `/blog`           | News and articles                      |
| Book Room      | `/book-room`      | Room booking                           |
| Book Table     | `/book-table`     | Restaurant reservations                |
| Contact        | `/contact`        | Contact form                           |
| FAQs           | `/faqs`           | Frequently asked questions             |
| Our Story      | `/our-story`      | About the brand                        |
| Sustainability | `/sustainability` | Environmental initiatives              |
| Careers        | `/careers`        | Job listings                           |
| Press          | `/press`          | Media centre                           |
| Privacy        | `/privacy`        | Privacy policy                         |
| Terms          | `/terms`          | Terms & conditions                     |
| Accessibility  | `/accessibility`  | Accessibility features                 |

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/[...nextauth]` - NextAuth handlers

### Rooms

- `GET /api/rooms` - List all rooms
- `POST /api/rooms` - Create room (admin)
- `GET /api/rooms/[id]` - Get room
- `PUT /api/rooms/[id]` - Update room (admin)
- `DELETE /api/rooms/[id]` - Delete room (admin)

### Offers

- `GET /api/offers` - List offers
- `POST /api/offers` - Create offer
- `PUT /api/offers/[id]` - Update offer
- `DELETE /api/offers/[id]` - Delete offer

### Posts

- `GET /api/posts` - List posts
- `POST /api/posts` - Create post
- `GET /api/posts/[id]` - Get post (by ID or slug)
- `PUT /api/posts/[id]` - Update post
- `DELETE /api/posts/[id]` - Delete post

### Gallery

- `GET /api/gallery` - List images
- `POST /api/gallery` - Upload image
- `GET /api/gallery/categories` - List categories
- `POST /api/gallery/categories` - Create category
- `DELETE /api/gallery/[id]` - Delete image

### Events

- `GET /api/events` - List events
- `POST /api/events` - Create event
- `PUT /api/events/[id]` - Update event
- `DELETE /api/events/[id]` - Delete event

### Settings

- `GET /api/settings` - Get site settings
- `PUT /api/settings` - Update settings (admin)

## 📝 License

This project is for demonstration and portfolio purposes.

---

Built by Uche with love for the modern hospitality industry.
