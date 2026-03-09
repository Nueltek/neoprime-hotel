'use client';

import { useEffect, useState, useCallback, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useDropzone } from 'react-dropzone';
import { ArrowLeft, Save, X, Upload, Loader2, Send } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Dynamic import for TinyMCE to avoid SSR issues
const Editor = dynamic(() => import('@tinymce/tinymce-react').then(mod => mod.Editor), { 
  ssr: false,
  loading: () => <div className="h-64 bg-luxury-black animate-pulse rounded" />
});

interface PostForm {
  title: string;
  excerpt: string;
  content: string;
  imageBase64: string | null;
  imageUrl: string | null;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  metaTitle: string;
  metaDescription: string;
}

const categories = ['News', 'Events', 'Dining', 'Travel', 'Lifestyle', 'Press Release'];

export default function AdminPostFormPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const isEditing = resolvedParams.id && resolvedParams.id !== 'new';
  
  const [isLoading, setIsLoading] = useState(!!isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [showSEO, setShowSEO] = useState(false);
  
  const [form, setForm] = useState<PostForm>({
    title: '',
    excerpt: '',
    content: '',
    imageBase64: null,
    imageUrl: null,
    category: 'News',
    tags: [],
    status: 'draft',
    metaTitle: '',
    metaDescription: '',
  });

  useEffect(() => {
    if (isEditing) {
      fetchPost();
    }
  }, [isEditing]);

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/posts/${resolvedParams.id}`);
      const data = await res.json();
      if (data.post) {
        setForm({
          ...data.post,
          imageBase64: null,
          imageUrl: data.post.featuredImage?.url || null,
          tags: data.post.tags || [],
        });
      }
    } catch (error) {
      toast.error('Failed to load post');
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm((prev) => ({
          ...prev,
          imageBase64: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxSize: 10 * 1024 * 1024,
    maxFiles: 1,
  });

  const addTag = () => {
    if (newTag.trim() && !form.tags.includes(newTag.trim())) {
      setForm((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = async (status: 'draft' | 'published') => {
    if (!form.title || !form.excerpt || !form.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSaving(true);

    try {
      const url = isEditing ? `/api/posts/${resolvedParams.id}` : '/api/posts';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, status }),
      });

      if (res.ok) {
        toast.success(
          status === 'published' 
            ? 'Post published!' 
            : isEditing ? 'Draft saved!' : 'Draft created!'
        );
        router.push('/admin/posts');
      } else {
        const error = await res.json();
        toast.error(error.error || 'Failed to save post');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin text-gold" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-white/10 rounded-lg text-text-muted hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl text-white font-sans uppercase tracking-wide">
              {isEditing ? 'Edit Post' : 'New Post'}
            </h1>
            <p className="text-text-muted font-serif mt-1">
              {form.status === 'published' ? 'Published' : 'Draft'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSubmit('draft')}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 border border-white/20 text-white font-sans uppercase tracking-wide text-sm hover:bg-white/5 transition-colors disabled:opacity-50"
          >
            <Save size={16} />
            Save Draft
          </button>
          <button
            onClick={() => handleSubmit('published')}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-gold hover:bg-gold-dark text-luxury-black font-sans uppercase tracking-wide text-sm transition-colors disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Send size={16} />
            )}
            Publish
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-luxury-dark border border-white/10 rounded-lg p-6">
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Post title..."
              className="w-full bg-transparent text-2xl text-white focus:outline-none placeholder:text-text-muted/50 font-sans"
            />
          </div>

          {/* Excerpt */}
          <div className="bg-luxury-dark border border-white/10 rounded-lg p-6">
            <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
              Excerpt *
            </label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value.slice(0, 300) })}
              rows={3}
              placeholder="Brief summary of the post..."
              className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none"
            />
            <p className="text-text-muted text-xs mt-2">
              {form.excerpt.length}/300 characters
            </p>
          </div>

          {/* Content Editor - TinyMCE */}
          <div className="bg-luxury-dark border border-white/10 rounded-lg p-6">
            <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
              Content *
            </label>
            <p className="text-text-muted text-xs mb-4 font-serif">
              Note: Get a free TinyMCE API key at <a href="https://www.tiny.cloud/auth/signup/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">tiny.cloud</a> and add it to your .env file as NEXT_PUBLIC_TINYMCE_API_KEY
            </p>
            <div className="prose-editor">
              <Editor
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'no-api-key'}
                value={form.content}
                onEditorChange={(content) => setForm({ ...form, content })}
                init={{
                  height: 400,
                  menubar: false,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'link image | removeformat | code help',
                  content_style: `
                    body { 
                      font-family: Georgia, serif; 
                      font-size: 16px; 
                      line-height: 1.7;
                      color: #fff;
                      background: #0A0B10;
                      padding: 16px;
                    }
                    a { color: #C6A56A; }
                    h1, h2, h3, h4, h5, h6 { font-family: sans-serif; }
                  `,
                  skin: 'oxide-dark',
                  content_css: 'dark',
                  placeholder: 'Write your post content...',
                  branding: false,
                }}
              />
            </div>
          </div>

          {/* SEO Section */}
          <div className="bg-luxury-dark border border-white/10 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setShowSEO(!showSEO)}
              className="w-full p-4 flex items-center justify-between text-white hover:bg-white/5 transition-colors"
            >
              <span className="font-sans uppercase tracking-wide">SEO Settings</span>
              <span className="text-text-muted">{showSEO ? '−' : '+'}</span>
            </button>
            
            {showSEO && (
              <div className="p-6 pt-0 space-y-4 border-t border-white/10">
                <div>
                  <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={form.metaTitle}
                    onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                    className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                    placeholder="Custom title for search engines..."
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                    Meta Description
                  </label>
                  <textarea
                    value={form.metaDescription}
                    onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                    rows={2}
                    className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none"
                    placeholder="Custom description for search engines..."
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Featured Image */}
          <div className="bg-luxury-dark border border-white/10 rounded-lg p-6">
            <h3 className="text-sm text-white font-sans uppercase tracking-wide mb-4">
              Featured Image
            </h3>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                isDragActive 
                  ? 'border-gold bg-gold/5' 
                  : 'border-white/20 hover:border-gold/50'
              }`}
            >
              <input {...getInputProps()} />
              
              {form.imageBase64 || form.imageUrl ? (
                <div className="relative aspect-video">
                  <Image
                    src={form.imageBase64 || form.imageUrl || ''}
                    alt="Featured image"
                    fill
                    className="object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setForm({ ...form, imageBase64: null, imageUrl: null });
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="mx-auto text-text-muted mb-2" size={24} />
                  <p className="text-text-muted text-sm font-serif">
                    Drop image or click
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="bg-luxury-dark border border-white/10 rounded-lg p-6">
            <h3 className="text-sm text-white font-sans uppercase tracking-wide mb-4">
              Category
            </h3>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="bg-luxury-dark border border-white/10 rounded-lg p-6">
            <h3 className="text-sm text-white font-sans uppercase tracking-wide mb-4">
              Tags
            </h3>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 bg-luxury-black border border-white/20 text-white px-3 py-2 text-sm focus:outline-none focus:border-gold transition-colors"
                placeholder="Add tag..."
              />
              <button
                type="button"
                onClick={addTag}
                className="px-3 py-2 bg-white/10 text-white hover:bg-white/20 transition-colors text-sm"
              >
                Add
              </button>
            </div>
            
            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-gold/10 text-gold text-xs rounded"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-white transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
