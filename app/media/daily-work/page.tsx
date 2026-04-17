'use client';
import { motion } from 'motion/react';
import { FaUserClock, FaMapPin, FaCalendar } from 'react-icons/fa6';

const jobs = [
  { id: 1, title: 'عمال بناء', location: 'الضالع', days: 15, rate: 'يومي', date: '2026-05-01' },
  { id: 2, title: 'عمال نظافة', location: 'مأرب', days: 10, rate: 'يومي', date: '2026-05-05' },
  { id: 3, title: 'مساعدين إداريين', location: 'صنعاء', days: 20, rate: 'يومي', date: '2026-05-10' },
  { id: 4, title: 'عمال تحميل وتنزيل', location: 'تعز', days: 7, rate: 'يومي', date: '2026-04-25' },
];

export default function DailyWorkPage() {
  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white section-py">
        <div className="container-page text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white">
            عمالة بالأجر اليومي
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="section-subtitle text-white/90">
            فرص عمل مؤقتة بأجر يومي
          </motion.p>
        </div>
      </section>

      <section className="section-py">
        <div className="container-page">
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-wrap justify-between items-center card-hover"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30">
                    <FaUserClock className="text-2xl text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1"><FaMapPin /> {job.location}</span>
                      <span className="flex items-center gap-1"><FaCalendar /> {job.days} يوم عمل</span>
                    </div>
                  </div>
                </div>
                <button className="mt-4 md:mt-0 px-6 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors">
                  تقديم
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
