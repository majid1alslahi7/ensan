'use client';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { FaChartPie, FaFilePdf, FaBook, FaDownload } from 'react-icons/fa6';
import { reportsAPI } from '@/lib/api';
import { formatNumber } from '@/lib/format';

export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const data = await reportsAPI.getAll();
        setReports(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  const categories = [
    { name: 'حصادنا', href: '/reports/annual', icon: FaChartPie, color: '#1A5F7A', desc: 'التقارير السنوية وحصاد الإنجازات' },
    { name: 'الأدلة والسياسات', href: '/reports/policies', icon: FaBook, color: '#159C4B', desc: 'السياسات والأدلة المعتمدة' },
    { name: 'جميع التقارير', href: '/reports', icon: FaFilePdf, color: '#D4621A', desc: 'جميع التقارير والإصدارات', active: true },
  ];

  if (loading) return <div className="pt-navbar container-page section-py text-center">جاري التحميل...</div>;

  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white section-py">
        <div className="container-page text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white">التقارير والإصدارات</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-subtitle text-white/90">اطلع على تقاريرنا وإنجازاتنا</motion.p>
        </div>
      </section>

      <section className="section-py bg-gray-50 dark:bg-gray-900">
        <div className="container-page">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {categories.map((cat, i) => (
              <Link key={i} href={cat.href}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -5 }} className={`p-6 rounded-2xl text-center transition-all ${cat.active ? 'bg-primary-500 text-white' : 'bg-white dark:bg-gray-800 hover:shadow-lg'}`}>
                  <cat.icon className={`text-4xl mx-auto mb-3 ${cat.active ? 'text-white' : ''}`} style={{ color: cat.active ? 'white' : cat.color }} />
                  <h3 className="text-xl font-bold">{cat.name}</h3>
                  <p className={`text-sm mt-2 ${cat.active ? 'text-white/80' : 'text-gray-500'}`}>{cat.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-6 text-center">جميع التقارير</h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            {reports.map((report, i) => (
              <motion.div key={report.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-wrap justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                    <FaFilePdf className="text-2xl text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{report.title_ar}</h3>
                    <p className="text-sm text-gray-500">{report.description}</p>
                    <div className="flex gap-4 mt-1 text-xs text-gray-400">
                      <span>السنة: {report.year}</span>
                      <span>التحميلات: {formatNumber(report.downloads)}</span>
                    </div>
                  </div>
                </div>
                <a href={report.file_url || report.file || '#'} target="_blank" className="mt-4 md:mt-0 px-6 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 inline-flex items-center gap-2">
                  <FaDownload /> تحميل
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
