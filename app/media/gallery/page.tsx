'use client';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { FaImages, FaExpand } from 'react-icons/fa6';
import { galleryAPI } from '@/lib/api';

export default function GalleryPage() {
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const data = await galleryAPI.getAll();
        setGallery(data.data || data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  if (loading) return <div className="pt-navbar container-page section-py text-center">جاري التحميل...</div>;

  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white section-py">
        <div className="container-page text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white">معرض الصور</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-subtitle text-white/90">صور من أنشطتنا الإنسانية</motion.p>
        </div>
      </section>

      <section className="section-py">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="relative group cursor-pointer" onClick={() => setSelectedImage(item)}>
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                  <Image src={item.image_url} alt={item.title_ar} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                    <FaExpand className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-5xl max-h-[90vh]">
            <Image src={selectedImage.image_url} alt={selectedImage.title_ar} width={1200} height={800} className="object-contain rounded-xl" />
            <button className="absolute top-4 right-4 text-white text-2xl" onClick={() => setSelectedImage(null)}>×</button>
            <p className="text-white text-center mt-4">{selectedImage.title_ar}</p>
          </div>
        </div>
      )}
    </div>
  );
}
