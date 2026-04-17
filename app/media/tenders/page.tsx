'use client';
import { motion } from 'motion/react';
import { FaFileContract, FaCalendar } from 'react-icons/fa6';

const tenders = [
  { title: 'توريد مواد غذائية', ref: 'TEN-2026-001', deadline: '2026-06-10', status: 'مفتوح' },
  { title: 'إنشاء خزانات مياه', ref: 'TEN-2026-002', deadline: '2026-06-20', status: 'مفتوح' },
];

export default function TendersPage() {
  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white section-py">
        <div className="container-page text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white">مناقصات</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="section-subtitle text-white/90">فرص التعاقد مع مؤسسة إنسان</motion.p>
        </div>
      </section>

      <section className="section-py">
        <div className="container-page">
          <div className="space-y-4">
            {tenders.map((tender, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-wrap justify-between items-center card-hover">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-secondary-100 dark:bg-secondary-900/30 rounded-xl"><FaFileContract className="text-2xl text-secondary-500" /></div>
                  <div>
                    <h3 className="text-xl font-bold">{tender.title}</h3>
                    <p className="text-sm text-gray-500">رقم المرجع: {tender.ref}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <span className="flex items-center gap-1 text-sm"><FaCalendar /> {tender.deadline}</span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full text-sm">{tender.status}</span>
                  <button className="px-6 py-2 bg-secondary-500 text-white rounded-xl hover:bg-secondary-600 transition-colors">تفاصيل</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}