'use client';
import { motion } from 'motion/react';
import { FaUserTie, FaUsers, FaHandHoldingHeart, FaChartLine } from 'react-icons/fa6';

export default function StructurePage() {
  const levels = [
    { title: 'مجلس الإدارة', icon: FaUserTie, desc: 'السلطة العليا للمؤسسة، يضع السياسات العامة ويشرف على الأداء', color: '#1A5F7A' },
    { title: 'الإدارة التنفيذية', icon: FaChartLine, desc: 'تدير العمليات اليومية وتنفذ الخطط الاستراتيجية', color: '#159C4B' },
    { title: 'القطاعات البرامجية', icon: FaHandHoldingHeart, desc: '7 قطاعات رئيسية تنفذ المشاريع الميدانية', color: '#D4621A' },
    { title: 'القطاعات الداعمة', icon: FaUsers, desc: 'الموارد البشرية، المالية، الإعلام، والعلاقات العامة', color: '#8B5CF6' },
  ];

  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white section-py">
        <div className="container-page text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white">الهيكل التنظيمي</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="section-subtitle text-white/90">تعرف على هيكل مؤسسة إنسان الإداري والتنظيمي</motion.p>
        </div>
      </section>

      <section className="section-py bg-gray-50 dark:bg-gray-900">
        <div className="container-page">
          <div className="grid md:grid-cols-2 gap-8">
            {levels.map((level, i) => {
              const Icon = level.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -5 }} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{ background: level.color + '20' }}>
                    <Icon className="text-3xl" style={{ color: level.color }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{level.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{level.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
