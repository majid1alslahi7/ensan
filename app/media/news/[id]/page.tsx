'use client';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendar, FaArrowLeft, FaEye, FaFolder } from 'react-icons/fa6';
import { newsAPI } from '@/lib/api';
import { formatDate, formatNumber, imageUrl } from '@/lib/format';

export default function NewsDetailPage() {
  const { id } = useParams();
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const data = await newsAPI.getOne(Number(id));
        setNews(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchNews();
  }, [id]);

  if (loading) return <div className="pt-navbar container-page section-py text-center">جاري التحميل...</div>;
  if (!news) return <div className="pt-navbar container-page section-py text-center">الخبر غير موجود</div>;

  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white section-py">
        <div className="container-page">
          <Link href="/media/news" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <FaArrowLeft /> العودة للأخبار
          </Link>
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-4">
            {news.title_ar}
          </motion.h1>
          <div className="flex items-center gap-6 text-white/80 text-sm">
            <span className="flex items-center gap-1"><FaCalendar /> {formatDate(news.created_at)}</span>
            <span className="flex items-center gap-1"><FaEye /> {formatNumber(news.views)} مشاهدة</span>
            <span className="flex items-center gap-1"><FaFolder /> {news.category}</span>
          </div>
        </div>
      </section>
      <section className="section-py">
        <div className="container-page max-w-4xl">
          {news.image && (
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-lg mb-8">
              <Image src={imageUrl(news.image)} alt={news.title_ar || 'خبر'} fill className="object-cover" priority />
            </div>
          )}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{news.content}</p>
        </div>
      </section>
    </div>
  );
}
