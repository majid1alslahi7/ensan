'use client';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { FaUsers, FaGlobe, FaFolderOpen, FaHeart } from 'react-icons/fa6';
import { siteData } from '@/lib/data/siteData';

const stats = [
  { icon: FaFolderOpen, label: 'مشروع', value: siteData.stats.projects, color: '#2563eb', gradient: 'from-blue-500 to-blue-600' },
  { icon: FaUsers, label: 'مستفيد', value: siteData.stats.individuals.toLocaleString(), color: '#22c55e', gradient: 'from-green-500 to-green-600' },
  { icon: FaGlobe, label: 'محافظة', value: siteData.stats.locations, color: '#f97316', gradient: 'from-orange-500 to-orange-600' },
  { icon: FaHeart, label: 'متطوع', value: siteData.stats.volunteers, color: '#ef4444', gradient: 'from-red-500 to-red-600' }
];

export default function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">أثرنا في أرقام</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">إحصائيات تعكس حجم تأثيرنا الإيجابي</p>
        </motion.div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 50 }} 
              animate={inView ? { opacity: 1, y: 0 } : {}} 
              transition={{ delay: i * 0.1, type: "spring" }}
              whileHover={{ y: -12 }}
              className="group relative p-8 rounded-3xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300 -z-10`} />
              <div className="relative z-10">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="text-4xl text-white" />
                </div>
                <motion.h3 
                  initial={{ opacity: 0 }} 
                  animate={inView ? { opacity: 1 } : {}} 
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="text-5xl font-bold mb-2 group-hover:text-white transition-colors"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </motion.h3>
                <p className="text-lg font-medium text-gray-600 dark:text-gray-400 group-hover:text-white/90 transition-colors">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}