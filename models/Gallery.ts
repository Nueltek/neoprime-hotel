import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGalleryImage extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  alt: string;
  image: {
    url: string;
    publicId: string;
  };
  category: mongoose.Types.ObjectId;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGalleryCategory extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryCategorySchema = new Schema<IGalleryCategory>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
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

GalleryCategorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    title: {
      type: String,
      required: [true, 'Image title is required'],
      trim: true,
    },
    alt: {
      type: String,
      required: [true, 'Alt text is required'],
      trim: true,
    },
    image: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'GalleryCategory',
      required: true,
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

export const GalleryCategory: Model<IGalleryCategory> = 
  mongoose.models.GalleryCategory || mongoose.model<IGalleryCategory>('GalleryCategory', GalleryCategorySchema);

export const GalleryImage: Model<IGalleryImage> = 
  mongoose.models.GalleryImage || mongoose.model<IGalleryImage>('GalleryImage', GalleryImageSchema);
