'use client';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaBriefcase, FaMapPin, FaClock, FaArrowLeft, FaCalendar, FaBuilding } from 'react-icons/fa6';
import { careersAPI } from '@/lib/api';

export default function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJob() {
      try {
        const data = await careersAPI.getOne(Number(id));
        setJob(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchJob();
  }, [id]);

  if (loading) return <div className="pt-navbar container-page section-py text-center">جاري التحميل...</div>;
  if (!job) return <div className="pt-navbar container-page section-py text-center">الوظيفة غير موجودة</div>;

  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white section-py">
        <div className="container-page">
          <Link href="/media/jobs" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <FaArrowLeft /> العودة للوظائف
          </Link>
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold mb-4">
            {job.title_ar}
          </motion.h1>
          <div className="flex flex-wrap gap-6 text-white/80 text-sm">
            <span className="flex items-center gap-1"><FaMapPin /> {job.location}</span>
            <span className="flex items-center gap-1"><FaBuilding /> {job.department}</span>
            <span className="flex items-center gap-1"><FaClock /> {job.type === 'full_time' ? 'دوام كامل' : 'دوام جزئي'}</span>
            <span className="flex items-center gap-1"><FaCalendar /> آخر موعد: {job.deadline ? new Date(job.deadline).toLocaleDateString('ar-SA') : 'غير محدد'}</span>
          </div>
        </div>
      </section>

      <section className="section-py">
        <div className="container-page max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">الوصف الوظيفي</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">{job.description}</p>
            
            {job.requirements && (
              <>
                <h3 className="text-xl font-bold mb-4">المتطلبات</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">{job.requirements}</p>
              </>
            )}

            <div className="mt-8 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl text-center">
              <p className="text-lg mb-4">للتقديم على هذه الوظيفة، يرجى إرسال السيرة الذاتية إلى:</p>
              <p className="text-xl font-bold text-primary-600 dark:text-primary-400">careers@eusran.org</p>
              <p className="text-sm text-gray-500 mt-2">مع ذكر المسمى الوظيفي في عنوان البريد</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}