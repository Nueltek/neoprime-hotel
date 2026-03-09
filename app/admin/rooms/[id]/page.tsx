'use client';

import { useEffect, useState, useCallback, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  X, 
  Upload, 
  ImageIcon,
  Loader2
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface RoomImage {
  url?: string;
  publicId?: string;
  base64?: string;
  caption?: string;
  type: string;
  isNew?: boolean;
}

interface RoomForm {
  title: string;
  subtitle: string;
  description: string;
  price: number;
  size: string;
  bedType: string;
  maxGuests: number;
  amenities: string[];
  images: RoomImage[];
  featured: boolean;
  sortOrder: number;
  isActive: boolean;
}

const imageTypes = [
  { value: 'main', label: 'Main Image' },
  { value: 'bedroom', label: 'Bedroom' },
  { value: 'bathroom', label: 'Bathroom' },
  { value: 'balcony', label: 'Balcony / View' },
  { value: 'workspace', label: 'Workspace' },
  { value: 'other', label: 'Other' },
];

const defaultAmenities = [
  'King-size bed',
  'Rainfall shower',
  'Smart TV',
  'Nespresso machine',
  'High-speed WiFi',
  'Air conditioning',
  'Room service',
  'Minibar',
  'Safe',
  'Iron & board',
];

export default function AdminRoomFormPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const isEditing = resolvedParams.id && resolvedParams.id !== 'new';
  
  const [isLoading, setIsLoading] = useState(!!isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [newAmenity, setNewAmenity] = useState('');
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  
  const [form, setForm] = useState<RoomForm>({
    title: '',
    subtitle: '',
    description: '',
    price: 0,
    size: '',
    bedType: '',
    maxGuests: 2,
    amenities: [],
    images: [],
    featured: false,
    sortOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    if (isEditing) {
      fetchRoom();
    }
  }, [isEditing]);

  const fetchRoom = async () => {
    try {
      const res = await fetch(`/api/rooms/${resolvedParams.id}`);
      const data = await res.json();
      if (data.room) {
        setForm({
          ...data.room,
          images: data.room.images || [],
        });
      }
    } catch (error) {
      toast.error('Failed to load room');
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setForm((prev) => ({
          ...prev,
          images: [
            ...prev.images,
            {
              base64,
              caption: '',
              type: prev.images.length === 0 ? 'main' : 'other',
              isNew: true,
            },
          ],
        }));
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeImage = (index: number) => {
    const image = form.images[index];
    if (image.publicId && !image.isNew) {
      setImagesToDelete([...imagesToDelete, image.publicId]);
    }
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const updateImageType = (index: number, type: string) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.map((img, i) => 
        i === index ? { ...img, type } : img
      ),
    }));
  };

  const addAmenity = () => {
    if (newAmenity.trim() && !form.amenities.includes(newAmenity.trim())) {
      setForm((prev) => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()],
      }));
      setNewAmenity('');
    }
  };

  const removeAmenity = (amenity: string) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((a) => a !== amenity),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const newImages = form.images.filter((img) => img.isNew);
      const existingImages = form.images.filter((img) => !img.isNew);

      const payload = {
        ...form,
        images: existingImages.map(({ base64, isNew, ...rest }) => rest),
        newImages: newImages.map((img) => ({
          base64: img.base64,
          caption: img.caption,
          type: img.type,
        })),
        imagesToDelete,
      };

      const url = isEditing ? `/api/rooms/${resolvedParams.id}` : '/api/rooms';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(isEditing ? 'Room updated!' : 'Room created!');
        router.push('/admin/rooms');
      } else {
        const error = await res.json();
        toast.error(error.error || 'Failed to save room');
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
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-white/10 rounded-lg text-text-muted hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl text-white font-sans uppercase tracking-wide">
            {isEditing ? 'Edit Room' : 'New Room'}
          </h1>
          <p className="text-text-muted font-serif mt-1">
            {isEditing ? 'Update room details and images' : 'Add a new room to your hotel'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-luxury-dark border border-white/10 rounded-lg p-6 space-y-6">
          <h2 className="text-lg text-white font-sans uppercase tracking-wide">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                Room Title *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                placeholder="e.g. Deluxe Suite"
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
                placeholder="e.g. Premium Accommodation"
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
              rows={4}
              className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none"
              placeholder="Describe the room..."
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                Price (£) *
              </label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 0 })}
                required
                min="0"
                className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                Size *
              </label>
              <input
                type="text"
                value={form.size}
                onChange={(e) => setForm({ ...form, size: e.target.value })}
                required
                className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                placeholder="e.g. 32-38 m²"
              />
            </div>
            
            <div>
              <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                Bed Type *
              </label>
              <input
                type="text"
                value={form.bedType}
                onChange={(e) => setForm({ ...form, bedType: e.target.value })}
                required
                className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                placeholder="e.g. Super King"
              />
            </div>
            
            <div>
              <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                Max Guests
              </label>
              <input
                type="number"
                value={form.maxGuests}
                onChange={(e) => setForm({ ...form, maxGuests: parseInt(e.target.value) || 2 })}
                min="1"
                max="10"
                className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-luxury-dark border border-white/10 rounded-lg p-6 space-y-6">
          <h2 className="text-lg text-white font-sans uppercase tracking-wide">Images</h2>
          
          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive 
                ? 'border-gold bg-gold/5' 
                : 'border-white/20 hover:border-gold/50'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto text-text-muted mb-4" size={32} />
            <p className="text-white font-sans mb-2">
              {isDragActive ? 'Drop images here' : 'Drag & drop images here'}
            </p>
            <p className="text-text-muted text-sm font-serif">
              or click to select files (max 10MB each)
            </p>
          </div>

          {/* Image Grid */}
          {form.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence>
                {form.images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative group"
                  >
                    <div className="aspect-square rounded-lg overflow-hidden bg-luxury-black">
                      {image.base64 || image.url ? (
                        <Image
                          src={image.base64 || image.url || ''}
                          alt={`Room image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="text-text-muted" size={32} />
                        </div>
                      )}
                    </div>
                    
                    {/* Image Type Selector */}
                    <select
                      value={image.type}
                      onChange={(e) => updateImageType(index, e.target.value)}
                      className="absolute bottom-2 left-2 right-10 bg-luxury-black/80 backdrop-blur text-white text-xs px-2 py-1 rounded border border-white/20"
                    >
                      {imageTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    
                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                    
                    {/* Main Badge */}
                    {index === 0 && (
                      <span className="absolute top-2 left-2 bg-gold text-luxury-black text-xs px-2 py-0.5 rounded">
                        Main
                      </span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Amenities */}
        <div className="bg-luxury-dark border border-white/10 rounded-lg p-6 space-y-6">
          <h2 className="text-lg text-white font-sans uppercase tracking-wide">Amenities</h2>
          
          {/* Quick Add Buttons */}
          <div className="flex flex-wrap gap-2">
            {defaultAmenities.map((amenity) => (
              <button
                key={amenity}
                type="button"
                onClick={() => {
                  if (!form.amenities.includes(amenity)) {
                    setForm({ ...form, amenities: [...form.amenities, amenity] });
                  }
                }}
                disabled={form.amenities.includes(amenity)}
                className={`px-3 py-1.5 text-sm rounded border transition-colors ${
                  form.amenities.includes(amenity)
                    ? 'border-gold/50 text-gold bg-gold/10 cursor-not-allowed'
                    : 'border-white/20 text-text-muted hover:border-gold hover:text-white'
                }`}
              >
                + {amenity}
              </button>
            ))}
          </div>

          {/* Custom Amenity Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newAmenity}
              onChange={(e) => setNewAmenity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
              className="flex-1 bg-luxury-black border border-white/20 text-white px-4 py-2 focus:outline-none focus:border-gold transition-colors"
              placeholder="Add custom amenity..."
            />
            <button
              type="button"
              onClick={addAmenity}
              className="px-4 py-2 bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>

          {/* Selected Amenities */}
          {form.amenities.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {form.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold/10 text-gold rounded"
                >
                  {amenity}
                  <button
                    type="button"
                    onClick={() => removeAmenity(amenity)}
                    className="hover:text-white transition-colors"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="bg-luxury-dark border border-white/10 rounded-lg p-6 space-y-6">
          <h2 className="text-lg text-white font-sans uppercase tracking-wide">Settings</h2>
          
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                className="w-5 h-5 rounded border-white/20 bg-luxury-black text-gold focus:ring-gold"
              />
              <span className="text-white font-sans">Active (visible on website)</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="w-5 h-5 rounded border-white/20 bg-luxury-black text-gold focus:ring-gold"
              />
              <span className="text-white font-sans">Featured Room</span>
            </label>
          </div>

          <div className="w-32">
            <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
              Sort Order
            </label>
            <input
              type="number"
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
              className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
            />
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
                {isEditing ? 'Update Room' : 'Create Room'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
