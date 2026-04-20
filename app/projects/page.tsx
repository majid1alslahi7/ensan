'use client';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { FaList, FaMapPin, FaUsers, FaCalendar, FaArrowLeft } from 'react-icons/fa6';
import { projectsAPI } from '@/lib/api';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await projectsAPI.getAll();
        setProjects(data.data || data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="pt-navbar container-page section-py text-center">
        <p className="text-gray-500">جاري تحميل المشاريع...</p>
      </div>
    );
  }

  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white section-py">
        <div className="container-page text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white">
            أبرز المشاريع
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="section-subtitle text-white/90">
            تعرف على أبرز مشاريعنا الإنسانية والتنموية
          </motion.p>
        </div>
      </section>

      <section className="section-py bg-gray-50 dark:bg-gray-900">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="h-2" style={{ background: project.program?.color || '#1A5F7A' }} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: (project.program?.color || '#1A5F7A') + '20' }}>
                      <FaList className="text-2xl" style={{ color: project.program?.color || '#1A5F7A' }} />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                      {project.status === 'active' ? 'جاري' : 'مكتمل'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{project.title_ar}</h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-2"><FaMapPin className="text-primary-500" /> {project.location}</div>
                    <div className="flex items-center gap-2"><FaUsers className="text-primary-500" /> {project.beneficiaries?.toLocaleString()} مستفيد</div>
                    {project.program && (
                      <div className="flex items-center gap-2"><FaList className="text-primary-500" /> {project.program.name_ar}</div>
                    )}
                  </div>
                  {/* رابط التفاصيل */}
                  <Link 
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-2 text-primary-500 font-medium hover:gap-3 transition-all"
                  >
                    تفاصيل المشروع <FaArrowLeft className="text-sm" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}