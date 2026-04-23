'use client';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { FaNewspaper, FaCalendar, FaArrowLeft } from 'react-icons/fa6';
import { newsAPI } from '@/lib/api';
import { excerpt, formatDate, imageUrl } from '@/lib/format';

export default function NewsPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const data = await newsAPI.getAll();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading) return <div className="pt-navbar container-page section-py text-center">جاري التحميل...</div>;

  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white section-py">
        <div className="container-page text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white">آخر الأخبار</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="section-subtitle text-white/90">تابع أحدث أخبار وأنشطة المؤسسة</motion.p>
        </div>
      </section>

      <section className="section-py bg-gray-50 dark:bg-gray-900">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {news.map((item, i) => (
              <motion.article key={item.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 overflow-hidden">
                  {item.image ? (
                    <Image src={imageUrl(item.image)} alt={item.title_ar || 'خبر'} fill className="object-cover" />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <FaNewspaper className="text-5xl text-primary-500/50" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <FaCalendar className="text-primary-500" />
                    <span>{formatDate(item.created_at)}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    <Link href={`/media/news/${item.id}`} className="hover:text-primary-500">{item.title_ar}</Link>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{excerpt(item.excerpt || item.content)}</p>
                  <Link href={`/media/news/${item.id}`} className="inline-flex items-center gap-2 text-primary-500 font-medium hover:gap-3">
                    اقرأ المزيد <FaArrowLeft className="text-sm" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
