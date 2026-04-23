'use client';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { FaFileContract, FaCalendar, FaArrowLeft } from 'react-icons/fa6';
import { tendersAPI } from '@/lib/api';
import { formatDate } from '@/lib/format';

export default function TendersPage() {
  const [tenders, setTenders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTenders() {
      try {
        const data = await tendersAPI.getAll();
        setTenders(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTenders();
  }, []);

  if (loading) return <div className="pt-navbar container-page section-py text-center">جاري التحميل...</div>;

  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white section-py">
        <div className="container-page text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white">المناقصات</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-subtitle text-white/90">فرص التعاقد مع مؤسسة إنسان</motion.p>
        </div>
      </section>

      <section className="section-py">
        <div className="container-page">
          <div className="space-y-4">
            {tenders.map((tender, i) => (
              <motion.div key={tender.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-wrap justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                    <FaFileContract className="text-2xl text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{tender.title_ar}</h3>
                    <p className="text-sm text-gray-500">رقم المرجع: {tender.reference}</p>
                    <div className="flex gap-4 mt-1">
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <FaCalendar /> {formatDate(tender.deadline)}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${tender.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {tender.status === 'open' ? 'مفتوح' : 'مغلق'}
                      </span>
                    </div>
                  </div>
                </div>
                <Link href={`/media/tenders/${tender.id}`} className="mt-4 md:mt-0 px-6 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 inline-flex items-center gap-2">
                  تفاصيل <FaArrowLeft className="text-sm" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
