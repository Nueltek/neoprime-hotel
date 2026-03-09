import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db/mongoose';
import Event from '@/models/Event';
import { uploadImage, deleteImage } from '@/lib/cloudinary';
import mongoose from 'mongoose';

// GET - Fetch single event
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    
    let event;
    
    if (mongoose.Types.ObjectId.isValid(id)) {
      event = await Event.findById(id);
    } else {
      event = await Event.findOne({ slug: id });
    }
    
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    
    return NextResponse.json({ event }, { status: 200 });
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}

// PUT - Update event (admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    
    if (!session || !['admin', 'editor'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await dbConnect();
    
    const body = await req.json();
    const { title, description, date, endDate, time, location, imageBase64, ticketLink, featured, isActive } = body;
    
    const event = await Event.findById(id);
    
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    
    // Upload new image if provided
    let image = event.image;
    if (imageBase64) {
      if (event.image?.publicId) {
        await deleteImage(event.image.publicId);
      }
      image = await uploadImage(imageBase64, 'events');
    }
    
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        title,
        description,
        date: new Date(date),
        endDate: endDate ? new Date(endDate) : undefined,
        time,
        location,
        image,
        ticketLink,
        featured,
        isActive,
      },
      { new: true, runValidators: true }
    );
    
    return NextResponse.json({ event: updatedEvent }, { status: 200 });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

// DELETE - Delete event (admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await dbConnect();
    
    const event = await Event.findById(id);
    
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    
    if (event.image?.publicId) {
      await deleteImage(event.image.publicId);
    }
    
    await Event.findByIdAndDelete(id);
    
    return NextResponse.json({ message: 'Event deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}
