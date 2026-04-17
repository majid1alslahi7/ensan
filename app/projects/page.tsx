'use client';
import { motion } from 'motion/react';
import { FaList, FaMapPin, FaUsers, FaCalendar } from 'react-icons/fa6';

const projects = [
  { id: 1, title: 'مشروع تعزيز الأمن الغذائي', location: 'الضالع - مأرب', beneficiaries: 254048, year: '2025-2026', status: 'جاري', color: '#1A5F7A' },
  { id: 2, title: 'مشروع المياه والإصحاح البيئي', location: 'الضالع', beneficiaries: 21161, year: '2025', status: 'مكتمل', color: '#3B82F6' },
  { id: 3, title: 'مشروع دعم التعليم', location: 'الضالع', beneficiaries: 10640, year: '2024-2025', status: 'مكتمل', color: '#D4621A' },
  { id: 4, title: 'مشروع الحماية المتكاملة', location: 'الضالع - صنعاء', beneficiaries: 2352, year: '2025-2026', status: 'جاري', color: '#8B5CF6' },
  { id: 5, title: 'مشروع المأوى للنازحين', location: 'الضالع', beneficiaries: 5600, year: '2024', status: 'مكتمل', color: '#159C4B' },
  { id: 6, title: 'مشروع الاستجابة الطارئة', location: 'مأرب - تعز', beneficiaries: 15000, year: '2026', status: 'جاري', color: '#EF4444' },
];

export default function ProjectsPage() {
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
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden card-hover"
              >
                <div className="h-2" style={{ background: project.color }} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: project.color + '20' }}>
                      <FaList className="text-2xl" style={{ color: project.color }} />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${project.status === 'جاري' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2"><FaMapPin className="text-primary-500" /> {project.location}</div>
                    <div className="flex items-center gap-2"><FaUsers className="text-primary-500" /> {project.beneficiaries.toLocaleString()} مستفيد</div>
                    <div className="flex items-center gap-2"><FaCalendar className="text-primary-500" /> {project.year}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
