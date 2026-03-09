import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IRoomImage {
  url: string;
  publicId?: string;
  caption?: string;
  type: 'main' | 'bedroom' | 'bathroom' | 'balcony' | 'workspace' | 'other';
}

export interface IRoom extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  price: number;
  size: string;
  bedType: string;
  maxGuests: number;
  amenities: string[];
  images: IRoomImage[];
  featured: boolean;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RoomImageSchema = new Schema<IRoomImage>({
  url: { type: String, required: true },
  publicId: { type: String, default: '' },
  caption: { type: String },
  type: {
    type: String,
    enum: ['main', 'bedroom', 'bathroom', 'balcony', 'workspace', 'other'],
    default: 'other',
  },
}, { _id: false });

const RoomSchema = new Schema<IRoom>(
  {
    title: {
      type: String,
      required: [true, 'Room title is required'],
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
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be positive'],
    },
    size: {
      type: String,
      required: [true, 'Room size is required'],
    },
    bedType: {
      type: String,
      required: [true, 'Bed type is required'],
    },
    maxGuests: {
      type: Number,
      required: true,
      default: 2,
    },
    amenities: [{
      type: String,
      trim: true,
    }],
    images: [RoomImageSchema],
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

// Create slug from title
RoomSchema.pre('save', function (next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

const Room: Model<IRoom> = mongoose.models.Room || mongoose.model<IRoom>('Room', RoomSchema);

export default Room;
