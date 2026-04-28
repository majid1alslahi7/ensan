'use client';

import type { IconType } from 'react-icons';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import {
  FaWheatAwn,
  FaHouseChimney,
  FaBook,
  FaHeartPulse,
  FaDroplet,
  FaShieldHalved,
  FaBriefcase,
  FaArrowLeft,
} from 'react-icons/fa6';

import { siteData } from '@/lib/data/siteData';

const iconMap: Record<string, IconType> = {
  FaWheatAwn,
  FaHouseChimney,
  FaBook,
  FaHeartPulse,
  FaDroplet,
  FaShieldHalved,
  FaBriefcase,
};

export default function ProgramsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-padding bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">برامجنا وقطاعاتنا</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">نعمل في 7 قطاعات رئيسية لتقديم الدعم الشامل</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteData.programs.map((program, i) => {
            const IconComponent = iconMap[program.icon] ?? FaBriefcase;

            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -12 }}
                className="group relative p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-800 cursor-pointer overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${program.color}15, ${program.color}05)` }}
                />

                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${program.color}, ${program.color}dd)` }}
                  >
                    <IconComponent className="text-3xl text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {program.name}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                    {program.description}
                  </p>

                  <div className="flex items-center gap-2 font-semibold" style={{ color: program.color }}>
                    <span>اكتشف المزيد</span>
                    <FaArrowLeft className="text-sm group-hover:translate-x-1 transition-transform" />
                  </div>

                  {program.projects > 0 && (
                    <div
                      className="absolute top-6 right-6 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg"
                      style={{ background: program.color }}
                    >
                      {program.projects} مشروع
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link href="/programs">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all cursor-pointer"
            >
              عرض جميع البرامج
              <FaArrowLeft />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}