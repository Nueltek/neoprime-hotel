'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Upload, X, Plus, Building } from 'lucide-react';
import toast from 'react-hot-toast';

interface Space {
  _id: string;
  title: string;
  subtitle?: string;
  description: string;
  capacity: {
    theatre?: number;
    classroom?: number;
    boardroom?: number;
    reception?: number;
    banquet?: number;
  };
  size?: string;
  features: string[];
  image?: { url: string; publicId: string };
  priceFrom?: string;
  featured: boolean;
  sortOrder: number;
  isActive: boolean;
}

const defaultCapacity = {
  theatre: 0,
  classroom: 0,
  boardroom: 0,
  reception: 0,
  banquet: 0,
};

const defaultFeatures = [
  'Natural daylight',
  'Blackout blinds',
  'Built-in AV system',
  'Wireless presentation',
  'Video conferencing',
  'Breakout area',
  'Private entrance',
  'Catering available',
];

export default function AdminSpaceEditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const isNew = resolvedParams.id === 'new';
  
  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState(defaultCapacity);
  const [size, setSize] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [customFeature, setCustomFeature] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [featured, setFeatured] = useState(false);
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<{ url: string; publicId: string } | null>(null);

  useEffect(() => {
    if (!isNew) {
      fetchSpace();
    }
  }, [isNew, resolvedParams.id]);

  const fetchSpace = async () => {
    try {
      const res = await fetch(`/api/spaces/${resolvedParams.id}`);
      const data = await res.json();
      
      if (data.space) {
        const space: Space = data.space;
        setTitle(space.title);
        setSubtitle(space.subtitle || '');
        setDescription(space.description);
        setCapacity({ ...defaultCapacity, ...space.capacity });
        setSize(space.size || '');
        setFeatures(space.features || []);
        setPriceFrom(space.priceFrom || '');
        setFeatured(space.featured);
        setSortOrder(space.sortOrder);
        setIsActive(space.isActive);
        if (space.image?.url) {
          setExistingImage(space.image);
          setImagePreview(space.image.url);
        }
      }
    } catch (error) {
      console.error('Error fetching space:', error);
      toast.error('Failed to load space');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImageBase64(base64);
      setImagePreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageBase64(null);
    setExistingImage(null);
  };

  const toggleFeature = (feature: string) => {
    setFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const addCustomFeature = () => {
    if (customFeature.trim() && !features.includes(customFeature.trim())) {
      setFeatures([...features, customFeature.trim()]);
      setCustomFeature('');
    }
  };

  const updateCapacity = (type: keyof typeof capacity, value: string) => {
    setCapacity(prev => ({
      ...prev,
      [type]: value ? parseInt(value) : 0
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description) {
      toast.error('Please fill in required fields');
      return;
    }
    
    setIsSaving(true);
    
    try {
      const payload: Record<string, unknown> = {
        title,
        subtitle,
        description,
        capacity,
        size,
        features,
        priceFrom,
        featured,
        sortOrder,
        isActive,
      };
      
      if (imageBase64) {
        payload.imageBase64 = imageBase64;
      }
      
      const res = await fetch(
        isNew ? '/api/spaces' : `/api/spaces/${resolvedParams.id}`,
        {
          method: isNew ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );
      
      if (res.ok) {
        toast.success(isNew ? 'Space created!' : 'Space updated!');
        router.push('/admin/spaces');
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      toast.error('Failed to save space');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/spaces"
          className="p-2 text-text-muted hover:text-white transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-sans text-white uppercase tracking-wide">
            {isNew ? 'Add Space' : 'Edit Space'}
          </h1>
          <p className="text-text-muted text-sm mt-1">
            {isNew ? 'Create a new meeting or event space' : 'Update space details'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Image Upload */}
        <div className="bg-luxury-dark border border-white/10 rounded-lg p-6">
          <h2 className="text-white font-sans uppercase tracking-wide mb-4">Space Image</h2>
          
          {imagePreview ? (
            <div className="relative aspect-[16/9] max-w-xl rounded-lg overflow-hidden">
              <Image src={imagePreview} alt="Preview" fill className="object-cover" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center aspect-[16/9] max-w-xl border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-gold/50 transition-colors">
              <Upload className="w-12 h-12 text-text-muted mb-4" />
              <span className="text-text-muted">Click to upload image</span>
              <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
            </label>
          )}
        </div>

        {/* Basic Info */}
        <div className="bg-luxury-dark border border-white/10 rounded-lg p-6">
          <h2 className="text-white font-sans uppercase tracking-wide mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-text-muted text-sm mb-2">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 rounded focus:outline-none focus:border-gold"
                placeholder="e.g., The Grand Ballroom"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-text-muted text-sm mb-2">Subtitle</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 rounded focus:outline-none focus:border-gold"
                placeholder="e.g., Our Largest Event Space"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-text-muted text-sm mb-2">Description *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 rounded focus:outline-none focus:border-gold resize-none"
                placeholder="Describe the space..."
                required
              />
            </div>
            
            <div>
              <label className="block text-text-muted text-sm mb-2">Size</label>
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 rounded focus:outline-none focus:border-gold"
                placeholder="e.g., 500 m²"
              />
            </div>
            
            <div>
              <label className="block text-text-muted text-sm mb-2">Starting Price</label>
              <input
                type="text"
                value={priceFrom}
                onChange={(e) => setPriceFrom(e.target.value)}
                className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 rounded focus:outline-none focus:border-gold"
                placeholder="e.g., From £2,500"
              />
            </div>
          </div>
        </div>

        {/* Capacity */}
        <div className="bg-luxury-dark border border-white/10 rounded-lg p-6">
          <h2 className="text-white font-sans uppercase tracking-wide mb-4">Capacity</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(capacity).map(([type, value]) => (
              <div key={type}>
                <label className="block text-text-muted text-xs uppercase tracking-wide mb-2">
                  {type}
                </label>
                <input
                  type="number"
                  value={value || ''}
                  onChange={(e) => updateCapacity(type as keyof typeof capacity, e.target.value)}
                  className="w-full bg-luxury-black border border-white/20 text-white px-3 py-2 rounded focus:outline-none focus:border-gold text-center"
                  placeholder="0"
                  min="0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-luxury-dark border border-white/10 rounded-lg p-6">
          <h2 className="text-white font-sans uppercase tracking-wide mb-4">Features</h2>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {defaultFeatures.map((feature) => (
              <button
                key={feature}
                type="button"
                onClick={() => toggleFeature(feature)}
                className={`px-3 py-1.5 text-sm rounded transition-colors ${
                  features.includes(feature)
                    ? 'bg-gold text-luxury-black'
                    : 'bg-luxury-black border border-white/20 text-text-muted hover:border-gold'
                }`}
              >
                {feature}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={customFeature}
              onChange={(e) => setCustomFeature(e.target.value)}
              className="flex-1 bg-luxury-black border border-white/20 text-white px-4 py-2 rounded focus:outline-none focus:border-gold"
              placeholder="Add custom feature..."
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomFeature())}
            />
            <button
              type="button"
              onClick={addCustomFeature}
              className="px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20"
            >
              <Plus size={20} />
            </button>
          </div>
          
          {features.filter(f => !defaultFeatures.includes(f)).length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {features.filter(f => !defaultFeatures.includes(f)).map((feature) => (
                <span
                  key={feature}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-gold text-luxury-black text-sm rounded"
                >
                  {feature}
                  <button type="button" onClick={() => toggleFeature(feature)}>
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="bg-luxury-dark border border-white/10 rounded-lg p-6">
          <h2 className="text-white font-sans uppercase tracking-wide mb-4">Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-text-muted text-sm mb-2">Sort Order</label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
                className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 rounded focus:outline-none focus:border-gold"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-5 h-5 rounded border-white/20 bg-luxury-black text-gold focus:ring-gold"
              />
              <label htmlFor="featured" className="text-white">Featured</label>
            </div>
            
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isActive"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-5 h-5 rounded border-white/20 bg-luxury-black text-gold focus:ring-gold"
              />
              <label htmlFor="isActive" className="text-white">Active</label>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/admin/spaces"
            className="px-6 py-3 border border-white/20 text-white font-sans uppercase tracking-wider hover:bg-white/5 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3 bg-gold text-luxury-black font-sans uppercase tracking-wider hover:bg-white transition-colors disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : isNew ? 'Create Space' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
