'use client';
import { motion } from 'motion/react';
import Link from 'next/link';
import { FaBullhorn, FaBriefcase, FaFileContract, FaUserClock, FaArrowLeft } from 'react-icons/fa6';

const sections = [
  { title: 'وظائف شاغرة', href: '/media/jobs', icon: FaBriefcase, desc: 'فرص عمل متاحة في المؤسسة', color: '#1A5F7A' },
  { title: 'مناقصات', href: '/media/tenders', icon: FaFileContract, desc: 'مناقصات وعطاءات حالية', color: '#159C4B' },
  { title: 'عمالة بالأجر اليومي', href: '/media/daily-work', icon: FaUserClock, desc: 'فرص عمل مؤقتة بأجر يومي', color: '#D4621A' },
];

export default function AnnouncementsPage() {
  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white section-py">
        <div className="container-page text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="mb-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <FaBullhorn className="text-4xl" />
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white">
            الإعلانات
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="section-subtitle text-white/90">
            وظائف، مناقصات، وفرص عمل
          </motion.p>
        </div>
      </section>

      <section className="section-py">
        <div className="container-page">
          <div className="grid md:grid-cols-3 gap-6">
            {sections.map((section, i) => (
              <Link key={i} href={section.href}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center h-full card-hover"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center" style={{ background: section.color + '20' }}>
                    <section.icon className="text-4xl" style={{ color: section.color }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{section.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">{section.desc}</p>
                  <span className="inline-flex items-center gap-2 text-primary-500">
                    تصفح الآن <FaArrowLeft className="text-sm" />
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
