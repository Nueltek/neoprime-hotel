import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db/mongoose';
import Space from '@/models/Space';
import { uploadImage, deleteImage } from '@/lib/cloudinary';

// GET - Fetch single space
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    
    const space = await Space.findById(id);
    
    if (!space) {
      return NextResponse.json({ error: 'Space not found' }, { status: 404 });
    }
    
    return NextResponse.json({ space }, { status: 200 });
  } catch (error) {
    console.error('Error fetching space:', error);
    return NextResponse.json(
      { error: 'Failed to fetch space' },
      { status: 500 }
    );
  }
}

// PUT - Update space (admin only)
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
    const { title, subtitle, description, capacity, size, features, imageBase64, priceFrom, featured, sortOrder, isActive } = body;
    
    const space = await Space.findById(id);
    
    if (!space) {
      return NextResponse.json({ error: 'Space not found' }, { status: 404 });
    }
    
    // Upload new image if provided
    let image = space.image;
    if (imageBase64) {
      if (space.image?.publicId) {
        await deleteImage(space.image.publicId);
      }
      image = await uploadImage(imageBase64, 'spaces');
    }
    
    const updatedSpace = await Space.findByIdAndUpdate(
      id,
      {
        title,
        subtitle,
        description,
        capacity,
        size,
        features,
        image,
        priceFrom,
        featured,
        sortOrder,
        isActive,
      },
      { new: true, runValidators: true }
    );
    
    return NextResponse.json({ space: updatedSpace }, { status: 200 });
  } catch (error) {
    console.error('Error updating space:', error);
    return NextResponse.json(
      { error: 'Failed to update space' },
      { status: 500 }
    );
  }
}

// DELETE - Delete space (admin only)
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
    
    const space = await Space.findById(id);
    
    if (!space) {
      return NextResponse.json({ error: 'Space not found' }, { status: 404 });
    }
    
    if (space.image?.publicId) {
      await deleteImage(space.image.publicId);
    }
    
    await Space.findByIdAndDelete(id);
    
    return NextResponse.json({ message: 'Space deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting space:', error);
    return NextResponse.json(
      { error: 'Failed to delete space' },
      { status: 500 }
    );
  }
}
