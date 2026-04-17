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

  return (
    <footer className="relative bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-auto border-t border-gray-200 dark:border-gray-800">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500" />
      
      <div className="container-page py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & About */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 p-0.5">
                <div className="w-full h-full rounded-xl bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                  <Image src="/icon1.png" alt="Eusran Logo" width={48} height={48} className="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                <h3 className="text-gray-900 dark:text-white text-2xl font-bold">{tokens.brand.name}</h3>
                <p className="text-sm text-primary-500 dark:text-primary-400">{tokens.brand.sloganAr}</p>
              </div>
            </div>
            <p className="text-sm mb-6 leading-relaxed text-gray-600 dark:text-gray-400">{siteData.about.description.substring(0, 150)}...</p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social, i) => (
                <motion.a key={i} href={social.href} whileHover={{ scale: 1.15, y: -3 }} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-opacity-80 transition-all duration-300">
                  <social.icon className="text-lg" style={{ color: social.color }} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h4 className="text-gray-900 dark:text-white text-xl font-bold mb-6 flex items-center gap-2">
              <FaCode className="text-primary-500" /> روابط سريعة
            </h4>
            <ul className="space-y-3">
              {siteData.navigation.main.slice(0, 6).map((item: any) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h4 className="text-gray-900 dark:text-white text-xl font-bold mb-6 flex items-center gap-2">
              <FaPhone className="text-primary-500" /> تواصل معنا
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <div className="p-2 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
                  <FaPhone className="text-primary-500 text-sm" />
                </div>
                +967 123 456 789
              </li>
              <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <div className="p-2 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
                  <FaEnvelope className="text-primary-500 text-sm" />
                </div>
                info@eusran.org
              </li>
              <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <div className="p-2 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
                  <FaLocationDot className="text-primary-500 text-sm" />
                </div>
                الضالع - اليمن
              </li>
            </ul>
          </motion.div>

          {/* Developer */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <h4 className="text-gray-900 dark:text-white text-xl font-bold mb-6 flex items-center gap-2">
              <FaCode className="text-primary-500" /> تم التطوير بواسطة
            </h4>
            <Link href="/aboutdeveloper" className="block group">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary-500/50 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 p-0.5 shadow-lg group-hover:shadow-xl transition-all">
                    <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                      <Image src="/develper.ico" alt="Developer" width={64} height={64} className="w-full h-full object-contain p-1" />
                    </div>
                  </div>
                  <div>
                    <h5 className="text-gray-900 dark:text-white font-bold text-lg">شركة السمام</h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">لتقنية المعلومات</p>
                    <p className="text-xs text-primary-500 mt-1 group-hover:translate-x-1 transition-transform">
                      www.alssemam.com
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2026 {tokens.brand.name}. جميع الحقوق محفوظة.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors">سياسة الخصوصية</Link>
            <Link href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors">الشروط والأحكام</Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <motion.button onClick={scrollToTop} whileHover={{ scale: 1.1 }} className="absolute bottom-6 right-6 p-3 bg-primary-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all">
        <FaArrowUp />
      </motion.button>
    </footer>
  );
}
