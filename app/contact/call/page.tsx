'use client';
import { motion } from 'motion/react';
import { FaPhone, FaEnvelope, FaLocationDot, FaClock, FaWhatsapp } from 'react-icons/fa6';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_WHATSAPP, contactLinks } from '@/lib/contact';

export default function CallPage() {
  const contactItems = [
    { icon: FaPhone, label: 'اتصل بنا', value: CONTACT_PHONE, color: '#1A5F7A', link: contactLinks.phone },
    { icon: FaWhatsapp, label: 'واتساب', value: CONTACT_WHATSAPP, color: '#25D366', link: contactLinks.whatsapp },
    { icon: FaEnvelope, label: 'البريد الإلكتروني', value: CONTACT_EMAIL, color: '#3B82F6', link: contactLinks.email },
    { icon: FaLocationDot, label: 'العنوان', value: 'الضالع - اليمن', color: '#D4621A' },
    { icon: FaClock, label: 'ساعات العمل', value: 'الأحد - الخميس: 8:00 ص - 4:00 م', color: '#8B5CF6' }
  ];

  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white section-py">
        <div className="container-page text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white">اتصل بنا</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="section-subtitle text-white/90">نحن هنا للإجابة على استفساراتكم</motion.p>
        </div>
      </section>

      <section className="section-py">
        <div className="container-page max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
            <div className="space-y-6">
              {contactItems.map((item, i) => (
                <a key={i} href={item.link || '#'} target={item.link?.startsWith('http') ? '_blank' : undefined} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: item.color + '20' }}>
                    <item.icon className="text-xl" style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="text-lg font-bold" dir={item.label === 'واتساب' || item.label === 'اتصل بنا' ? 'ltr' : 'rtl'}>{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
