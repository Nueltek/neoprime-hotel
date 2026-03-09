'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit, Trash2, Users, Star, ToggleLeft, ToggleRight, Building } from 'lucide-react';
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
  image?: { url: string };
  priceFrom?: string;
  featured: boolean;
  isActive: boolean;
}

export default function AdminSpacesPage() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {
    try {
      const res = await fetch('/api/spaces?active=all');
      const data = await res.json();
      setSpaces(data.spaces || []);
    } catch (error) {
      console.error('Error fetching spaces:', error);
      toast.error('Failed to load spaces');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/spaces/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      
      if (res.ok) {
        setSpaces(spaces.map(s => s._id === id ? { ...s, isActive: !currentStatus } : s));
        toast.success(`Space ${!currentStatus ? 'activated' : 'deactivated'}`);
      }
    } catch (error) {
      toast.error('Failed to update space');
    }
  };

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/spaces/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !currentStatus }),
      });
      
      if (res.ok) {
        setSpaces(spaces.map(s => s._id === id ? { ...s, featured: !currentStatus } : s));
        toast.success(`Space ${!currentStatus ? 'featured' : 'unfeatured'}`);
      }
    } catch (error) {
      toast.error('Failed to update space');
    }
  };

  const deleteSpace = async (id: string) => {
    if (!confirm('Are you sure you want to delete this space?')) return;
    
    try {
      const res = await fetch(`/api/spaces/${id}`, { method: 'DELETE' });
      
      if (res.ok) {
        setSpaces(spaces.filter(s => s._id !== id));
        toast.success('Space deleted');
      }
    } catch (error) {
      toast.error('Failed to delete space');
    }
  };

  const getMaxCapacity = (capacity: Space['capacity']) => {
    const values = Object.values(capacity).filter(v => v !== undefined) as number[];
    return values.length > 0 ? Math.max(...values) : 0;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-sans text-white uppercase tracking-wide">
            Meeting Spaces
          </h1>
          <p className="text-text-muted text-sm mt-1">
            Manage your meeting rooms, event halls, and conference spaces
          </p>
        </div>
        <Link
          href="/admin/spaces/new"
          className="flex items-center gap-2 px-4 py-2 bg-gold text-luxury-black font-sans text-sm uppercase tracking-wider hover:bg-white transition-colors"
        >
          <Plus size={18} />
          Add Space
        </Link>
      </div>

      {/* Spaces Grid */}
      {spaces.length === 0 ? (
        <div className="bg-luxury-dark border border-white/10 rounded-lg p-12 text-center">
          <Building className="w-12 h-12 text-text-muted mx-auto mb-4" />
          <h3 className="text-white font-sans text-lg mb-2">No spaces yet</h3>
          <p className="text-text-muted mb-6">Add your first meeting space or event venue.</p>
          <Link
            href="/admin/spaces/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-luxury-black font-sans text-sm uppercase tracking-wider hover:bg-white transition-colors"
          >
            <Plus size={18} />
            Add Space
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spaces.map((space) => (
            <div
              key={space._id}
              className={`bg-luxury-dark border rounded-lg overflow-hidden transition-all ${
                space.isActive ? 'border-white/10' : 'border-red-500/30 opacity-60'
              }`}
            >
              {/* Image */}
              <div className="relative aspect-[16/10]">
                {space.image?.url ? (
                  <Image
                    src={space.image.url}
                    alt={space.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-luxury-black/50 flex items-center justify-center">
                    <Building className="w-12 h-12 text-text-muted" />
                  </div>
                )}
                {space.featured && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-gold text-luxury-black text-xs font-sans uppercase">
                    Featured
                  </div>
                )}
                {!space.isActive && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs font-sans uppercase">
                    Inactive
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-white font-sans text-lg mb-1">{space.title}</h3>
                {space.subtitle && (
                  <p className="text-gold text-xs uppercase tracking-wide mb-2">{space.subtitle}</p>
                )}
                
                <div className="flex items-center gap-4 text-text-muted text-sm mb-3">
                  <span className="flex items-center gap-1">
                    <Users size={14} />
                    Up to {getMaxCapacity(space.capacity)} guests
                  </span>
                  {space.size && <span>{space.size}</span>}
                </div>

                {space.priceFrom && (
                  <p className="text-gold font-sans text-sm mb-3">{space.priceFrom}</p>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleActive(space._id, space.isActive)}
                      className="p-2 text-text-muted hover:text-white transition-colors"
                      title={space.isActive ? 'Deactivate' : 'Activate'}
                    >
                      {space.isActive ? <ToggleRight size={20} className="text-green-500" /> : <ToggleLeft size={20} />}
                    </button>
                    <button
                      onClick={() => toggleFeatured(space._id, space.featured)}
                      className={`p-2 transition-colors ${space.featured ? 'text-gold' : 'text-text-muted hover:text-gold'}`}
                      title={space.featured ? 'Unfeature' : 'Feature'}
                    >
                      <Star size={20} fill={space.featured ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/spaces/${space._id}`}
                      className="p-2 text-text-muted hover:text-gold transition-colors"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => deleteSpace(space._id)}
                      className="p-2 text-text-muted hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
