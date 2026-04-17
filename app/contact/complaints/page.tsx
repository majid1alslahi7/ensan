'use client';
import { motion } from 'motion/react';
import { FaComment, FaEnvelope, FaPhone } from 'react-icons/fa6';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ComplaintsPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', type: 'complaint' });

  const handleSubmit = (e: any) => { e.preventDefault(); toast.success('تم استلام رسالتك، سنتواصل معك قريباً'); };

  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white section-py">
        <div className="container-page text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white">الشكاوى والمقترحات</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="section-subtitle text-white/90">صوتك مهم لنا، شاركنا ملاحظاتك ومقترحاتك</motion.p>
        </div>
      </section>

      <section className="section-py">
        <div className="container-page max-w-3xl">
          <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" placeholder="الاسم الكامل" className="p-4 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-900" required />
              <input type="email" placeholder="البريد الإلكتروني" className="p-4 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-900" required />
            </div>
            <select className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-900">
              <option value="complaint">شكوى</option>
              <option value="suggestion">مقترح</option>
              <option value="inquiry">استفسار</option>
            </select>
            <input type="text" placeholder="الموضوع" className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-900" required />
            <textarea placeholder="الرسالة" rows={5} className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-900" required></textarea>
            <button type="submit" className="w-full py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all">إرسال الرسالة</button>
          </motion.form>
        </div>
      </section>
    </div>
  );
}