'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FaGlobe, FaEnvelope, FaWhatsapp, 
  FaFacebookF, FaInstagram, FaTwitter, FaLinkedin, FaTiktok, FaYoutube,
  FaLaptopCode, FaMobileScreen, FaPalette, FaCartShopping, FaCloud,
  FaCircleCheck, FaArrowLeft
} from 'react-icons/fa6';

export default function AboutDeveloperPage() {
  const services = [
    { icon: FaLaptopCode, title: 'تطوير الويب', desc: 'مواقع احترافية متجاوبة', color: '#3B82F6' },
    { icon: FaMobileScreen, title: 'تطبيقات الجوال', desc: 'Android & iOS', color: '#22C55E' },
    { icon: FaPalette, title: 'تصميم UX/UI', desc: 'واجهات عصرية وجذابة', color: '#F97316' },
    { icon: FaCartShopping, title: 'متاجر إلكترونية', desc: 'حلول متكاملة للتجارة', color: '#EF4444' },
    { icon: FaCloud, title: 'حلول سحابية', desc: 'استضافة آمنة وموثوقة', color: '#8B5CF6' },
  ];

  const socialLinks = [
    { icon: FaFacebookF, name: 'فيسبوك', href: 'https://facebook.com/alssemam', color: '#1877F2' },
    { icon: FaInstagram, name: 'انستجرام', href: 'https://instagram.com/alssemam', color: '#E4405F' },
    { icon: FaTwitter, name: 'تويتر', href: 'https://twitter.com/alssemam', color: '#1DA1F2' },
    { icon: FaLinkedin, name: 'لينكد إن', href: 'https://linkedin.com/company/alssemam', color: '#0A66C2' },
    { icon: FaTiktok, name: 'تيك توك', href: 'https://tiktok.com/@alssemam', color: '#000000' },
    { icon: FaYoutube, name: 'يوتيوب', href: 'https://youtube.com/@alssemam', color: '#FF0000' },
  ];

  const features = [
    'فريق محترف ومتخصص',
    'أسعار تنافسية',
    'دعم فني 24/7',
    'تصاميم عصرية وجذابة',
    'أحدث التقنيات'
  ];

  return (
    <div className="pt-navbar">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 text-white section-py overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }} transition={{ duration: 20, repeat: Infinity }} className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-white blur-3xl" />
          <motion.div animate={{ scale: [1.2, 1, 1.2], rotate: [45, 0, 45] }} transition={{ duration: 25, repeat: Infinity }} className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-secondary-500/10 blur-3xl" />
        </div>
        
        <div className="container-page relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8 }} 
            className="mb-6"
          >
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 p-1 shadow-2xl">
              <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center p-2">
                <Image 
                  src="/develper.ico" 
                  alt="Al-Samam Logo" 
                  width={100} 
                  height={100} 
                  className="w-full h-full object-contain rounded-full" 
                />
              </div>
            </div>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-bold mb-4">
            شركة السمام
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-2xl md:text-3xl mb-6 opacity-95">
            شريكك التقني الأمثل
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-xl italic">
            نطلق أعمالكم في آفاق التقنية كالسمام
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-py bg-gray-50 dark:bg-gray-900">
        <div className="container-page">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="section-title">خدماتنا</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: service.color + '20' }}>
                  <service.icon className="text-3xl" style={{ color: service.color }} />
                </div>
                <h3 className="font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us & Contact */}
      <section className="section-py">
        <div className="container-page">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">لماذا تختار السمام؟</h3>
              <div className="space-y-4">
                {features.map((feature, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <FaCircleCheck className="text-green-500 text-sm" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl">
                <p className="text-center text-lg italic text-gray-700 dark:text-gray-300">
                  كالسمام نعلو ونرتقي... معاً نحو آفاق التميز والإبداع
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}>
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white p-8 rounded-3xl mb-6">
                <h3 className="text-2xl font-bold mb-6">للتواصل والاستفسار</h3>
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <FaWhatsapp className="text-2xl" />
                    </div>
                    <div>
                      <p className="text-sm opacity-80">واتساب</p>
                      <p className="text-xl font-bold" dir="ltr">+967 715122500</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <FaEnvelope className="text-2xl" />
                    </div>
                    <div>
                      <p className="text-sm opacity-80">البريد الإلكتروني</p>
                      <p className="text-lg font-bold">info@alssemam.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <FaGlobe className="text-2xl" />
                    </div>
                    <div>
                      <p className="text-sm opacity-80">الموقع الإلكتروني</p>
                      <Link href="https://alssemam.com" target="_blank" className="text-lg font-bold hover:underline">
                        www.alssemam.com
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg">
                <h3 className="text-xl font-bold mb-6">تابعونا على وسائل التواصل</h3>
                <div className="grid grid-cols-3 gap-3">
                  {socialLinks.map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      whileHover={{ scale: 1.1, y: -3 }}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-900 hover:shadow-md transition-all"
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: social.color + '20' }}>
                        <social.icon className="text-xl" style={{ color: social.color }} />
                      </div>
                      <span className="text-xs font-medium">{social.name}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hashtags */}
      <section className="pb-16">
        <div className="container-page text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex flex-wrap gap-3 justify-center">
            {['السمام', 'تطوير_مواقع', 'تطبيقات_الجوال', 'تصميم', 'تقنية', 'اليمن', 'برمجة', 'مواقع_ويب', 'متاجر_إلكترونية'].map((tag, i) => (
              <motion.span key={i} whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm">
                #{tag}
              </motion.span>
            ))}
          </motion.div>
          
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-12">
            <Link href="/" className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 transition-colors">
              <FaArrowLeft /> العودة إلى الرئيسية
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
