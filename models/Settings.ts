import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISocialLinks {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
}

export interface IAnnouncement {
  text: string;
  link?: string;
  isActive: boolean;
}

export interface ISettings extends Document {
  _id: mongoose.Types.ObjectId;
  siteName: string;
  tagline: string;
  
  // Contact Information
  phone: string;
  email: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    postcode: string;
    country: string;
  };
  
  // Social Links
  socialLinks: ISocialLinks;
  
  // Announcement Bar
  announcement: IAnnouncement;
  
  // Feature Toggles
  showEvents: boolean;
  
  // Booking Settings
  bookingPhone: string;
  reservationsEmail: string;
  diningEmail: string;
  eventsEmail: string;
  
  // SEO
  metaTitle?: string;
  metaDescription?: string;
  
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    siteName: {
      type: String,
      default: 'Neoprime Hotels',
    },
    tagline: {
      type: String,
      default: 'Bold Design, Warm Hospitality',
    },
    phone: {
      type: String,
      default: '+44 (0) 191 234 5678',
    },
    email: {
      type: String,
      default: 'newcastle@neoprimehotels.com',
    },
    address: {
      line1: { type: String, default: 'Neoprime Newcastle' },
      line2: { type: String, default: 'New Bridge Street West' },
      city: { type: String, default: 'Newcastle upon Tyne' },
      postcode: { type: String, default: 'NE1 8BS' },
      country: { type: String, default: 'United Kingdom' },
    },
    socialLinks: {
      instagram: { type: String },
      facebook: { type: String },
      twitter: { type: String },
      linkedin: { type: String },
      youtube: { type: String },
    },
    announcement: {
      text: { type: String, default: 'Neoprime Newcastle: Now accepting reservations for summer 2025' },
      link: { type: String },
      isActive: { type: Boolean, default: true },
    },
    showEvents: {
      type: Boolean,
      default: true,
    },
    bookingPhone: {
      type: String,
      default: '+441912345678',
    },
    reservationsEmail: {
      type: String,
      default: 'reservations@neoprimehotels.com',
    },
    diningEmail: {
      type: String,
      default: 'dining@neoprimehotels.com',
    },
    eventsEmail: {
      type: String,
      default: 'events@neoprimehotels.com',
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Settings: Model<ISettings> = mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);

export default Settings;
