import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db/mongoose';
import Settings from '@/models/Settings';

// GET - Fetch settings (public for some fields)
export async function GET() {
  try {
    await dbConnect();
    
    let settings = await Settings.findOne();
    
    // Create default settings if none exist
    if (!settings) {
      settings = await Settings.create({});
    }
    
    return NextResponse.json({ settings }, { status: 200 });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// PUT - Update settings (admin only)
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await dbConnect();
    
    const body = await req.json();
    
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = await Settings.create(body);
    } else {
      settings = await Settings.findByIdAndUpdate(
        settings._id,
        { ...body },
        { new: true, runValidators: true }
      );
    }
    
    return NextResponse.json({ settings }, { status: 200 });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
