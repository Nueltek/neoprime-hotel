'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff, Star, MoreVertical } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface Room {
  _id: string;
  title: string;
  slug: string;
  price: number;
  size: string;
  bedType: string;
  images: { url: string; publicId: string }[];
  featured: boolean;
  isActive: boolean;
  sortOrder: number;
}

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchRooms = async () => {
    try {
      const res = await fetch('/api/rooms?active=all');
      const data = await res.json();
      setRooms(data.rooms || []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      toast.error('Failed to load rooms');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this room? This action cannot be undone.')) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/rooms/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Room deleted successfully');
        setRooms(rooms.filter(r => r._id !== id));
      } else {
        toast.error('Failed to delete room');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setDeletingId(null);
    }
  };

  const toggleActive = async (room: Room) => {
    try {
      const res = await fetch(`/api/rooms/${room._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...room, isActive: !room.isActive }),
      });
      if (res.ok) {
        toast.success(room.isActive ? 'Room hidden' : 'Room visible');
        fetchRooms();
      }
    } catch (error) {
      toast.error('Failed to update room');
    }
  };

  const toggleFeatured = async (room: Room) => {
    try {
      const res = await fetch(`/api/rooms/${room._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...room, featured: !room.featured }),
      });
      if (res.ok) {
        toast.success(room.featured ? 'Removed from featured' : 'Added to featured');
        fetchRooms();
      }
    } catch (error) {
      toast.error('Failed to update room');
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-white font-sans uppercase tracking-wide">Rooms</h1>
          <p className="text-text-muted font-serif mt-1">Manage your hotel rooms and suites</p>
        </div>
        <Link
          href="/admin/rooms/new"
          className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-luxury-black px-4 py-2 font-sans uppercase tracking-wide text-sm transition-colors"
        >
          <Plus size={18} />
          Add Room
        </Link>
      </div>

      {/* Rooms Table */}
      <div className="bg-luxury-dark border border-white/10 rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full mx-auto" />
          </div>
        ) : rooms.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-text-muted font-serif mb-4">No rooms found</p>
            <Link
              href="/admin/rooms/new"
              className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
            >
              <Plus size={18} />
              Create your first room
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-luxury-black/50">
              <tr className="text-left">
                <th className="px-6 py-4 text-xs text-text-muted uppercase tracking-widest font-sans">Room</th>
                <th className="px-6 py-4 text-xs text-text-muted uppercase tracking-widest font-sans hidden md:table-cell">Price</th>
                <th className="px-6 py-4 text-xs text-text-muted uppercase tracking-widest font-sans hidden lg:table-cell">Size</th>
                <th className="px-6 py-4 text-xs text-text-muted uppercase tracking-widest font-sans">Status</th>
                <th className="px-6 py-4 text-xs text-text-muted uppercase tracking-widest font-sans text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rooms.map((room, index) => (
                <motion.tr
                  key={room._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 bg-luxury-black rounded overflow-hidden flex-shrink-0">
                        {room.images?.[0]?.url && (
                          <Image
                            src={room.images[0].url}
                            alt={room.title}
                            width={64}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-sans flex items-center gap-2">
                          {room.title}
                          {room.featured && <Star className="text-gold" size={14} />}
                        </p>
                        <p className="text-text-muted text-sm font-serif">{room.bedType}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-gold font-sans">£{room.price}</span>
                    <span className="text-text-muted text-sm"> /night</span>
                  </td>
                  <td className="px-6 py-4 text-text-muted font-serif hidden lg:table-cell">
                    {room.size}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded ${
                      room.isActive 
                        ? 'bg-green-500/10 text-green-400' 
                        : 'bg-gray-500/10 text-gray-400'
                    }`}>
                      {room.isActive ? <Eye size={12} /> : <EyeOff size={12} />}
                      {room.isActive ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => toggleFeatured(room)}
                        className={`p-2 rounded transition-colors ${
                          room.featured 
                            ? 'bg-gold/20 text-gold' 
                            : 'hover:bg-white/10 text-text-muted hover:text-white'
                        }`}
                        title={room.featured ? 'Remove from featured' : 'Add to featured'}
                      >
                        <Star size={16} />
                      </button>
                      <button
                        onClick={() => toggleActive(room)}
                        className="p-2 hover:bg-white/10 rounded text-text-muted hover:text-white transition-colors"
                        title={room.isActive ? 'Hide room' : 'Show room'}
                      >
                        {room.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <Link
                        href={`/admin/rooms/${room._id}`}
                        className="p-2 hover:bg-white/10 rounded text-text-muted hover:text-white transition-colors"
                        title="Edit room"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(room._id)}
                        disabled={deletingId === room._id}
                        className="p-2 hover:bg-red-500/10 rounded text-text-muted hover:text-red-400 transition-colors disabled:opacity-50"
                        title="Delete room"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
