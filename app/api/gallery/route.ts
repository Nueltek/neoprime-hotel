import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db/mongoose';
import { GalleryImage, GalleryCategory } from '@/models/Gallery';
import { uploadImage, deleteImage } from '@/lib/cloudinary';

// GET - Fetch all gallery images
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const active = searchParams.get('active');
    
    const query: Record<string, unknown> = {};
    
    if (category) {
      const cat = await GalleryCategory.findOne({ slug: category });
      if (cat) query.category = cat._id;
    }
    if (active !== 'false') query.isActive = true;
    
    const images = await GalleryImage.find(query)
      .populate('category', 'name slug')
      .sort({ sortOrder: 1, createdAt: -1 });
    
    return NextResponse.json({ images }, { status: 200 });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery' },
      { status: 500 }
    );
  }
}

// POST - Upload new image (admin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !['admin', 'editor'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await dbConnect();
    
    const body = await req.json();
    const { title, alt, imageBase64, categoryId, sortOrder } = body;
    
    // Upload image to Cloudinary
    let image = { url: '', publicId: '' };
    if (imageBase64) {
      image = await uploadImage(imageBase64, 'gallery');
    }
    
    const galleryImage = await GalleryImage.create({
      title,
      alt,
      image,
      category: categoryId,
      sortOrder: sortOrder || 0,
    });
    
    const populatedImage = await GalleryImage.findById(galleryImage._id)
      .populate('category', 'name slug');
    
    return NextResponse.json({ image: populatedImage }, { status: 201 });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
