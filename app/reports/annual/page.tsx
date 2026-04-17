'use client';
import { motion } from 'motion/react';
import { FaFilePdf, FaDownload, FaCalendar } from 'react-icons/fa6';

const reports = [
  { id: 1, title: 'التقرير السنوي 2025', year: '2025', size: '4.2 MB', pages: 48 },
  { id: 2, title: 'التقرير السنوي 2024', year: '2024', size: '3.8 MB', pages: 42 },
  { id: 3, title: 'التقرير السنوي 2023', year: '2023', size: '3.5 MB', pages: 38 },
  { id: 4, title: 'حصاد 5 سنوات 2020-2025', year: '2025', size: '8.1 MB', pages: 86 },
];

export default function AnnualReportsPage() {
  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white section-py">
        <div className="container-page text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white">
            حصادنا - التقارير السنوية
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="section-subtitle text-white/90">
            تقاريرنا السنوية التي توثق إنجازاتنا وأثرنا
          </motion.p>
        </div>
      </section>

      <section className="section-py">
        <div className="container-page max-w-4xl">
          <div className="space-y-4">
            {reports.map((report, i) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-wrap justify-between items-center card-hover"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-red-100 dark:bg-red-900/30">
                    <FaFilePdf className="text-2xl text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{report.title}</h3>
                    <div className="flex gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1"><FaCalendar /> {report.year}</span>
                      <span>{report.size}</span>
                      <span>{report.pages} صفحة</span>
                    </div>
                  </div>
                </div>
                <button className="mt-4 md:mt-0 flex items-center gap-2 px-6 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors">
                  <FaDownload /> تحميل
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
