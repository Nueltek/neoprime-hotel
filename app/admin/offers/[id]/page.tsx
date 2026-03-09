'use client';

import { useEffect, useState, useCallback, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Plus, X, Upload, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface OfferForm {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  validity: string;
  includes: string[];
  imageBase64: string | null;
  imageUrl: string | null;
  featured: boolean;
  sortOrder: number;
  isActive: boolean;
}

export default function AdminOfferFormPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const isEditing = resolvedParams.id && resolvedParams.id !== 'new';
  
  const [isLoading, setIsLoading] = useState(!!isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [newInclude, setNewInclude] = useState('');
  
  const [form, setForm] = useState<OfferForm>({
    title: '',
    subtitle: '',
    description: '',
    price: '',
    validity: '',
    includes: [],
    imageBase64: null,
    imageUrl: null,
    featured: false,
    sortOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    if (isEditing) {
      fetchOffer();
    }
  }, [isEditing]);

  const fetchOffer = async () => {
    try {
      const res = await fetch(`/api/offers/${resolvedParams.id}`);
      const data = await res.json();
      if (data.offer) {
        setForm({
          ...data.offer,
          imageBase64: null,
          imageUrl: data.offer.image?.url || null,
          includes: data.offer.includes || [],
        });
      }
    } catch (error) {
      toast.error('Failed to load offer');
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

  const addInclude = () => {
    if (newInclude.trim() && !form.includes.includes(newInclude.trim())) {
      setForm((prev) => ({
        ...prev,
        includes: [...prev.includes, newInclude.trim()],
      }));
      setNewInclude('');
    }
  };

  const removeInclude = (item: string) => {
    setForm((prev) => ({
      ...prev,
      includes: prev.includes.filter((i) => i !== item),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const url = isEditing ? `/api/offers/${resolvedParams.id}` : '/api/offers';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success(isEditing ? 'Offer updated!' : 'Offer created!');
        router.push('/admin/offers');
      } else {
        const error = await res.json();
        toast.error(error.error || 'Failed to save offer');
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
    <div className="max-w-3xl mx-auto space-y-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-white/10 rounded-lg text-text-muted hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl text-white font-sans uppercase tracking-wide">
            {isEditing ? 'Edit Offer' : 'New Offer'}
          </h1>
          <p className="text-text-muted font-serif mt-1">
            {isEditing ? 'Update offer details' : 'Create a new special offer'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div className="bg-luxury-dark border border-white/10 rounded-lg p-6 space-y-4">
          <h2 className="text-lg text-white font-sans uppercase tracking-wide">Offer Image</h2>
          
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragActive 
                ? 'border-gold bg-gold/5' 
                : 'border-white/20 hover:border-gold/50'
            }`}
          >
            <input {...getInputProps()} />
            
            {form.imageBase64 || form.imageUrl ? (
              <div className="relative aspect-[16/9] max-w-md mx-auto">
                <Image
                  src={form.imageBase64 || form.imageUrl || ''}
                  alt="Offer preview"
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
                  <X size={14} />
                </button>
              </div>
            ) : (
              <>
                <Upload className="mx-auto text-text-muted mb-3" size={28} />
                <p className="text-white font-sans mb-1">
                  {isDragActive ? 'Drop image here' : 'Drag & drop an image'}
                </p>
                <p className="text-text-muted text-sm font-serif">
                  or click to select (max 10MB)
                </p>
              </>
            )}
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-luxury-dark border border-white/10 rounded-lg p-6 space-y-6">
          <h2 className="text-lg text-white font-sans uppercase tracking-wide">Offer Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                Title *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                placeholder="e.g. Weekend Escape"
              />
            </div>
            
            <div>
              <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                Subtitle
              </label>
              <input
                type="text"
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                placeholder="e.g. Limited Time Only"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
              Description *
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              rows={3}
              className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none"
              placeholder="Describe what's included..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                Price *
              </label>
              <input
                type="text"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
                className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                placeholder="e.g. From £299 per night"
              />
            </div>
            
            <div>
              <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                Validity *
              </label>
              <input
                type="text"
                value={form.validity}
                onChange={(e) => setForm({ ...form, validity: e.target.value })}
                required
                className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                placeholder="e.g. Valid until March 2025"
              />
            </div>
          </div>
        </div>

        {/* What's Included */}
        <div className="bg-luxury-dark border border-white/10 rounded-lg p-6 space-y-4">
          <h2 className="text-lg text-white font-sans uppercase tracking-wide">What's Included</h2>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={newInclude}
              onChange={(e) => setNewInclude(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInclude())}
              className="flex-1 bg-luxury-black border border-white/20 text-white px-4 py-2 focus:outline-none focus:border-gold transition-colors"
              placeholder="e.g. Overnight accommodation"
            />
            <button
              type="button"
              onClick={addInclude}
              className="px-4 py-2 bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>

          {form.includes.length > 0 && (
            <ul className="space-y-2">
              {form.includes.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between bg-luxury-black/50 px-4 py-2 rounded"
                >
                  <span className="text-white font-serif">{item}</span>
                  <button
                    type="button"
                    onClick={() => removeInclude(item)}
                    className="text-text-muted hover:text-red-400 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </motion.li>
              ))}
            </ul>
          )}
        </div>

        {/* Settings */}
        <div className="bg-luxury-dark border border-white/10 rounded-lg p-6 space-y-4">
          <h2 className="text-lg text-white font-sans uppercase tracking-wide">Settings</h2>
          
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                className="w-5 h-5 rounded border-white/20 bg-luxury-black text-gold focus:ring-gold"
              />
              <span className="text-white font-sans">Active</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="w-5 h-5 rounded border-white/20 bg-luxury-black text-gold focus:ring-gold"
              />
              <span className="text-white font-sans">Featured</span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-white/20 text-white font-sans uppercase tracking-wide hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold-dark text-luxury-black font-sans uppercase tracking-wide transition-colors disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                {isEditing ? 'Update Offer' : 'Create Offer'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
