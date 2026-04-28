'use client';

import { useState, useEffect } from 'react';
import type { IconType } from 'react-icons';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaWheatAwn,
  FaHouseChimney,
  FaBook,
  FaHeartPulse,
  FaDroplet,
  FaShieldHalved,
  FaBriefcase,
  FaMapPin,
  FaArrowLeft,
} from 'react-icons/fa6';

import { programsAPI } from '@/lib/api';
import { formatNumber, imageUrl } from '@/lib/format';

// ================= TYPES =================
type Program = {
  id: number | string;
  name_ar?: string;
  description?: string;
  image?: string;
  icon?: string;
  color?: string;
  projects_count?: number;
  families_count?: number;
  individuals_count?: number;
  locations?: string[];
};

// ================= ICON MAP =================
const iconMap: Record<string, IconType> = {
  FaWheatAwn,
  FaHouseChimney,
  FaBook,
  FaHeartPulse,
  FaDroplet,
  FaShieldHalved,
  FaBriefcase,
};

// ================= COMPONENT =================
export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const data = (await programsAPI.getAll()) as Program[];
        setPrograms(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPrograms();
  }, []);

  if (loading) {
    return <div className="pt-navbar container-page section-py text-center">جاري التحميل...</div>;
  }

  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white section-py">
        <div className="container-page text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-title text-white"
          >
            برامجنا وقطاعاتنا
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="section-subtitle text-white/90"
          >
            7 قطاعات رئيسية لتقديم الدعم الشامل
          </motion.p>
        </div>
      </section>

      <section className="section-py">
        <div className="container-page">
          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, i) => {
              const Icon = iconMap[program.icon || ''] ?? FaHeartPulse;
              const color = program.color || '#1A5F7A';

              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                >
                  {/* صورة البرنامج */}
                  <Link href={`/programs/${program.id}`} className="relative block h-56 overflow-hidden group">
                    <Image
                      src={imageUrl(program.image)}
                      alt={program.name_ar || 'برنامج'}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    <div className="absolute bottom-4 right-4 left-4 flex items-center gap-3 text-white">
                      <span className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/20 backdrop-blur-sm">
                        <Icon className="text-2xl" />
                      </span>
                      <h3 className="text-xl font-bold">{program.name_ar}</h3>
                    </div>
                  </Link>

                  {/* المحتوى */}
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {program.description}
                    </p>

                    {/* الإحصائيات */}
                    {program.projects_count && (
                      <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl mb-4 text-center">
                        <div>
                          <p className="text-xl font-bold text-primary-500">
                            {formatNumber(program.projects_count)}
                          </p>
                          <p className="text-xs">مشروع</p>
                        </div>

                        <div>
                          <p className="text-xl font-bold text-secondary-500">
                            {formatNumber(program.families_count)}
                          </p>
                          <p className="text-xs">أسرة</p>
                        </div>

                        <div>
                          <p className="text-xl font-bold text-accent-500">
                            {formatNumber(program.individuals_count)}
                          </p>
                          <p className="text-xs">فرد</p>
                        </div>
                      </div>
                    )}

                    {/* المواقع */}
                    {program.locations?.length ? (
                      <div className="flex flex-wrap gap-2 mb-4 text-xs text-gray-500">
                        {program.locations.map((loc) => (
                          <span
                            key={loc}
                            className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700"
                          >
                            <FaMapPin /> {loc}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {/* زر */}
                    <Link
                      href={`/programs/${program.id}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold"
                      style={{ backgroundColor: color }}
                    >
                      عرض التفاصيل <FaArrowLeft className="text-xs" />
                    </Link>
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