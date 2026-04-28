'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { 
  FaFacebookF, FaX, FaInstagram, FaYoutube, FaEnvelope, 
  FaPhone, FaLocationDot, FaWhatsapp, FaTelegram, FaArrowUp,
  FaLinkedinIn, FaTiktok, FaCode
} from 'react-icons/fa6';
import { tokens } from '@/lib/tokens';
import { siteData } from '@/lib/data/siteData';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { API_URL } from '@/lib/api';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_WHATSAPP, contactLinks } from '@/lib/contact';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const socialLinks = [
    { icon: FaFacebookF, href: contactLinks.facebook, color: '#1877F2', name: 'فيسبوك' },
    { icon: FaX, href: contactLinks.x, color: '#000000', name: 'إكس' },
    { icon: FaInstagram, href: contactLinks.instagram, color: '#E4405F', name: 'انستجرام' },
    { icon: FaYoutube, href: contactLinks.youtube, color: '#FF0000', name: 'يوتيوب' },
    { icon: FaLinkedinIn, href: contactLinks.linkedin, color: '#0A66C2', name: 'لينكد إن' },
    { icon: FaTiktok, href: contactLinks.tiktok, color: '#000000', name: 'تيك توك' },
    { icon: FaWhatsapp, href: contactLinks.whatsapp, color: '#25D366', name: 'واتساب' },
    { icon: FaTelegram, href: contactLinks.telegram, color: '#26A5E4', name: 'تيليجرام' },
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error('الرجاء إدخال البريد الإلكتروني'); return; }
    setSubscribing(true);
    try {
      await fetch(`${API_URL}/subscribers`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      toast.success('تم الاشتراك بنجاح'); setEmail('');
    } catch { toast.error('حدث خطأ'); } finally { setSubscribing(false); }
  };

  return (
    <footer className="relative bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-auto border-t border-gray-200 dark:border-gray-800">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500" />
      <div className="container-page py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* القسم الأول - لوجو مستطيل + مطور */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
            <Link href="/" className="block">
              <div className="relative h-12 w-48">
                <Image src="/logo-wide.webp" alt={tokens.brand.name} fill className="object-contain object-right" sizes="192px" />
              </div>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{siteData.about.description.substring(0, 120)}...</p>
            
            <Link href="/aboutdeveloper" className="block group mt-4">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-3 border border-gray-200 dark:border-gray-700 hover:border-primary-500/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 shrink-0">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 p-0.5 group-hover:scale-110 transition-transform">
                      <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                        <Image src="/develper.ico" alt="شركة السمام" width={40} height={40} className="w-full h-full object-cover rounded-full" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">تم التطوير بواسطة</p>
                    <h5 className="text-gray-900 dark:text-white font-bold text-sm">شركة السمام</h5>
                    <p className="text-[10px] text-primary-500 dark:text-primary-400 group-hover:translate-x-1 transition-transform">www.alssemam.com</p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* روابط سريعة */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="space-y-4">
            <h4 className="text-gray-900 dark:text-white text-lg font-bold flex items-center gap-2"><span className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center"><FaCode className="text-primary-500 text-sm" /></span>روابط سريعة</h4>
            <ul className="grid grid-cols-2 gap-2">
              {['الرئيسية','من نحن','البرامج','المشاريع','الإحصائيات','الأخبار','التقارير','تواصل معنا','ساهم معنا'].map((name, i) => (
                <li key={i}><Link href={['/','/about','/programs','/projects','/statistics','/media/news','/reports','/contact','/contact/contribute'][i]} className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-primary-500 rounded-full group-hover:scale-150 transition-transform" />{name}</Link></li>
              ))}
            </ul>
          </motion.div>

          {/* معلومات التواصل */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-4">
            <h4 className="text-gray-900 dark:text-white text-lg font-bold flex items-center gap-2"><span className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center"><FaPhone className="text-primary-500 text-sm" /></span>تواصل معنا</h4>
            <ul className="space-y-3">
              {[{icon:FaPhone,label:'اتصل بنا',value:CONTACT_PHONE,link:contactLinks.phone,color:'#1A5F7A'},{icon:FaWhatsapp,label:'واتساب',value:CONTACT_WHATSAPP,link:contactLinks.whatsapp,color:'#25D366'},{icon:FaEnvelope,label:'البريد',value:CONTACT_EMAIL,link:contactLinks.email,color:'#3B82F6'}].map((item,i)=> <li key={i}><a href={item.link} target={item.link.startsWith('http')?'_blank':undefined} className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors group"><span className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 flex items-center justify-center transition-colors"><item.icon style={{color:item.color}} /></span><div><p className="text-xs text-gray-500">{item.label}</p><p className="text-sm font-medium" dir="ltr">{item.value}</p></div></a></li>)}
              <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400"><span className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center"><FaLocationDot className="text-primary-500" /></span><div><p className="text-xs text-gray-500">العنوان</p><p className="text-sm font-medium">الضالع - اليمن</p></div></li>
            </ul>
          </motion.div>

          {/* النشرة البريدية */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="space-y-4">
            <h4 className="text-gray-900 dark:text-white text-lg font-bold flex items-center gap-2"><span className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center"><FaEnvelope className="text-primary-500 text-sm" /></span>النشرة البريدية</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">اشترك ليصلك كل جديد</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative"><input type="email" placeholder="بريدك الإلكتروني" value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-4 py-3 pr-12 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors" /><FaEnvelope className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" /></div>
              <button type="submit" disabled={subscribing} className="w-full py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50">{subscribing?'جاري الاشتراك...':'اشتراك'}</button>
            </form>
            <div className="pt-4"><p className="text-xs text-gray-500 mb-3">تابعنا على</p><div className="flex flex-wrap gap-2">{socialLinks.map((social,i)=> <motion.a key={i} href={social.href} target="_blank" whileHover={{scale:1.15,y:-3}} className="group relative" title={social.name}><span className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:shadow-md transition-all" style={{backgroundColor:social.color+'20'}}><social.icon className="text-lg" style={{color:social.color}} /></span></motion.a>)}</div></div>
          </motion.div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} {tokens.brand.name}. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-6"><Link href="/privacy" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">سياسة الخصوصية</Link><span className="text-gray-300 dark:text-gray-700">|</span><Link href="/terms" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">الشروط والأحكام</Link></div>
        </div>
      </div>
      <motion.button onClick={scrollToTop} whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="absolute bottom-6 right-6 w-12 h-12 bg-primary-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"><FaArrowUp /></motion.button>
    </footer>
  );
}
