'use client';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaFileContract, FaCalendar, FaArrowLeft, FaDownload, FaTag, FaCircleInfo } from 'react-icons/fa6';
import { tendersAPI } from '@/lib/api';
import { formatDate } from '@/lib/format';
import { CONTACT_EMAIL } from '@/lib/contact';

export default function TenderDetailPage() {
  const { id } = useParams();
  const [tender, setTender] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTender() {
      try {
        const data = await tendersAPI.getOne(Number(id));
        setTender(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchTender();
  }, [id]);

  if (loading) return <div className="pt-navbar container-page section-py text-center">جاري التحميل...</div>;
  if (!tender) return <div className="pt-navbar container-page section-py text-center">المناقصة غير موجودة</div>;

  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white section-py">
        <div className="container-page">
          <Link href="/media/tenders" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <FaArrowLeft /> العودة للمناقصات
          </Link>
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-4">
            {tender.title_ar}
          </motion.h1>
          <div className="flex flex-wrap gap-6 text-white/80 text-sm">
            <span className="flex items-center gap-1"><FaTag /> رقم المرجع: {tender.reference}</span>
            <span className="flex items-center gap-1"><FaCalendar /> تاريخ الإغلاق: {formatDate(tender.deadline)}</span>
            <span className={`px-3 py-1 rounded-full text-xs ${tender.status === 'open' ? 'bg-green-500' : 'bg-gray-500'}`}>
              {tender.status === 'open' ? 'مفتوح' : 'مغلق'}
            </span>
          </div>
        </div>
      </section>

      <section className="section-py">
        <div className="container-page max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <FaCircleInfo className="text-2xl text-primary-500" />
              <h2 className="text-2xl font-bold">تفاصيل المناقصة</h2>
            </div>
            
            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{tender.description}</p>
            </div>

            {tender.file_url && (
              <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <FaDownload /> ملفات المناقصة
                </h3>
                <a href={tender.file_url} target="_blank" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600">
                  <FaDownload /> تحميل كراسة الشروط
                </a>
              </div>
            )}

            <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-bold text-yellow-800 dark:text-yellow-400 mb-2">ملاحظة هامة</h3>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                يرجى قراءة كراسة الشروط بعناية قبل تقديم العطاء. للاستفسارات، يمكنكم التواصل عبر البريد الإلكتروني: {CONTACT_EMAIL}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
