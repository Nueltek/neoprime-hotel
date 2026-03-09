import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db/mongoose';
import Post from '@/models/Post';
import { uploadImage, deleteImage } from '@/lib/cloudinary';
import mongoose from 'mongoose';

// GET - Fetch single post (by ID or slug)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    
    let post;
    
    // Check if id is a valid ObjectId or a slug
    if (mongoose.Types.ObjectId.isValid(id)) {
      post = await Post.findById(id).populate('author', 'name');
    } else {
      post = await Post.findOne({ slug: id }).populate('author', 'name');
    }
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    // Increment view count for published posts
    if (post.status === 'published') {
      await Post.findByIdAndUpdate(post._id, { $inc: { viewCount: 1 } });
    }
    
    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

// PUT - Update post (admin only)
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
    const { title, excerpt, content, imageBase64, category, tags, status, metaTitle, metaDescription } = body;
    
    const post = await Post.findById(id);
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    // Upload new image if provided
    let featuredImage = post.featuredImage;
    if (imageBase64) {
      // Delete old image
      if (post.featuredImage?.publicId) {
        await deleteImage(post.featuredImage.publicId);
      }
      featuredImage = await uploadImage(imageBase64, 'blog');
    }
    
    // Set publishedAt when first publishing
    let publishedAt = post.publishedAt;
    if (status === 'published' && post.status !== 'published') {
      publishedAt = new Date();
    }
    
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title,
        excerpt,
        content,
        featuredImage,
        category,
        tags,
        status,
        publishedAt,
        metaTitle,
        metaDescription,
      },
      { new: true, runValidators: true }
    ).populate('author', 'name');
    
    return NextResponse.json({ post: updatedPost }, { status: 200 });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

// DELETE - Delete post (admin only)
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
    
    const post = await Post.findById(id);
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    // Delete image from Cloudinary
    if (post.featuredImage?.publicId) {
      await deleteImage(post.featuredImage.publicId);
    }
    
    await Post.findByIdAndDelete(id);
    
    return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
