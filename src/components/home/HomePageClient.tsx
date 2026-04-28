'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';
import type { IconType } from 'react-icons';
import {
  FaUsers, FaGlobe, FaFolderOpen, FaHeart, FaArrowLeft,
  FaNewspaper, FaMagnifyingGlass, FaWheatAwn,
  FaHouseChimney, FaBook, FaDroplet, FaCalendar,
  FaChevronLeft, FaChevronRight, FaPause, FaPlay, FaImages
} from 'react-icons/fa6';
import { tokens } from '@/lib/tokens';
import { formatDate, formatNumber, imageUrl } from '@/lib/format';

type GalleryItem = {
  image_url?: string;
  title_ar?: string;
};

type HomeNewsItem = {
  id: number | string;
  title_ar?: string;
  published_at?: string;
};

type HomeProgram = {
  id: number | string;
  color?: string;
  description?: string;
  icon?: string;
  name_ar?: string;
};

type HomeStat = {
  color?: string;
  icon?: string;
  label_ar?: string;
  value?: number;
};

type HomePageClientProps = {
  gallery: GalleryItem[];
  news: HomeNewsItem[];
  programs: HomeProgram[];
  stats: HomeStat[];
};

export default function HomePageClient({
  gallery,
  news,
  programs,
  stats,
}: HomePageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (gallery.length === 0) return;

    const interval = setInterval(() => {
      if (isAutoPlaying) {
        setCurrentSlide((prev) => (prev + 1) % gallery.length);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [gallery.length, isAutoPlaying]);

  const iconMap: Record<string, IconType> = { FaWheatAwn, FaHouseChimney, FaBook, FaDroplet, FaHeart };

  return (
    <main className="overflow-x-hidden">
      <Toaster position="top-center" />

      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700">
        <div className="absolute inset-0 overflow-hidden z-0">
          <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }} transition={{ duration: 20, repeat: Infinity }} className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <motion.div animate={{ scale: [1.2, 1, 1.2], rotate: [45, 0, 45] }} transition={{ duration: 25, repeat: Infinity }} className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-secondary-500/10 blur-3xl" />
        </div>

        <div className="relative z-10 container-page text-center text-white">
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-5xl md:text-7xl font-bold mb-6">
            {tokens.brand.nameAr}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-xl md:text-3xl mb-10 opacity-95">
            {tokens.brand.slogan}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن مشاريع، أخبار، تقارير..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pr-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 text-lg"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                <FaMagnifyingGlass className="text-white text-xl" />
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }} className="flex flex-wrap gap-4 justify-center mt-8">
            <Link href="/about"><motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn bg-white text-gray-900 hover:bg-gray-100">تعرف علينا <FaArrowLeft /></motion.span></Link>
            <Link href="/contact/contribute"><motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600">تبرع الآن</motion.span></Link>
          </motion.div>
        </div>
      </section>

      <section className="section-py bg-gray-50 dark:bg-gray-900">
        <div className="container-page">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="section-title">أثرنا في أرقام</motion.h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -8 }} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: `${stat.color}20` }}>
                  {stat.icon === 'FaFolderOpen' && <FaFolderOpen className="text-3xl" style={{ color: stat.color }} />}
                  {stat.icon === 'FaUsers' && <FaUsers className="text-3xl" style={{ color: stat.color }} />}
                  {stat.icon === 'FaGlobe' && <FaGlobe className="text-3xl" style={{ color: stat.color }} />}
                  {stat.icon === 'FaHeart' && <FaHeart className="text-3xl" style={{ color: stat.color }} />}
                </div>
                <h3 className="text-4xl font-bold mb-2">{formatNumber(stat.value)}</h3>
                <p className="text-gray-500 dark:text-gray-400">{stat.label_ar}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/statistics" className="btn btn-primary">عرض شاشة الإحصائيات <FaArrowLeft /></Link>
          </div>
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="section-py bg-white dark:bg-gray-950">
          <div className="container-page">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="section-title flex items-center justify-center gap-3">
              <FaImages className="text-primary-500" /> معرض الصور <FaImages className="text-primary-500" />
            </motion.h2>
            <div className="relative max-w-5xl mx-auto">
              <Link href="/media/gallery">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                    <h3 className="text-xl md:text-2xl font-bold">{gallery[currentSlide]?.title_ar}</h3>
                  </div>
                  <Image
                    src={imageUrl(gallery[currentSlide]?.image_url)}
                    alt={gallery[currentSlide]?.title_ar || 'معرض الصور'}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              </Link>
              <button onClick={() => setCurrentSlide((prev) => (prev - 1 + gallery.length) % gallery.length)} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40">
                <FaChevronRight className="text-white text-xl" />
              </button>
              <button onClick={() => setCurrentSlide((prev) => (prev + 1) % gallery.length)} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40">
                <FaChevronLeft className="text-white text-xl" />
              </button>
              <div className="absolute bottom-4 right-4 z-30">
                <button onClick={() => setIsAutoPlaying(!isAutoPlaying)} className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40">
                  {isAutoPlaying ? <FaPause className="text-white" /> : <FaPlay className="text-white" />}
                </button>
              </div>
              <div className="flex justify-center gap-2 mt-4">
                {gallery.map((_, i) => (
                  <button key={i} onClick={() => setCurrentSlide(i)} className={`h-2 rounded-full transition-all ${i === currentSlide ? 'bg-primary-500 w-8' : 'bg-gray-300 dark:bg-gray-700 w-2'}`} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section-py bg-gray-50 dark:bg-gray-900">
        <div className="container-page">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="section-title">برامجنا وقطاعاتنا</motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {programs.slice(0, 4).map((program) => {
              const Icon = iconMap[program.icon] || FaHeart;

              return (
                <Link key={program.id} href="/programs">
                  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} whileHover={{ y: -5 }} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center h-full">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ background: `${program.color}20` }}>
                      <Icon className="text-2xl" style={{ color: program.color }} />
                    </div>
                    <h3 className="font-bold mb-2">{program.name_ar}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{program.description}</p>
                  </motion.div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link href="/programs" className="btn btn-primary">عرض جميع البرامج <FaArrowLeft /></Link>
          </div>
        </div>
      </section>

      {news.length > 0 && (
        <section className="section-py">
          <div className="container-page">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="section-title">آخر الأخبار</motion.h2>
            <div className="grid md:grid-cols-3 gap-6">
              {news.slice(0, 3).map((item) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} whileHover={{ y: -5 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                      <FaNewspaper className="text-xl text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">{item.title_ar}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <FaCalendar /> {formatDate(item.published_at)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/media/news" className="btn btn-outline border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white">عرض جميع الأخبار <FaArrowLeft /></Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
