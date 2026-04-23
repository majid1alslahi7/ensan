'use client';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { FaWheatAwn, FaHouseChimney, FaBook, FaHeartPulse, FaDroplet, FaShieldHalved, FaBriefcase, FaMapPin, FaArrowLeft } from 'react-icons/fa6';
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
              const programColor = program.color || '#1A5F7A';

              return (
                <motion.div key={program.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                  <Link href={`/programs/${program.id}`} className="relative block h-56 overflow-hidden group">
                    <Image src={imageUrl(program.image)} alt={program.name_ar || 'برنامج'} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between gap-3 text-white">
                      <div className="flex items-center gap-3">
                        <span className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/15 backdrop-blur-sm">
                          <Icon className="text-2xl" />
                        </span>
                        <h3 className="text-xl font-bold">{program.name_ar}</h3>
                      </div>
                    </div>
                  </Link>
                  <div className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ background: programColor + '20' }}>
                      <Icon className="text-3xl" style={{ color: programColor }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2" style={{ color: programColor }}>{program.name_ar}</h3>
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
                      <Link
                        href={`/programs/${program.id}`}
                        className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-all hover:gap-3"
                        style={{ backgroundColor: programColor }}
                      >
                        عرض التفاصيل <FaArrowLeft className="text-xs" />
                      </Link>
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
