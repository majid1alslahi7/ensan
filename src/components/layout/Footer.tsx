'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { 
  FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, 
  FaPhone, FaLocationDot, FaWhatsapp, FaTelegram, FaArrowUp, FaCode 
} from 'react-icons/fa6';
import { tokens } from '@/lib/tokens';
import { siteData } from '@/lib/data/siteData';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const socialLinks = [
    { icon: FaFacebookF, href: '#', color: '#1877F2' },
    { icon: FaTwitter, href: '#', color: '#1DA1F2' },
    { icon: FaInstagram, href: '#', color: '#E4405F' },
    { icon: FaYoutube, href: '#', color: '#FF0000' },
    { icon: FaWhatsapp, href: '#', color: '#25D366' },
    { icon: FaTelegram, href: '#', color: '#26A5E4' },
  ];

  // روابط سريعة محدثة
  const quickLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'من نحن', href: '/about' },
    { name: 'البرامج', href: '/programs' },
    { name: 'المشاريع', href: '/projects' },
    { name: 'الأخبار', href: '/media/news' },
    { name: 'التقارير', href: '/reports' },
    { name: 'تواصل معنا', href: '/contact' },
  ];

  return (
    <footer className="relative bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-auto border-t border-gray-200 dark:border-gray-800">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500" />
      
      <div className="container-page py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 p-0.5">
                <div className="w-full h-full rounded-lg bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                  <Image src="/icon1.png" alt="Logo" width={32} height={32} className="w-full h-full object-cover" />
                </div>
              </div>
              <h3 className="text-gray-900 dark:text-white text-lg font-bold">{tokens.brand.name}</h3>
            </div>
            <p className="text-xs mb-3 leading-relaxed text-gray-600 dark:text-gray-400">{siteData.about.description.substring(0, 100)}...</p>
            <div className="flex flex-wrap gap-1.5">
              {socialLinks.map((social, i) => (
                <motion.a key={i} href={social.href} whileHover={{ scale: 1.1, y: -2 }} className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <social.icon className="text-xs" style={{ color: social.color }} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h4 className="text-gray-900 dark:text-white text-base font-bold mb-3 flex items-center gap-1.5">
              <FaCode className="text-primary-500 text-xs" /> روابط سريعة
            </h4>
            <ul className="space-y-1.5">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-600 dark:text-gray-400 hover:text-primary-500 text-xs flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-primary-500 rounded-full" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h4 className="text-gray-900 dark:text-white text-base font-bold mb-3 flex items-center gap-1.5">
              <FaPhone className="text-primary-500 text-xs" /> تواصل معنا
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs">
                <FaPhone className="text-primary-500 text-xs" /> +967 123 456 789
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs">
                <FaEnvelope className="text-primary-500 text-xs" /> info@eusran.org
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-xs">
                <FaLocationDot className="text-primary-500 text-xs" /> الضالع - اليمن
              </li>
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <h4 className="text-gray-900 dark:text-white text-base font-bold mb-3 flex items-center gap-1.5">
              <FaCode className="text-primary-500 text-xs" /> تم التطوير بواسطة
            </h4>
            <Link href="/aboutdeveloper" className="block group">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700 hover:border-primary-500/50 transition-all">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 p-0.5 group-hover:scale-105 transition-transform">
                    <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                      <Image src="/develper.ico" alt="Developer" width={28} height={28} className="w-full h-full object-contain p-0.5" />
                    </div>
                  </div>
                  <div>
                    <h5 className="text-gray-900 dark:text-white font-bold text-sm">شركة السمام</h5>
                    <p className="text-xs text-gray-500 dark:text-gray-400">لتقنية المعلومات</p>
                    <p className="text-[10px] text-primary-500 mt-0.5 group-hover:translate-x-0.5 transition-transform">
                      www.alssemam.com
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-500 dark:text-gray-400"> 2026 {tokens.brand.name}. جميع الحقوق محفوظة.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-xs text-gray-500 dark:text-gray-400 hover:text-primary-500">سياسة الخصوصية</Link>
            <Link href="#" className="text-xs text-gray-500 dark:text-gray-400 hover:text-primary-500">الشروط والأحكام</Link>
          </div>
        </div>
      </div>

      <motion.button onClick={scrollToTop} whileHover={{ scale: 1.1 }} className="absolute bottom-4 right-4 p-2 bg-primary-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all">
        <FaArrowUp className="text-sm" />
      </motion.button>
    </footer>
  );
}
