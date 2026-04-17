'use client';
import { motion } from 'motion/react';
import { FaBriefcase, FaMapPin, FaClock } from 'react-icons/fa6';

const jobs = [
  { title: 'منسق مشروع', location: 'الضالع', type: 'دوام كامل', deadline: '2026-05-30' },
  { title: 'مساعد إداري', location: 'صنعاء', type: 'دوام كامل', deadline: '2026-06-15' },
  { title: 'عامل ميداني', location: 'مأرب', type: 'عقد مؤقت', deadline: '2026-05-25' },
];

export default function JobsPage() {
  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white section-py">
        <div className="container-page text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white">وظائف شاغرة</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="section-subtitle text-white/90">انضم إلى فريقنا وساهم في إحداث التغيير</motion.p>
        </div>
      </section>

      <section className="section-py">
        <div className="container-page">
          <div className="space-y-4">
            {jobs.map((job, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-wrap justify-between items-center card-hover">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl"><FaBriefcase className="text-2xl text-primary-500" /></div>
                  <div>
                    <h3 className="text-xl font-bold">{job.title}</h3>
                    <div className="flex gap-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><FaMapPin /> {job.location}</span>
                      <span className="flex items-center gap-1"><FaClock /> {job.type}</span>
                    </div>
                  </div>
                </div>
                <button className="mt-4 md:mt-0 px-6 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors">تقديم</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}