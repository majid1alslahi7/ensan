'use client';
import { motion } from 'motion/react';
import { FaEye, FaBullseye, FaHeart, FaUsers, FaSitemap, FaMapPin } from 'react-icons/fa6';
import Link from 'next/link';
import { siteData } from '@/lib/data/siteData';

export default function AboutPage() {
  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white section-py">
        <div className="container-page text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white">
            {siteData.about.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="section-subtitle text-white/90">
            {siteData.about.description}
          </motion.p>
        </div>
      </section>

      <section className="section-py bg-gray-50 dark:bg-gray-800">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'عن المنظمة', href: '/about', icon: FaUsers, active: true },
              { title: 'هيكل المنظمة', href: '/about/structure', icon: FaSitemap },
              { title: 'أين نعمل', href: '/about/locations', icon: FaMapPin }
            ].map((item, i) => (
              <Link key={i} href={item.href}>
                <motion.div whileHover={{ y: -5 }} className={`p-6 rounded-xl text-center transition-all ${item.active ? 'bg-primary-500 text-white' : 'bg-white dark:bg-gray-900 hover:shadow-lg'}`}>
                  <item.icon className="text-4xl mx-auto mb-3" />
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py">
        <div className="container-page">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                <FaEye className="text-3xl text-primary-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">رؤيتنا</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">{siteData.about.vision}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center mb-4">
                <FaBullseye className="text-3xl text-secondary-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">رسالتنا</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">{siteData.about.mission}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-py bg-gray-50 dark:bg-gray-800">
        <div className="container-page">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="section-title">قيمنا</motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {siteData.about.values.map((value, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.05 }} className="bg-white dark:bg-gray-900 p-4 rounded-xl text-center shadow">
                <FaHeart className="text-2xl text-accent-500 mx-auto mb-2" />
                <span className="font-medium">{value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
