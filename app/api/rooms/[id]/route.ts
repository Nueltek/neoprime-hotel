import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db/mongoose';
import Room from '@/models/Room';
import { uploadImage, deleteImage } from '@/lib/cloudinary';

// GET - Fetch single room
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    
    const room = await Room.findById(id);
    
    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }
    
    return NextResponse.json({ room }, { status: 200 });
  } catch (error) {
    console.error('Error fetching room:', error);
    return NextResponse.json(
      { error: 'Failed to fetch room' },
      { status: 500 }
    );
  }
}

// PUT - Update room (admin only)
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
    const { title, subtitle, description, price, size, bedType, maxGuests, amenities, images, imagesToDelete, newImages, featured, sortOrder, isActive } = body;
    
    const room = await Room.findById(id);
    
    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }
    
    // Delete removed images from Cloudinary
    if (imagesToDelete && imagesToDelete.length > 0) {
      for (const publicId of imagesToDelete) {
        await deleteImage(publicId);
      }
    }
    
    // Upload new images
    const uploadedNewImages = [];
    if (newImages && newImages.length > 0) {
      for (const img of newImages) {
        if (img.base64) {
          const result = await uploadImage(img.base64, 'rooms');
          uploadedNewImages.push({
            url: result.url,
            publicId: result.publicId,
            caption: img.caption || '',
            type: img.type || 'other',
          });
        }
      }
    }
    
    // Combine existing images (minus deleted) with new images
    const existingImages = images || [];
    const allImages = [...existingImages, ...uploadedNewImages];
    
    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      {
        title,
        subtitle,
        description,
        price,
        size,
        bedType,
        maxGuests,
        amenities,
        images: allImages,
        featured,
        sortOrder,
        isActive,
      },
      { new: true, runValidators: true }
    );
    
    return NextResponse.json({ room: updatedRoom }, { status: 200 });
  } catch (error) {
    console.error('Error updating room:', error);
    return NextResponse.json(
      { error: 'Failed to update room' },
      { status: 500 }
    );
  }
}

// DELETE - Delete room (admin only)
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
    
    const room = await Room.findById(id);
    
    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }
    
    // Delete all images from Cloudinary
    for (const image of room.images) {
      if (image.publicId) {
        await deleteImage(image.publicId);
      }
    }
    
    await Room.findByIdAndDelete(id);
    
    return NextResponse.json({ message: 'Room deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting room:', error);
    return NextResponse.json(
      { error: 'Failed to delete room' },
      { status: 500 }
    );
  }
}
