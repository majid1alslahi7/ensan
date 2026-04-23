'use client';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { FaWheatAwn, FaHouseChimney, FaBook, FaHeartPulse, FaDroplet, FaShieldHalved, FaBriefcase, FaMapPin } from 'react-icons/fa6';
import { programsAPI } from '@/lib/api';
import { formatNumber, imageUrl } from '@/lib/format';

const iconMap: any = { FaWheatAwn, FaHouseChimney, FaBook, FaHeartPulse, FaDroplet, FaShieldHalved, FaBriefcase };

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const data = await programsAPI.getAll();
        setPrograms(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPrograms();
  }, []);

  if (loading) return <div className="pt-navbar container-page section-py text-center">جاري التحميل...</div>;

  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white section-py">
        <div className="container-page text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white">برامجنا وقطاعاتنا</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-subtitle text-white/90">7 قطاعات رئيسية لتقديم الدعم الشامل</motion.p>
        </div>
      </section>

      <section className="section-py">
        <div className="container-page">
          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, i) => {
              const Icon = iconMap[program.icon] || FaHeartPulse;
              return (
                <motion.div key={program.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                  {program.image && (
                    <div className="relative h-44">
                      <Image src={imageUrl(program.image)} alt={program.name_ar || 'برنامج'} fill className="object-cover" />
                    </div>
                  )}
                  <div className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ background: program.color + '20' }}>
                      <Icon className="text-3xl" style={{ color: program.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2" style={{ color: program.color }}>{program.name_ar}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{program.description}</p>
                      {program.projects_count > 0 && (
                        <div className="grid grid-cols-3 gap-4 mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                          <div className="text-center"><p className="text-2xl font-bold text-primary-500">{formatNumber(program.projects_count)}</p><p className="text-xs">مشروع</p></div>
                          <div className="text-center"><p className="text-2xl font-bold text-secondary-500">{formatNumber(program.families_count)}</p><p className="text-xs">أسرة</p></div>
                          <div className="text-center"><p className="text-2xl font-bold text-accent-500">{formatNumber(program.individuals_count)}</p><p className="text-xs">فرد</p></div>
                        </div>
                      )}
                      {Array.isArray(program.locations) && program.locations.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4 text-xs text-gray-500 dark:text-gray-400">
                          {program.locations.map((location: string) => (
                            <span key={location} className="inline-flex items-center gap-1 rounded-full bg-gray-100 dark:bg-gray-700 px-3 py-1">
                              <FaMapPin className="text-primary-500" /> {location}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
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
