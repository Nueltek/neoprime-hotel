import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOffer extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  subtitle?: string;
  description: string;
  price?: string;
  validity?: string;
  includes: string[];
  image?: {
    url: string;
    publicId?: string;
  };
  featured: boolean;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const OfferSchema = new Schema<IOffer>(
  {
    title: {
      type: String,
      required: [true, 'Offer title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    subtitle: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    price: {
      type: String,
      trim: true,
    },
    validity: {
      type: String,
      trim: true,
    },
    includes: [{
      type: String,
      trim: true,
    }],
    image: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    featured: {
      type: Boolean,
      default: false,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Offer: Model<IOffer> = mongoose.models.Offer || mongoose.model<IOffer>('Offer', OfferSchema);

export default Offer;
