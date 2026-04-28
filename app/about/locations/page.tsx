'use client';
import { motion } from 'motion/react';
import {  FaCity } from 'react-icons/fa6';
import { siteData } from '@/lib/data/siteData';

export default function LocationsPage() {
  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white section-py">
        <div className="container-page text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white">أين نعمل</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="section-subtitle text-white/90">مكاتبنا ومواقع عملنا في اليمن</motion.p>
        </div>
      </section>

      <section className="section-py">
        <div className="container-page">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteData.about.locations.map((loc, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center card-hover">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                  <FaCity className="text-3xl text-primary-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">{loc.city}</h3>
                <p className="text-primary-500 font-medium mb-2">{loc.type}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{loc.address}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}