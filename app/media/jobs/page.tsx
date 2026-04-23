'use client';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { FaBriefcase, FaMapPin, FaClock, FaArrowLeft, FaCalendar } from 'react-icons/fa6';
import { careersAPI } from '@/lib/api';
import { formatDate } from '@/lib/format';

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const data = await careersAPI.getAll();
        setJobs(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  if (loading) return <div className="pt-navbar container-page section-py text-center">جاري التحميل...</div>;

  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white section-py">
        <div className="container-page text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white">وظائف شاغرة</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-subtitle text-white/90">انضم إلى فريقنا وساهم في إحداث التغيير</motion.p>
        </div>
      </section>

      <section className="section-py">
        <div className="container-page">
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <motion.div key={job.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-wrap justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                    <FaBriefcase className="text-2xl text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{job.title_ar}</h3>
                    <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><FaMapPin /> {job.location}</span>
                      <span className="flex items-center gap-1"><FaClock /> {job.type === 'full_time' ? 'دوام كامل' : 'دوام جزئي'}</span>
                      <span className="flex items-center gap-1"><FaCalendar /> {formatDate(job.deadline)}</span>
                      <span>{job.department}</span>
                    </div>
                  </div>
                </div>
                <Link href={`/media/jobs/${job.id}`} className="mt-4 md:mt-0 px-6 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 inline-flex items-center gap-2">
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
