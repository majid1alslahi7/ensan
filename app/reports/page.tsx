'use client';
import { motion } from 'motion/react';
import Link from 'next/link';
import { FaChartPie, FaBook, FaNewspaper } from 'react-icons/fa6';

const reportItems = [
  { name: 'التقارير السنوية', href: '/reports/annual', icon: FaChartPie, color: '#1A5F7A' },
  { name: 'حصادنا', href: '/reports/harvest', icon: FaNewspaper, color: '#159C4B' },
  { name: 'الأدلة والسياسات', href: '/reports/policies', icon: FaBook, color: '#D4621A' },
];

export default function ReportsPage() {
  return (
    <div className="min-h-screen pt-16">
      <section className="relative bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-bold mb-6">
            التقارير والإصدارات
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl opacity-90">
            اطلع على تقاريرنا وإنجازاتنا
          </motion.p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {reportItems.map((item, i) => (
              <Link key={i} href={item.href}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -5 }} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: item.color + '20' }}>
                    <item.icon className="text-4xl" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-xl font-bold">{item.name}</h3>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}