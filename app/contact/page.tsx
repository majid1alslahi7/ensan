'use client';
import { motion } from 'motion/react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-16">
      <section className="relative bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-bold mb-6">
            تواصل معنا
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl opacity-90">
            نحن هنا للإجابة على استفساراتكم
          </motion.p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6">معلومات الاتصال</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3"><FaPhone className="text-primary-500" /><span>+967 123 456 789</span></div>
                <div className="flex items-center gap-3"><FaEnvelope className="text-primary-500" /><span>info@eusran.org</span></div>
                <div className="flex items-center gap-3"><FaMapMarkerAlt className="text-primary-500" /><span>الضالع - اليمن</span></div>
                <div className="flex items-center gap-3"><FaClock className="text-primary-500" /><span>الأحد - الخميس: 8:00 ص - 4:00 م</span></div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6">أرسل رسالة</h3>
              <form className="space-y-4">
                <input type="text" placeholder="الاسم الكامل" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800" />
                <input type="email" placeholder="البريد الإلكتروني" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800" />
                <textarea placeholder="رسالتك" rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800"></textarea>
                <button className="w-full py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">إرسال</button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}