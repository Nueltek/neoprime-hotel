'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BedDouble, 
  Tag, 
  FileText, 
  Image, 
  Calendar, 
  TrendingUp,
  Plus,
  Eye
} from 'lucide-react';

interface DashboardStats {
  rooms: number;
  offers: number;
  posts: number;
  publishedPosts: number;
  galleryImages: number;
  upcomingEvents: number;
}

const statCards = [
  { label: 'Rooms', key: 'rooms', icon: BedDouble, href: '/admin/rooms', color: 'from-blue-500/20 to-blue-600/10' },
  { label: 'Offers', key: 'offers', icon: Tag, href: '/admin/offers', color: 'from-green-500/20 to-green-600/10' },
  { label: 'Blog Posts', key: 'posts', icon: FileText, href: '/admin/posts', color: 'from-purple-500/20 to-purple-600/10' },
  { label: 'Gallery Images', key: 'galleryImages', icon: Image, href: '/admin/gallery', color: 'from-pink-500/20 to-pink-600/10' },
  { label: 'Upcoming Events', key: 'upcomingEvents', icon: Calendar, href: '/admin/events', color: 'from-orange-500/20 to-orange-600/10' },
];

const quickActions = [
  { label: 'Add Room', href: '/admin/rooms/new', icon: BedDouble },
  { label: 'Create Offer', href: '/admin/offers/new', icon: Tag },
  { label: 'Write Post', href: '/admin/posts/new', icon: FileText },
  { label: 'Upload Image', href: '/admin/gallery/new', icon: Image },
  { label: 'Add Event', href: '/admin/events/new', icon: Calendar },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    rooms: 0,
    offers: 0,
    posts: 0,
    publishedPosts: 0,
    galleryImages: 0,
    upcomingEvents: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [roomsRes, offersRes, postsRes, galleryRes, eventsRes] = await Promise.all([
          fetch('/api/rooms?active=all'),
          fetch('/api/offers?active=all'),
          fetch('/api/posts'),
          fetch('/api/gallery'),
          fetch('/api/events?upcoming=true'),
        ]);

        const [roomsData, offersData, postsData, galleryData, eventsData] = await Promise.all([
          roomsRes.json(),
          offersRes.json(),
          postsRes.json(),
          galleryRes.json(),
          eventsRes.json(),
        ]);

        setStats({
          rooms: roomsData.rooms?.length || 0,
          offers: offersData.offers?.length || 0,
          posts: postsData.posts?.length || 0,
          publishedPosts: postsData.posts?.filter((p: { status: string }) => p.status === 'published').length || 0,
          galleryImages: galleryData.images?.length || 0,
          upcomingEvents: eventsData.events?.length || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl text-white font-sans uppercase tracking-wide">Dashboard</h1>
        <p className="text-text-muted font-serif mt-1">Welcome back to Neoprime Admin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statCards.map((card, index) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={card.href}>
              <div className={`bg-gradient-to-br ${card.color} border border-white/10 rounded-lg p-6 hover:border-gold/50 transition-all duration-300`}>
                <div className="flex items-center justify-between mb-4">
                  <card.icon className="text-gold" size={24} />
                  <TrendingUp className="text-green-400" size={16} />
                </div>
                <p className="text-3xl text-white font-sans">
                  {isLoading ? '—' : stats[card.key as keyof DashboardStats]}
                </p>
                <p className="text-text-muted text-sm font-serif mt-1">{card.label}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg text-white font-sans uppercase tracking-wide mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Link href={action.href}>
                <div className="bg-luxury-dark border border-white/10 rounded-lg p-4 hover:border-gold hover:bg-gold/5 transition-all duration-300 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gold/10 flex items-center justify-center">
                    <action.icon className="text-gold" size={20} />
                  </div>
                  <p className="text-white text-sm font-sans flex items-center justify-center gap-2">
                    <Plus size={14} />
                    {action.label}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <div className="bg-luxury-dark border border-white/10 rounded-lg">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h3 className="text-white font-sans uppercase tracking-wide">Recent Posts</h3>
            <Link href="/admin/posts" className="text-gold text-sm hover:text-gold-light transition-colors">
              View All →
            </Link>
          </div>
          <div className="p-4">
            <p className="text-text-muted font-serif text-center py-8">
              {isLoading ? 'Loading...' : stats.posts === 0 ? 'No posts yet' : 'Posts will appear here'}
            </p>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-luxury-dark border border-white/10 rounded-lg">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h3 className="text-white font-sans uppercase tracking-wide">Upcoming Events</h3>
            <Link href="/admin/events" className="text-gold text-sm hover:text-gold-light transition-colors">
              View All →
            </Link>
          </div>
          <div className="p-4">
            <p className="text-text-muted font-serif text-center py-8">
              {isLoading ? 'Loading...' : stats.upcomingEvents === 0 ? 'No upcoming events' : 'Events will appear here'}
            </p>
          </div>
        </div>
      </div>

      {/* Website Preview */}
      <div className="bg-luxury-dark border border-white/10 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-sans uppercase tracking-wide">Website Preview</h3>
          <Link 
            href="/" 
            target="_blank"
            className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors text-sm"
          >
            <Eye size={16} />
            Open Website
          </Link>
        </div>
        <div className="aspect-video bg-luxury-black rounded-lg overflow-hidden border border-white/5">
          <iframe 
            src="/"
            className="w-full h-full"
            title="Website Preview"
          />
        </div>
      </div>
    </div>
  );
}
