import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db/mongoose';
import Offer from '@/models/Offer';
import { uploadImage, deleteImage } from '@/lib/cloudinary';

// GET - Fetch single offer
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    
    const offer = await Offer.findById(id);
    
    if (!offer) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 });
    }
    
    return NextResponse.json({ offer }, { status: 200 });
  } catch (error) {
    console.error('Error fetching offer:', error);
    return NextResponse.json(
      { error: 'Failed to fetch offer' },
      { status: 500 }
    );
  }
}

// PUT - Update offer (admin only)
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
    const { title, subtitle, description, price, validity, includes, imageBase64, featured, sortOrder, isActive } = body;
    
    const offer = await Offer.findById(id);
    
    if (!offer) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 });
    }
    
    // Upload new image if provided
    let image = offer.image;
    if (imageBase64) {
      // Delete old image
      if (offer.image?.publicId) {
        await deleteImage(offer.image.publicId);
      }
      image = await uploadImage(imageBase64, 'offers');
    }
    
    const updatedOffer = await Offer.findByIdAndUpdate(
      id,
      {
        title,
        subtitle,
        description,
        price,
        validity,
        includes,
        image,
        featured,
        sortOrder,
        isActive,
      },
      { new: true, runValidators: true }
    );
    
    return NextResponse.json({ offer: updatedOffer }, { status: 200 });
  } catch (error) {
    console.error('Error updating offer:', error);
    return NextResponse.json(
      { error: 'Failed to update offer' },
      { status: 500 }
    );
  }
}

// DELETE - Delete offer (admin only)
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
    
    const offer = await Offer.findById(id);
    
    if (!offer) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 });
    }
    
    // Delete image from Cloudinary
    if (offer.image?.publicId) {
      await deleteImage(offer.image.publicId);
    }
    
    await Offer.findByIdAndDelete(id);
    
    return NextResponse.json({ message: 'Offer deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting offer:', error);
    return NextResponse.json(
      { error: 'Failed to delete offer' },
      { status: 500 }
    );
  }
}
