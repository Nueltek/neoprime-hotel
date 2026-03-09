'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, FileText, Clock, Send } from 'lucide-react';
import { format } from 'date-fns';
import toast, { Toaster } from 'react-hot-toast';

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: { url: string; publicId: string };
  author: { name: string };
  category: string;
  status: 'draft' | 'published';
  publishedAt: string | null;
  viewCount: number;
  createdAt: string;
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  const fetchPosts = async () => {
    try {
      const url = filter === 'all' ? '/api/posts' : `/api/posts?status=${filter}`;
      const res = await fetch(url);
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load posts');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Post deleted successfully');
        setPosts(posts.filter(p => p._id !== id));
      } else {
        toast.error('Failed to delete post');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    return post.status === filter;
  });

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-white font-sans uppercase tracking-wide">Blog & Press</h1>
          <p className="text-text-muted font-serif mt-1">Manage your blog posts and news articles</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-luxury-black px-4 py-2 font-sans uppercase tracking-wide text-sm transition-colors"
        >
          <Plus size={18} />
          New Post
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(['all', 'published', 'draft'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-lg font-sans text-sm capitalize transition-colors ${
              filter === tab
                ? 'bg-gold text-luxury-black'
                : 'bg-luxury-dark text-text-muted hover:text-white border border-white/10'
            }`}
          >
            {tab}
            {tab !== 'all' && (
              <span className="ml-2 opacity-60">
                ({posts.filter(p => p.status === tab).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="bg-luxury-dark border border-white/10 rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full mx-auto" />
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="mx-auto text-text-muted mb-4" size={40} />
            <p className="text-text-muted font-serif mb-4">No posts found</p>
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
            >
              <Plus size={18} />
              Create your first post
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-24 h-16 bg-luxury-black rounded overflow-hidden flex-shrink-0">
                    {post.featuredImage?.url && (
                      <Image
                        src={post.featuredImage.url}
                        alt={post.title}
                        width={96}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-white font-sans truncate">{post.title}</h3>
                        <p className="text-text-muted text-sm font-serif line-clamp-1 mt-1">
                          {post.excerpt}
                        </p>
                      </div>
                      
                      {/* Status Badge */}
                      <span className={`flex-shrink-0 inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded ${
                        post.status === 'published'
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-yellow-500/10 text-yellow-400'
                      }`}>
                        {post.status === 'published' ? <Send size={12} /> : <Clock size={12} />}
                        {post.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-4 mt-2 text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <span className="font-sans uppercase">{post.category}</span>
                      </span>
                      <span>•</span>
                      <span className="font-serif">
                        {post.publishedAt 
                          ? format(new Date(post.publishedAt), 'MMM d, yyyy')
                          : format(new Date(post.createdAt), 'MMM d, yyyy')
                        }
                      </span>
                      {post.status === 'published' && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1 font-serif">
                            <Eye size={12} />
                            {post.viewCount} views
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {post.status === 'published' && (
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-2 hover:bg-white/10 rounded text-text-muted hover:text-white transition-colors"
                        title="View post"
                      >
                        <Eye size={16} />
                      </Link>
                    )}
                    <Link
                      href={`/admin/posts/${post._id}`}
                      className="p-2 hover:bg-white/10 rounded text-text-muted hover:text-white transition-colors"
                      title="Edit post"
                    >
                      <Edit size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(post._id)}
                      disabled={deletingId === post._id}
                      className="p-2 hover:bg-red-500/10 rounded text-text-muted hover:text-red-400 transition-colors disabled:opacity-50"
                      title="Delete post"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
