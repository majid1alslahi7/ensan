'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { FaImages, FaXmark, FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa6';

const allImages = [
  { src: '/images/gallery1.jpg', alt: 'مشروع الأمن الغذائي', category: 'الأمن الغذائي' },
  { src: '/images/gallery2.jpg', alt: 'توزيع المساعدات الإنسانية', category: 'الإغاثة' },
  { src: '/images/gallery3.jpg', alt: 'حملة طبية مجانية', category: 'الصحة' },
  { src: '/images/gallery4.jpg', alt: 'مشروع المياه والإصحاح البيئي', category: 'المياه' },
  { src: '/images/gallery5.jpg', alt: 'دعم التعليم للأطفال', category: 'التعليم' },
  { src: '/images/gallery6.jpg', alt: 'فريق المتطوعين الميداني', category: 'التطوع' },
  { src: '/images/gallery7.jpg', alt: 'مشروع المأوى للنازحين', category: 'المأوى' },
  { src: '/images/gallery8.jpg', alt: 'تمكين المرأة اقتصادياً', category: 'التمكين' },
  { src: '/images/gallery9.jpg', alt: 'برامج الحماية الاجتماعية', category: 'الحماية' },
  { src: '/images/gallery11.jpg', alt: 'الاستجابة الطارئة للكوارث', category: 'الطوارئ' },
  { src: '/images/gallery12.jpg', alt: 'مشاريع التمكين الاقتصادي', category: 'التمكين' },
];

const categories = ['الكل', ...Array.from(new Set(allImages.map(img => img.category)))];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  const filteredImages = selectedCategory === 'الكل' 
    ? allImages 
    : allImages.filter(img => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white section-py">
        <div className="container-page text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="mb-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <FaImages className="text-4xl" />
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white">
            معرض الصور
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="section-subtitle text-white/90">
            صور من أنشطتنا ومشاريعنا الإنسانية
          </motion.p>
        </div>
      </section>

      <section className="py-8 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container-page">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
          <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
            {filteredImages.length} صورة
          </p>
        </div>
      </section>

      <section className="section-py">
        <div className="container-page">
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setHoveredImage(index)}
                  onMouseLeave={() => setHoveredImage(null)}
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 ${hoveredImage === index ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <p className="font-bold text-sm">{image.alt}</p>
                        <p className="text-xs opacity-80">{image.category}</p>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                        <FaExpand className="text-white" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <FaImages className="text-6xl text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">لا توجد صور في هذا التصنيف</p>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightboxOpen && filteredImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-3 text-white hover:bg-white/10 rounded-full transition-colors z-50"
            >
              <FaXmark className="text-2xl" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 text-white hover:bg-white/10 rounded-full transition-colors z-50"
            >
              <FaChevronRight className="text-2xl" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 text-white hover:bg-white/10 rounded-full transition-colors z-50"
            >
              <FaChevronLeft className="text-2xl" />
            </button>

            <div className="absolute top-4 left-4 text-white text-sm bg-black/50 px-4 py-2 rounded-full z-50">
              {currentImageIndex + 1} / {filteredImages.length}
            </div>

            <div className="relative w-full max-w-5xl h-[80vh] mx-4" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={filteredImages[currentImageIndex].src}
                    alt={filteredImages[currentImageIndex].alt}
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                <h3 className="text-xl font-bold">{filteredImages[currentImageIndex].alt}</h3>
                <p className="text-sm opacity-80">{filteredImages[currentImageIndex].category}</p>
              </div>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50">
              {filteredImages.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                  className={`h-2 rounded-full transition-all ${i === currentImageIndex ? 'bg-white w-8' : 'bg-white/50 w-2'}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
