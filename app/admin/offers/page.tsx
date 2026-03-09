'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff, Star } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface Offer {
  _id: string;
  title: string;
  slug: string;
  price: string;
  validity: string;
  image: { url: string; publicId: string };
  featured: boolean;
  isActive: boolean;
}

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchOffers = async () => {
    try {
      const res = await fetch('/api/offers?active=all');
      const data = await res.json();
      setOffers(data.offers || []);
    } catch (error) {
      console.error('Error fetching offers:', error);
      toast.error('Failed to load offers');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this offer?')) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/offers/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Offer deleted successfully');
        setOffers(offers.filter(o => o._id !== id));
      } else {
        toast.error('Failed to delete offer');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setDeletingId(null);
    }
  };

  const toggleActive = async (offer: Offer) => {
    try {
      const res = await fetch(`/api/offers/${offer._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...offer, isActive: !offer.isActive }),
      });
      if (res.ok) {
        toast.success(offer.isActive ? 'Offer hidden' : 'Offer visible');
        fetchOffers();
      }
    } catch (error) {
      toast.error('Failed to update offer');
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-white font-sans uppercase tracking-wide">Offers</h1>
          <p className="text-text-muted font-serif mt-1">Manage your special offers and packages</p>
        </div>
        <Link
          href="/admin/offers/new"
          className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-luxury-black px-4 py-2 font-sans uppercase tracking-wide text-sm transition-colors"
        >
          <Plus size={18} />
          Add Offer
        </Link>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full flex justify-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full" />
          </div>
        ) : offers.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-luxury-dark border border-white/10 rounded-lg">
            <p className="text-text-muted font-serif mb-4">No offers found</p>
            <Link
              href="/admin/offers/new"
              className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
            >
              <Plus size={18} />
              Create your first offer
            </Link>
          </div>
        ) : (
          offers.map((offer, index) => (
            <motion.div
              key={offer._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-luxury-dark border border-white/10 rounded-lg overflow-hidden hover:border-gold/30 transition-colors"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] bg-luxury-black">
                {offer.image?.url && (
                  <Image
                    src={offer.image.url}
                    alt={offer.title}
                    fill
                    className="object-cover"
                  />
                )}
                {!offer.isActive && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white/80 font-sans uppercase tracking-wide text-sm">
                      Hidden
                    </span>
                  </div>
                )}
                {offer.featured && (
                  <span className="absolute top-3 left-3 bg-gold text-luxury-black text-xs px-2 py-1 rounded flex items-center gap-1">
                    <Star size={12} />
                    Featured
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-white font-sans uppercase tracking-wide mb-1">
                  {offer.title}
                </h3>
                <p className="text-gold font-sans mb-1">{offer.price}</p>
                <p className="text-text-muted text-sm font-serif">{offer.validity}</p>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                  <button
                    onClick={() => toggleActive(offer)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded transition-colors ${
                      offer.isActive
                        ? 'bg-white/5 text-text-muted hover:text-white'
                        : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                    }`}
                  >
                    {offer.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                    {offer.isActive ? 'Hide' : 'Show'}
                  </button>
                  <Link
                    href={`/admin/offers/${offer._id}`}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded bg-white/5 text-text-muted hover:text-white transition-colors"
                  >
                    <Edit size={16} />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(offer._id)}
                    disabled={deletingId === offer._id}
                    className="p-2 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
