'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Bell,
  Loader2,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface SettingsForm {
  siteName: string;
  tagline: string;
  phone: string;
  email: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    postcode: string;
    country: string;
  };
  socialLinks: {
    instagram: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    youtube: string;
  };
  announcement: {
    text: string;
    link: string;
    isActive: boolean;
  };
  showEvents: boolean;
  bookingPhone: string;
  reservationsEmail: string;
  diningEmail: string;
  eventsEmail: string;
  metaTitle: string;
  metaDescription: string;
}

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  
  const [form, setForm] = useState<SettingsForm>({
    siteName: '',
    tagline: '',
    phone: '',
    email: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      postcode: '',
      country: '',
    },
    socialLinks: {
      instagram: '',
      facebook: '',
      twitter: '',
      linkedin: '',
      youtube: '',
    },
    announcement: {
      text: '',
      link: '',
      isActive: true,
    },
    showEvents: true,
    bookingPhone: '',
    reservationsEmail: '',
    diningEmail: '',
    eventsEmail: '',
    metaTitle: '',
    metaDescription: '',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.settings) {
        setForm({
          ...form,
          ...data.settings,
          address: { ...form.address, ...data.settings.address },
          socialLinks: { ...form.socialLinks, ...data.settings.socialLinks },
          announcement: { ...form.announcement, ...data.settings.announcement },
        });
      }
    } catch (error) {
      toast.error('Failed to load settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success('Settings saved successfully');
      } else {
        toast.error('Failed to save settings');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'social', label: 'Social', icon: Instagram },
    { id: 'announcement', label: 'Announcement', icon: Bell },
    { id: 'seo', label: 'SEO', icon: Globe },
  ];

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
      <div>
        <h1 className="text-2xl text-white font-sans uppercase tracking-wide">Settings</h1>
        <p className="text-text-muted font-serif mt-1">Manage your website settings and content</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-gold text-luxury-black'
                : 'bg-luxury-dark text-text-muted hover:text-white border border-white/10'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Tab */}
        {activeTab === 'general' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-luxury-dark border border-white/10 rounded-lg p-6 space-y-6"
          >
            <h2 className="text-lg text-white font-sans uppercase tracking-wide">General Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                  Site Name
                </label>
                <input
                  type="text"
                  value={form.siteName}
                  onChange={(e) => setForm({ ...form, siteName: e.target.value })}
                  className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                  Tagline
                </label>
                <input
                  type="text"
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.showEvents}
                  onChange={(e) => setForm({ ...form, showEvents: e.target.checked })}
                  className="w-5 h-5 rounded border-white/20 bg-luxury-black text-gold focus:ring-gold"
                />
                <span className="text-white font-sans">Show Events Section on Homepage</span>
              </label>
            </div>
          </motion.div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-luxury-dark border border-white/10 rounded-lg p-6 space-y-6">
              <h2 className="text-lg text-white font-sans uppercase tracking-wide">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                    Main Phone
                  </label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                    Main Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="bg-luxury-dark border border-white/10 rounded-lg p-6 space-y-6">
              <h2 className="text-lg text-white font-sans uppercase tracking-wide flex items-center gap-2">
                <Phone className="text-gold" size={20} />
                Booking Phone Number
              </h2>
              <p className="text-text-muted font-serif text-sm">
                This number will be used for all "Book Now" buttons across the website.
              </p>
              
              <div>
                <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                  Front Desk Phone (for booking buttons)
                </label>
                <input
                  type="text"
                  value={form.bookingPhone}
                  onChange={(e) => setForm({ ...form, bookingPhone: e.target.value })}
                  placeholder="+234xxxxxxxxxx"
                  className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            <div className="bg-luxury-dark border border-white/10 rounded-lg p-6 space-y-6">
              <h2 className="text-lg text-white font-sans uppercase tracking-wide">Department Emails</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                    Reservations
                  </label>
                  <input
                    type="email"
                    value={form.reservationsEmail}
                    onChange={(e) => setForm({ ...form, reservationsEmail: e.target.value })}
                    className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                    Dining
                  </label>
                  <input
                    type="email"
                    value={form.diningEmail}
                    onChange={(e) => setForm({ ...form, diningEmail: e.target.value })}
                    className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                    Events
                  </label>
                  <input
                    type="email"
                    value={form.eventsEmail}
                    onChange={(e) => setForm({ ...form, eventsEmail: e.target.value })}
                    className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="bg-luxury-dark border border-white/10 rounded-lg p-6 space-y-6">
              <h2 className="text-lg text-white font-sans uppercase tracking-wide">Address</h2>
              
              <div className="space-y-4">
                <input
                  type="text"
                  value={form.address.line1}
                  onChange={(e) => setForm({ ...form, address: { ...form.address, line1: e.target.value } })}
                  placeholder="Address Line 1"
                  className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                />
                <input
                  type="text"
                  value={form.address.line2}
                  onChange={(e) => setForm({ ...form, address: { ...form.address, line2: e.target.value } })}
                  placeholder="Address Line 2"
                  className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    value={form.address.city}
                    onChange={(e) => setForm({ ...form, address: { ...form.address, city: e.target.value } })}
                    placeholder="City"
                    className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                  />
                  <input
                    type="text"
                    value={form.address.postcode}
                    onChange={(e) => setForm({ ...form, address: { ...form.address, postcode: e.target.value } })}
                    placeholder="Postcode"
                    className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                  />
                  <input
                    type="text"
                    value={form.address.country}
                    onChange={(e) => setForm({ ...form, address: { ...form.address, country: e.target.value } })}
                    placeholder="Country"
                    className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors col-span-2 md:col-span-1"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Social Tab */}
        {activeTab === 'social' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-luxury-dark border border-white/10 rounded-lg p-6 space-y-6"
          >
            <h2 className="text-lg text-white font-sans uppercase tracking-wide">Social Media Links</h2>
            
            <div className="space-y-4">
              {[
                { key: 'instagram', label: 'Instagram', icon: Instagram },
                { key: 'facebook', label: 'Facebook', icon: Facebook },
                { key: 'twitter', label: 'Twitter / X', icon: Twitter },
                { key: 'linkedin', label: 'LinkedIn', icon: Linkedin },
                { key: 'youtube', label: 'YouTube', icon: Youtube },
              ].map((social) => (
                <div key={social.key} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <social.icon className="text-gold" size={20} />
                  </div>
                  <input
                    type="url"
                    value={form.socialLinks[social.key as keyof typeof form.socialLinks] || ''}
                    onChange={(e) => setForm({
                      ...form,
                      socialLinks: { ...form.socialLinks, [social.key]: e.target.value }
                    })}
                    placeholder={`${social.label} URL`}
                    className="flex-1 bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Announcement Tab */}
        {activeTab === 'announcement' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-luxury-dark border border-white/10 rounded-lg p-6 space-y-6"
          >
            <h2 className="text-lg text-white font-sans uppercase tracking-wide">Announcement Bar</h2>
            <p className="text-text-muted font-serif text-sm">
              This appears at the top of your website. Use it to highlight promotions or important information.
            </p>
            
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.announcement.isActive}
                  onChange={(e) => setForm({
                    ...form,
                    announcement: { ...form.announcement, isActive: e.target.checked }
                  })}
                  className="w-5 h-5 rounded border-white/20 bg-luxury-black text-gold focus:ring-gold"
                />
                <span className="text-white font-sans">Show Announcement Bar</span>
              </label>
            </div>

            <div>
              <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                Announcement Text
              </label>
              <input
                type="text"
                value={form.announcement.text}
                onChange={(e) => setForm({
                  ...form,
                  announcement: { ...form.announcement, text: e.target.value }
                })}
                className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                Link (optional)
              </label>
              <input
                type="url"
                value={form.announcement.link}
                onChange={(e) => setForm({
                  ...form,
                  announcement: { ...form.announcement, link: e.target.value }
                })}
                placeholder="https://..."
                className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            {/* Preview */}
            {form.announcement.isActive && form.announcement.text && (
              <div className="mt-6">
                <p className="text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">Preview</p>
                <div className="bg-gold text-luxury-black py-2 px-4 text-center text-sm">
                  {form.announcement.text}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* SEO Tab */}
        {activeTab === 'seo' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-luxury-dark border border-white/10 rounded-lg p-6 space-y-6"
          >
            <h2 className="text-lg text-white font-sans uppercase tracking-wide">SEO Settings</h2>
            
            <div>
              <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                Default Meta Title
              </label>
              <input
                type="text"
                value={form.metaTitle}
                onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                Default Meta Description
              </label>
              <textarea
                value={form.metaDescription}
                onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                rows={3}
                className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none"
              />
            </div>
          </motion.div>
        )}

        {/* Submit */}
        <div className="flex items-center justify-end">
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
                Save Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
