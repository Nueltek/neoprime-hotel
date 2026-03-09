import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISpace extends Document {
  title: string;
  slug: string;
  subtitle?: string;
  description: string;
  capacity: {
    theatre?: number;
    classroom?: number;
    boardroom?: number;
    reception?: number;
    banquet?: number;
  };
  size?: string;
  features: string[];
  image: {
    url: string;
    publicId: string;
  };
  priceFrom?: string;
  featured: boolean;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const spaceSchema = new Schema<ISpace>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    subtitle: { type: String },
    description: { type: String, required: true },
    capacity: {
      theatre: { type: Number },
      classroom: { type: Number },
      boardroom: { type: Number },
      reception: { type: Number },
      banquet: { type: Number },
    },
    size: { type: String },
    features: [{ type: String }],
    image: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    priceFrom: { type: String },
    featured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Space: Model<ISpace> = mongoose.models.Space || mongoose.model<ISpace>('Space', spaceSchema);

export default Space;
