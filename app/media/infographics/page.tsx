'use client';
import { motion } from 'motion/react';
import { FaChartBar, FaChartPie, FaChartLine } from 'react-icons/fa6';

const infographics = [
  { id: 1, title: 'إحصائيات الأمن الغذائي 2026', type: 'رسم بياني', icon: FaChartBar, color: '#1A5F7A' },
  { id: 2, title: 'توزيع المستفيدين حسب المحافظات', type: 'دائري', icon: FaChartPie, color: '#159C4B' },
  { id: 3, title: 'نمو عدد المشاريع 2022-2026', type: 'خطي', icon: FaChartLine, color: '#D4621A' },
  { id: 4, title: 'نسبة الإنجاز في القطاعات', type: 'شريطي', icon: FaChartBar, color: '#8B5CF6' },
  { id: 5, title: 'الفئات المستفيدة', type: 'دائري', icon: FaChartPie, color: '#EF4444' },
  { id: 6, title: 'مؤشرات الأداء الرئيسية', type: 'بطاقة', icon: FaChartLine, color: '#3B82F6' },
];

export default function InfographicsPage() {
  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white section-py">
        <div className="container-page text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white">
            إنفوجرافيك
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="section-subtitle text-white/90">
            بيانات وإحصائيات مرئية عن أنشطتنا
          </motion.p>
        </div>
      </section>

      <section className="section-py">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {infographics.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 card-hover"
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ background: item.color + '20' }}>
                    <Icon className="text-2xl" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.type}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
