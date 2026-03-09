'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import PublicLayout from '@/components/layouts/PublicLayout';
import { fadeUpVariants, viewportSettings } from '@/lib/utils';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featuredImage?: { url: string };
  author?: { name: string };
  category?: string;
  tags?: string[];
  publishedAt?: string;
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${resolvedParams.slug}`);
        if (!res.ok) {
          setError(true);
          return;
        }
        const data = await res.json();
        if (data.post) {
          setPost(data.post);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (resolvedParams.slug) {
      fetchPost();
    }
  }, [resolvedParams.slug]);

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="min-h-screen bg-white flex items-center justify-center pt-32">
          <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full" />
        </div>
      </PublicLayout>
    );
  }

  if (error || !post) {
    return (
      <PublicLayout>
        <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-32">
          <h1 className="text-2xl font-sans uppercase tracking-wide text-luxury-black mb-4">
            Post Not Found
          </h1>
          <p className="text-text-muted font-serif mb-8">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-dark transition-colors font-serif"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <div className="relative h-[60vh] min-h-[400px]">
          {post.featuredImage?.url ? (
            <Image
              src={post.featuredImage.url}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-luxury-dark" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          <div className="absolute inset-0 flex items-end">
            <div className="section-container pb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {post.category && (
                  <span className="inline-block bg-gold text-luxury-black text-xs px-3 py-1 font-serif uppercase tracking-wide mb-4">
                    {post.category}
                  </span>
                )}
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-sans uppercase tracking-wide max-w-4xl">
                  {post.title}
                </h1>
                
                <div className="flex items-center gap-6 mt-6 text-white/80">
                  {post.author?.name && (
                    <span className="flex items-center gap-2 font-serif">
                      <User size={16} />
                      {post.author.name}
                    </span>
                  )}
                  {post.publishedAt && (
                    <span className="flex items-center gap-2 font-serif">
                      <Calendar size={16} />
                      {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                    </span>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content */}
        <section className="section-padding">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUpVariants}
            className="max-w-3xl mx-auto px-4"
          >
            {/* Back Link */}
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-text-muted hover:text-gold transition-colors mb-8 font-serif"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>

            {/* Article Content */}
            {post.content ? (
              <article 
                className="prose prose-lg max-w-none font-serif text-text-muted"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : post.excerpt ? (
              <article className="prose prose-lg max-w-none font-serif text-text-muted">
                <p>{post.excerpt}</p>
              </article>
            ) : null}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag size={16} className="text-text-muted" />
                  {post.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-text-muted text-sm font-serif rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share / Navigation */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 text-gold hover:text-gold-dark transition-colors font-serif uppercase tracking-wide text-sm"
              >
                <ArrowLeft size={14} />
                View All Posts
              </Link>
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-luxury-black">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeUpVariants}
            className="section-container text-center"
          >
            <h2 className="text-section text-white font-sans font-light uppercase tracking-wide mb-6">
              Experience Neoprime
            </h2>
            <p className="text-text-secondary font-serif text-lg max-w-2xl mx-auto mb-8">
              Discover our luxurious accommodations and exceptional hospitality.
            </p>
            <Link
              href="/rooms"
              className="inline-block bg-gold hover:bg-white text-luxury-black px-8 py-4 font-serif uppercase tracking-widest text-sm transition-colors"
            >
              Book Your Stay
            </Link>
          </motion.div>
        </section>
      </main>
    </PublicLayout>
  );
}
