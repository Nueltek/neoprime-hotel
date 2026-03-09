'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Upload, Loader2, FolderPlus, X, Edit2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface GalleryCategory {
  _id: string;
  name: string;
  slug: string;
}

interface GalleryImage {
  _id: string;
  title: string;
  alt: string;
  image: { url: string; publicId: string };
  category: GalleryCategory;
}

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [uploadForm, setUploadForm] = useState({
    title: '',
    alt: '',
    categoryId: '',
    imageBase64: '',
  });
  const [showUploadModal, setShowUploadModal] = useState(false);

  const fetchData = async () => {
    try {
      const [imagesRes, categoriesRes] = await Promise.all([
        fetch('/api/gallery?active=all'),
        fetch('/api/gallery/categories'),
      ]);
      const [imagesData, categoriesData] = await Promise.all([
        imagesRes.json(),
        categoriesRes.json(),
      ]);
      setImages(imagesData.images || []);
      setCategories(categoriesData.categories || []);
    } catch (error) {
      toast.error('Failed to load gallery');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadForm((prev) => ({
          ...prev,
          imageBase64: reader.result as string,
          title: file.name.replace(/\.[^/.]+$/, ''),
          alt: file.name.replace(/\.[^/.]+$/, ''),
        }));
        setShowUploadModal(true);
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

  const handleUpload = async () => {
    if (!uploadForm.imageBase64 || !uploadForm.title || !uploadForm.categoryId) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsUploading(true);
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(uploadForm),
      });

      if (res.ok) {
        toast.success('Image uploaded!');
        setShowUploadModal(false);
        setUploadForm({ title: '', alt: '', categoryId: '', imageBase64: '' });
        fetchData();
      } else {
        toast.error('Failed to upload image');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Image deleted');
        setImages(images.filter(img => img._id !== id));
      } else {
        toast.error('Failed to delete image');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      const res = await fetch('/api/gallery/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName }),
      });

      if (res.ok) {
        toast.success('Category created!');
        setNewCategoryName('');
        setShowCategoryModal(false);
        fetchData();
      } else {
        toast.error('Failed to create category');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter(img => img.category?._id === selectedCategory);

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-white font-sans uppercase tracking-wide">Gallery</h1>
          <p className="text-text-muted font-serif mt-1">Manage your image gallery</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowCategoryModal(true)}
            className="flex items-center gap-2 px-4 py-2 border border-white/20 text-white font-sans uppercase tracking-wide text-sm hover:bg-white/5 transition-colors"
          >
            <FolderPlus size={18} />
            Add Category
          </button>
          <div
            {...getRootProps()}
            className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-luxury-black px-4 py-2 font-sans uppercase tracking-wide text-sm cursor-pointer transition-colors"
          >
            <input {...getInputProps()} />
            <Plus size={18} />
            Upload Image
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg font-sans text-sm transition-colors ${
            selectedCategory === 'all'
              ? 'bg-gold text-luxury-black'
              : 'bg-luxury-dark text-text-muted hover:text-white border border-white/10'
          }`}
        >
          All ({images.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setSelectedCategory(cat._id)}
            className={`px-4 py-2 rounded-lg font-sans text-sm transition-colors ${
              selectedCategory === cat._id
                ? 'bg-gold text-luxury-black'
                : 'bg-luxury-dark text-text-muted hover:text-white border border-white/10'
            }`}
          >
            {cat.name} ({images.filter(img => img.category?._id === cat._id).length})
          </button>
        ))}
      </div>

      {/* Images Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-gold" size={32} />
        </div>
      ) : filteredImages.length === 0 ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
            isDragActive 
              ? 'border-gold bg-gold/5' 
              : 'border-white/20 hover:border-gold/50'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto text-text-muted mb-4" size={40} />
          <p className="text-white font-sans mb-2">
            {isDragActive ? 'Drop images here' : 'Drag & drop images here'}
          </p>
          <p className="text-text-muted text-sm font-serif">
            or click to select files
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="relative group aspect-square bg-luxury-dark rounded-lg overflow-hidden"
              >
                <Image
                  src={image.image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleDelete(image._id)}
                      className="p-1.5 bg-red-500 text-white rounded-full"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div>
                    <p className="text-white text-sm font-sans truncate">{image.title}</p>
                    <p className="text-text-muted text-xs">{image.category?.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-luxury-dark border border-white/10 rounded-lg p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg text-white font-sans uppercase tracking-wide">
                  Upload Image
                </h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-text-muted hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {uploadForm.imageBase64 && (
                <div className="relative aspect-video mb-4 rounded overflow-hidden">
                  <Image
                    src={uploadForm.imageBase64}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                    className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                    Alt Text *
                  </label>
                  <input
                    type="text"
                    value={uploadForm.alt}
                    onChange={(e) => setUploadForm({ ...uploadForm, alt: e.target.value })}
                    className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs text-text-muted uppercase tracking-widest mb-2 font-sans">
                    Category *
                  </label>
                  <select
                    value={uploadForm.categoryId}
                    onChange={(e) => setUploadForm({ ...uploadForm, categoryId: e.target.value })}
                    className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                  >
                    <option value="">Select category...</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-luxury-black py-3 font-sans uppercase tracking-wide transition-colors disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={18} />
                      Upload Image
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Modal */}
      <AnimatePresence>
        {showCategoryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCategoryModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-luxury-dark border border-white/10 rounded-lg p-6 w-full max-w-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg text-white font-sans uppercase tracking-wide">
                  New Category
                </h3>
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="text-text-muted hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateCategory()}
                  placeholder="Category name..."
                  className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                />

                <button
                  onClick={handleCreateCategory}
                  className="w-full bg-gold hover:bg-gold-dark text-luxury-black py-3 font-sans uppercase tracking-wide transition-colors"
                >
                  Create Category
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
