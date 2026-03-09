import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db/mongoose';
import Room from '@/models/Room';
import { uploadImage } from '@/lib/cloudinary';
import slugify from 'slugify';

// GET - Fetch all rooms (public) or with filters
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get('featured');
    const active = searchParams.get('active');
    
    const query: Record<string, unknown> = {};
    
    if (featured === 'true') query.featured = true;
    if (active !== 'false') query.isActive = true;
    
    const rooms = await Room.find(query).sort({ sortOrder: 1, createdAt: -1 });
    
    return NextResponse.json({ rooms }, { status: 200 });
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rooms' },
      { status: 500 }
    );
  }
}

// POST - Create new room (admin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !['admin', 'editor'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await dbConnect();
    
    const body = await req.json();
    const { title, subtitle, description, price, size, bedType, maxGuests, amenities, images, featured, sortOrder, isActive } = body;
    
    // Generate slug from title
    const baseSlug = slugify(title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;
    
    // Ensure unique slug
    while (await Room.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    // Upload images to Cloudinary
    const uploadedImages = [];
    if (images && images.length > 0) {
      for (const img of images) {
        if (img.base64) {
          const result = await uploadImage(img.base64, 'rooms');
          uploadedImages.push({
            url: result.url,
            publicId: result.publicId,
            caption: img.caption || '',
            type: img.type || 'other',
          });
        }
      }
    }
    
    const room = await Room.create({
      title,
      slug,
      subtitle,
      description,
      price,
      size,
      bedType,
      maxGuests: maxGuests || 2,
      amenities: amenities || [],
      images: uploadedImages,
      featured: featured || false,
      sortOrder: sortOrder || 0,
      isActive: isActive !== false,
    });
    
    return NextResponse.json({ room }, { status: 201 });
  } catch (error) {
    console.error('Error creating room:', error);
    return NextResponse.json(
      { error: 'Failed to create room' },
      { status: 500 }
    );
  }
}
