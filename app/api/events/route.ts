import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db/mongoose';
import Event from '@/models/Event';
import { uploadImage } from '@/lib/cloudinary';
import slugify from 'slugify';

// GET - Fetch all events
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const upcoming = searchParams.get('upcoming');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');
    
    const query: Record<string, unknown> = { isActive: true };
    
    if (upcoming === 'true') {
      query.date = { $gte: new Date() };
    }
    if (featured === 'true') {
      query.featured = true;
    }
    
    let eventsQuery = Event.find(query).sort({ date: 1 });
    
    if (limit) {
      eventsQuery = eventsQuery.limit(parseInt(limit));
    }
    
    const events = await eventsQuery;
    
    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// POST - Create new event (admin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !['admin', 'editor'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await dbConnect();
    
    const body = await req.json();
    const { title, description, date, endDate, time, location, imageBase64, ticketLink, featured, isActive } = body;
    
    // Generate slug from title
    const baseSlug = slugify(title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;
    
    while (await Event.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    // Upload image to Cloudinary if provided
    let image;
    if (imageBase64) {
      image = await uploadImage(imageBase64, 'events');
    }
    
    const event = await Event.create({
      title,
      slug,
      description,
      date: new Date(date),
      endDate: endDate ? new Date(endDate) : undefined,
      time,
      location: location || 'Neoprime Newcastle',
      image,
      ticketLink,
      featured: featured || false,
      isActive: isActive !== false,
    });
    
    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
