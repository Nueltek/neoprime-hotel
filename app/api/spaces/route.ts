import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db/mongoose';
import Space from '@/models/Space';
import { uploadImage } from '@/lib/cloudinary';
import slugify from 'slugify';

// GET - Fetch all spaces
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get('featured');
    const active = searchParams.get('active');
    
    const query: Record<string, unknown> = {};
    
    if (featured === 'true') query.featured = true;
    if (active !== 'false') query.isActive = true;
    
    const spaces = await Space.find(query).sort({ sortOrder: 1, createdAt: -1 });
    
    return NextResponse.json({ spaces }, { status: 200 });
  } catch (error) {
    console.error('Error fetching spaces:', error);
    return NextResponse.json(
      { error: 'Failed to fetch spaces' },
      { status: 500 }
    );
  }
}

// POST - Create new space (admin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !['admin', 'editor'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await dbConnect();
    
    const body = await req.json();
    const { title, subtitle, description, capacity, size, features, imageBase64, priceFrom, featured, sortOrder, isActive } = body;
    
    // Generate slug from title
    const baseSlug = slugify(title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;
    
    while (await Space.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    // Upload image to Cloudinary
    let image = { url: '', publicId: '' };
    if (imageBase64) {
      image = await uploadImage(imageBase64, 'spaces');
    }
    
    const space = await Space.create({
      title,
      slug,
      subtitle,
      description,
      capacity: capacity || {},
      size,
      features: features || [],
      image,
      priceFrom,
      featured: featured || false,
      sortOrder: sortOrder || 0,
      isActive: isActive !== false,
    });
    
    return NextResponse.json({ space }, { status: 201 });
  } catch (error) {
    console.error('Error creating space:', error);
    return NextResponse.json(
      { error: 'Failed to create space' },
      { status: 500 }
    );
  }
}
