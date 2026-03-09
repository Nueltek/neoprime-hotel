import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db/mongoose';
import Post from '@/models/Post';
import { uploadImage } from '@/lib/cloudinary';
import slugify from 'slugify';

// GET - Fetch all posts
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');
    
    const query: Record<string, unknown> = {};
    
    if (status) {
      query.status = status;
    } else {
      // Public requests only get published posts
      const session = await getServerSession(authOptions);
      if (!session) {
        query.status = 'published';
      }
    }
    
    if (category) query.category = category;
    
    let postsQuery = Post.find(query)
      .populate('author', 'name')
      .sort({ publishedAt: -1, createdAt: -1 });
    
    if (limit) {
      postsQuery = postsQuery.limit(parseInt(limit));
    }
    
    const posts = await postsQuery;
    
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST - Create new post (admin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !['admin', 'editor'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    await dbConnect();
    
    const body = await req.json();
    const { title, excerpt, content, imageBase64, category, tags, status, metaTitle, metaDescription } = body;
    
    // Generate slug from title
    const baseSlug = slugify(title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;
    
    while (await Post.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    // Upload featured image to Cloudinary
    let featuredImage = { url: '', publicId: '' };
    if (imageBase64) {
      featuredImage = await uploadImage(imageBase64, 'blog');
    }
    
    const postData: Record<string, unknown> = {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      author: session.user.id,
      category: category || 'News',
      tags: tags || [],
      status: status || 'draft',
      metaTitle,
      metaDescription,
    };
    
    // Set publishedAt if publishing
    if (status === 'published') {
      postData.publishedAt = new Date();
    }
    
    const post = await Post.create(postData);
    
    const populatedPost = await Post.findById(post._id).populate('author', 'name');
    
    return NextResponse.json({ post: populatedPost }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
