'use client';

import { useEffect, useState, useCallback, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { ArrowLeft, Save, X, Upload, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface EventForm {
  title: string;
  description: string;
  date: string;
  endDate: string;
  time: string;
  location: string;
  imageBase64: string | null;
  imageUrl: string | null;
  ticketLink: string;
  featured: boolean;
  isActive: boolean;
}

export default function AdminEventFormPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const isEditing = resolvedParams.id && resolvedParams.id !== 'new';
  
  const [isLoading, setIsLoading] = useState(!!isEditing);
  const [isSaving, setIsSaving] = useState(false);
  
  const [form, setForm] = useState<EventForm>({
    title: '',
    description: '',
    date: '',
    endDate: '',
    time: '',
    location: 'Neoprime Newcastle',
    imageBase64: null,
    imageUrl: null,
    ticketLink: '',
    featured: false,
    isActive: true,
  });

  useEffect(() => {
    if (isEditing) {
      fetchEvent();
    }
  }, [isEditing]);

  const fetchEvent = async () => {
    try {
      const res = await fetch(`/api/events/${resolvedParams.id}`);
      const data = await res.json();
      if (data.event) {
        setForm({
          ...data.event,
          date: data.event.date?.split('T')[0] || '',
          endDate: data.event.endDate?.split('T')[0] || '',
          imageBase64: null,
          imageUrl: data.event.image?.url || null,
        });
      }
    } catch (error) {
      toast.error('Failed to load event');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.title || !form.date || !form.time) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSaving(true);

    try {
      const url = isEditing ? `/api/events/${resolvedParams.id}` : '/api/events';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success(isEditing ? 'Event updated!' : 'Event created!');
        router.push('/admin/events');
      } else {
        const error = await res.json();
        toast.error(error.error || 'Failed to save event');
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
            {isEditing ? 'Edit Event' : 'New Event'}
          </h1>
          <p className="text-text-muted font-serif mt-1">
            {isEditing ? 'Update event details' : 'Create a new event'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Event Image */}
        <div className="bg-luxury-dark border border-white/10 rounded-lg p-6 space-y-4">
          <h2 className="text-lg text-white font-sans uppercase tracking-wide">Event Image (Optional)</h2>
          
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
              <div className="relative aspect-video max-w-md mx-auto">
                <Image
                  src={form.imageBase64 || form.imageUrl || ''}
                  alt="Event preview"
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
                  or click to select
                </p>
              </>
            )}
          </div>
        </div>

        {/* Event Details */}
        <div className="bg-luxury-dark border border-white/10 rounded-lg p-6 space-y-6">
          <h2 className="text-lg text-white font-sans uppercase tracking-wide">Event Details</h2>
          
          <div>
            <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
              Event Title *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
              placeholder="e.g. New Year's Eve Gala"
            />
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
              placeholder="Describe the event..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                Start Date *
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
                className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                End Date
              </label>
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                Time *
              </label>
              <input
                type="text"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                required
                className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                placeholder="e.g. 7:00 PM - 1:00 AM"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                Location
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                placeholder="e.g. The Ballroom"
              />
            </div>
            
            <div>
              <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                Ticket Link (Optional)
              </label>
              <input
                type="url"
                value={form.ticketLink}
                onChange={(e) => setForm({ ...form, ticketLink: e.target.value })}
                className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                placeholder="https://..."
              />
            </div>
          </div>
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
                {isEditing ? 'Update Event' : 'Create Event'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
