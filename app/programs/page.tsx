'use client';
import { motion } from 'motion/react';
import { FaWheatAwn, FaHouseChimney, FaBook, FaHeartPulse, FaDroplet, FaShieldHalved, FaBriefcase } from 'react-icons/fa6';
import { siteData } from '@/lib/data/siteData';

const iconMap: any = { FaWheatAwn, FaHouseChimney, FaBook, FaHeartPulse, FaDroplet, FaShieldHalved, FaBriefcase };

export default function ProgramsPage() {
  return (
    <div className="min-h-screen pt-16">
      <section className="relative bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-bold mb-6">
            برامجنا وقطاعاتنا
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl opacity-90">
            نعمل في 7 قطاعات رئيسية لتقديم الدعم الشامل للمجتمعات المحتاجة
          </motion.p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {siteData.programs.map((program, i) => {
              const Icon = iconMap[program.icon];
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ background: program.color + '20' }}>
                      <Icon className="text-3xl" style={{ color: program.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2" style={{ color: program.color }}>{program.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{program.description}</p>
                      {program.projects > 0 && (
                        <div className="grid grid-cols-3 gap-4 mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-primary-500">{program.projects}</p>
                            <p className="text-sm text-gray-500">مشروع</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-secondary-500">{program.families.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">أسرة</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-accent-500">{program.individuals.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">فرد</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}