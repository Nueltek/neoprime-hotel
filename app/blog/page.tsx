'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import PublicLayout from '@/components/layouts/PublicLayout';
import PageHero from '@/components/ui/PageHero';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featuredImage?: { url: string };
  author?: { name: string };
  category?: string;
  publishedAt?: string;
  createdAt?: string;
}

// Static fallback posts - ALWAYS display if DB is empty
const STATIC_POSTS: Post[] = [
  {
    _id: 'static-1',
    title: 'A New Chapter for Neoprime Newcastle',
    slug: 'new-chapter-neoprime-newcastle',
    excerpt: 'We are thrilled to announce the completion of our latest renovation, bringing a fresh perspective to luxury hospitality in the heart of Newcastle.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80' },
    author: { name: 'Neoprime Team' },
    category: 'News',
    publishedAt: new Date().toISOString(),
  },
  {
    _id: 'static-2',
    title: 'Award-Winning Dining at The Neoprime Grill',
    slug: 'award-winning-dining-neoprime-grill',
    excerpt: 'The Neoprime Grill has been recognized with two prestigious accolades this season, cementing our position as a leading culinary destination.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80' },
    author: { name: 'Neoprime Team' },
    category: 'Press',
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'static-3',
    title: 'Sustainability Initiatives at Neoprime Hotels',
    slug: 'sustainability-initiatives-neoprime',
    excerpt: 'Our journey towards a more sustainable future continues with new initiatives that reduce our environmental footprint while enhancing the guest experience.',
    featuredImage: { url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80' },
    author: { name: 'Neoprime Team' },
    category: 'News',
    publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

function formatDate(dateString?: string): string {
  if (!dateString) return 'Recently';
  try {
    return format(new Date(dateString), 'MMM d, yyyy');
  } catch {
    return 'Recently';
  }
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>(STATIC_POSTS);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts?status=published');
        
        if (res.ok) {
          const data = await res.json();
          if (data.posts && Array.isArray(data.posts) && data.posts.length > 0) {
            setPosts(data.posts);
          }
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <PublicLayout>
      <main style={{ minHeight: '100vh', backgroundColor: '#0A0B10' }}>
        <PageHero
          title="News & Stories"
          subtitle="Blog"
          image="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&q=80"
          height="medium"
        />

        {/* Posts Section */}
        <section style={{ backgroundColor: '#FFFFFF', padding: '64px 0' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
            {/* Section Header */}
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p style={{ 
                color: '#C6A56A', 
                fontSize: '12px', 
                letterSpacing: '0.2em', 
                textTransform: 'uppercase',
                marginBottom: '16px'
              }}>
                Latest Updates
              </p>
              <h2 style={{ 
                color: '#0A0B10', 
                fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                fontWeight: 300,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                From the Hotel
              </h2>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 0' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  border: '2px solid #C6A56A',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
              </div>
            ) : (
              /* Posts Grid */
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '32px'
              }}>
                {posts.map((post) => {
                  const isStatic = post._id.startsWith('static-');
                  const href = isStatic ? '/blog' : `/blog/${post.slug}`;
                  
                  return (
                    <article key={post._id} style={{ backgroundColor: '#FFFFFF' }}>
                      <Link href={href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                        {/* Image */}
                        <div style={{ 
                          position: 'relative', 
                          aspectRatio: '16/10', 
                          overflow: 'hidden',
                          marginBottom: '24px',
                          backgroundColor: '#F3F4F6'
                        }}>
                          {post.featuredImage?.url ? (
                            <Image
                              src={post.featuredImage.url}
                              alt={post.title}
                              fill
                              style={{ objectFit: 'cover' }}
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          ) : (
                            <div style={{ 
                              position: 'absolute', 
                              inset: 0, 
                              backgroundColor: '#111318',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#9C9C9C'
                            }}>
                              No image
                            </div>
                          )}
                          {post.category && (
                            <span style={{
                              position: 'absolute',
                              top: '16px',
                              left: '16px',
                              backgroundColor: '#C6A56A',
                              color: '#0A0B10',
                              fontSize: '11px',
                              padding: '4px 12px',
                              textTransform: 'uppercase',
                              letterSpacing: '0.1em'
                            }}>
                              {post.category}
                            </span>
                          )}
                        </div>

                        {/* Meta */}
                        <div style={{ 
                          display: 'flex', 
                          gap: '16px', 
                          marginBottom: '16px',
                          color: '#6B7280',
                          fontSize: '14px'
                        }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Calendar size={14} />
                            {formatDate(post.publishedAt || post.createdAt)}
                          </span>
                          {post.author?.name && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <User size={14} />
                              {post.author.name}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 style={{ 
                          fontSize: '18px',
                          color: '#111827',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          marginBottom: '12px',
                          fontWeight: 400
                        }}>
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        {post.excerpt && (
                          <p style={{ 
                            color: '#6B7280',
                            lineHeight: 1.7,
                            marginBottom: '16px',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {post.excerpt}
                          </p>
                        )}

                        {/* Read More */}
                        <span style={{ 
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          color: '#C6A56A',
                          fontSize: '14px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em'
                        }}>
                          Read More
                          <ArrowRight size={14} />
                        </span>
                      </Link>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section style={{ backgroundColor: '#111318', padding: '64px 0' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
            <p style={{ 
              color: '#C6A56A', 
              fontSize: '12px', 
              letterSpacing: '0.2em', 
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}>
              Stay Connected
            </p>
            <h2 style={{ 
              color: '#FFFFFF', 
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: 300,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '24px'
            }}>
              Subscribe to Our Newsletter
            </h2>
            <p style={{ 
              color: '#9C9C9C',
              marginBottom: '32px',
              maxWidth: '600px',
              margin: '0 auto 32px'
            }}>
              Be the first to know about our latest offers, events, and news from Neoprime Hotels.
            </p>
            <form style={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: '16px',
              maxWidth: '400px',
              margin: '0 auto'
            }}>
              <input
                type="email"
                placeholder="Your email address"
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#FFFFFF',
                  padding: '12px 16px',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: '#C6A56A',
                  color: '#0A0B10',
                  padding: '12px 24px',
                  border: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'pointer'
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
