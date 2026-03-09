import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db/mongoose';
import Offer from '@/models/Offer';
import { uploadImage } from '@/lib/cloudinary';
import slugify from 'slugify';

// GET - Fetch all offers
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get('featured');
    const active = searchParams.get('active');
    const limit = searchParams.get('limit');
    
    const query: Record<string, unknown> = {};
    
    if (featured === 'true') query.featured = true;
    if (active !== 'false') query.isActive = true;
    
    let offersQuery = Offer.find(query).sort({ sortOrder: 1, createdAt: -1 });
    
    if (limit) {
      offersQuery = offersQuery.limit(parseInt(limit));
    }
    
    const offers = await offersQuery;
    
    return NextResponse.json({ offers }, { status: 200 });
  } catch (error) {
    console.error('Error fetching offers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch offers' },
      { status: 500 }
    );
  }
}

// POST - Create new offer (admin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !['admin', 'editor'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await dbConnect();
    
    const body = await req.json();
    const { title, subtitle, description, price, validity, includes, imageBase64, featured, sortOrder, isActive } = body;
    
    // Generate slug from title
    const baseSlug = slugify(title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;
    
    while (await Offer.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    // Upload image to Cloudinary
    let image = { url: '', publicId: '' };
    if (imageBase64) {
      image = await uploadImage(imageBase64, 'offers');
    }
    
    const offer = await Offer.create({
      title,
      slug,
      subtitle,
      description,
      price,
      validity,
      includes: includes || [],
      image,
      featured: featured || false,
      sortOrder: sortOrder || 0,
      isActive: isActive !== false,
    });
    
    return NextResponse.json({ offer }, { status: 201 });
  } catch (error) {
    console.error('Error creating offer:', error);
    return NextResponse.json(
      { error: 'Failed to create offer' },
      { status: 500 }
    );
  }
}
