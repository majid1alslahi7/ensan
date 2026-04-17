'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaUsers, FaGlobe, FaFolderOpen, FaHeart, FaArrowLeft,
  FaNewspaper, FaStar, FaChartPie, FaPhone,
  FaMagnifyingGlass, FaWheatAwn, FaHouseChimney, FaBook, FaDroplet,
  FaCalendar, FaChevronLeft, FaChevronRight, FaPause, FaPlay, FaImages
} from 'react-icons/fa6';
import { siteData } from '@/lib/data/siteData';
import { tokens } from '@/lib/tokens';

const galleryImages = [
  { src: '/images/gallery1.jpg', alt: 'مشروع الأمن الغذائي' },
  { src: '/images/gallery2.jpg', alt: 'توزيع المساعدات الإنسانية' },
  { src: '/images/gallery3.jpg', alt: 'حملة طبية مجانية' },
  { src: '/images/gallery4.jpg', alt: 'مشروع المياه والإصحاح البيئي' },
  { src: '/images/gallery5.jpg', alt: 'دعم التعليم للأطفال' },
  { src: '/images/gallery6.jpg', alt: 'فريق المتطوعين الميداني' },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  const stats = [
    { icon: FaFolderOpen, label: 'مشروع', value: siteData.stats.projects, color: '#1A5F7A' },
    { icon: FaUsers, label: 'مستفيد', value: siteData.stats.individuals.toLocaleString(), color: '#159C4B' },
    { icon: FaGlobe, label: 'محافظة', value: siteData.stats.locations, color: '#D4621A' },
    { icon: FaHeart, label: 'متطوع', value: siteData.stats.volunteers, color: '#EF4444' }
  ];

  const quickLinks = [
    { title: 'من نحن', href: '/about', icon: FaUsers, color: '#1A5F7A', desc: 'تعرف على رؤيتنا ورسالتنا وقيمنا' },
    { title: 'البرامج', href: '/programs', icon: FaWheatAwn, color: '#159C4B', desc: '7 قطاعات رئيسية للدعم الشامل' },
    { title: 'المشاريع', href: '/projects', icon: FaFolderOpen, color: '#D4621A', desc: 'أبرز مشاريعنا الإنسانية' },
    { title: 'الإعلام', href: '/media', icon: FaNewspaper, color: '#3B82F6', desc: 'أخبار، صور، فيديوهات' },
    { title: 'التقارير', href: '/reports', icon: FaChartPie, color: '#8B5CF6', desc: 'تقاريرنا وإنجازاتنا' },
    { title: 'تواصل معنا', href: '/contact', icon: FaPhone, color: '#EF4444', desc: 'نحن هنا للإجابة على استفساراتكم' }
  ];

  const news = [
    { title: 'توزيع 5000 سلة غذائية في الضالع', date: '2026-04-15', icon: FaNewspaper },
    { title: 'اختتام دورة تدريبية في التمكين الاقتصادي', date: '2026-04-10', icon: FaStar },
    { title: 'حملة طبية مجانية في مديرية جحاف', date: '2026-04-05', icon: FaHeart }
  ];

  const programsPreview = [
    { id: 'food-security', name: 'الأمن الغذائي', icon: FaWheatAwn, color: '#1A5F7A', desc: 'تعزيز الأمن الغذائي وتحسين سبل العيش' },
    { id: 'shelter', name: 'المأوى', icon: FaHouseChimney, color: '#159C4B', desc: 'الاستجابة لاحتياجات النازحين' },
    { id: 'education', name: 'التعليم', icon: FaBook, color: '#D4621A', desc: 'خفض معدلات الأمية والانقطاع عن التعليم' },
    { id: 'water', name: 'المياه والإصحاح', icon: FaDroplet, color: '#3B82F6', desc: 'تحسين الوصول للمياه والصرف الصحي' }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      slideInterval.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
      }, 4000);
    }
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  return (
    <main className="overflow-x-hidden">
      <Toaster position="top-center" />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/80 to-secondary-900/90 z-0" />
        <div className="absolute inset-0 bg-[url('/icon1.png')] bg-center bg-no-repeat opacity-10 z-0" style={{ backgroundSize: '400px' }} />
        
        <div className="absolute inset-0 overflow-hidden z-0">
          <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }} transition={{ duration: 20, repeat: Infinity }} className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <motion.div animate={{ scale: [1.2, 1, 1.2], rotate: [45, 0, 45] }} transition={{ duration: 25, repeat: Infinity }} className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-secondary-500/10 blur-3xl" />
        </div>
        
        <div className="relative z-10 container-page text-center text-white">
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-5xl md:text-7xl font-bold mb-6">
            {tokens.brand.nameAr}
          </motion.h1>
          
          <motion.p initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-xl md:text-3xl mb-10 opacity-95">
            {tokens.brand.sloganAr}
          </motion.p>
          
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن مشاريع، أخبار، تقارير..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pr-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 text-lg"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                <FaMagnifyingGlass className="text-white text-xl" />
              </button>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }} className="flex flex-wrap gap-4 justify-center mt-8">
            <Link href="/about"><motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn bg-white text-gray-900 hover:bg-gray-100">تعرف علينا <FaArrowLeft /></motion.span></Link>
            <Link href="/contact/contribute"><motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600">تبرع الآن</motion.span></Link>
          </motion.div>
        </div>
        
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 z-10">
          <div className="w-7 h-12 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div animate={{ y: [0, 16, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 bg-white rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="section-py bg-gray-50 dark:bg-gray-900">
        <div className="container-page">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="section-title">أثرنا في أرقام</motion.h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -8 }} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: stat.color + '20' }}>
                  <stat.icon className="text-3xl" style={{ color: stat.color }} />
                </div>
                <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                <p className="text-gray-500 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* معرض الصور - يوجه لصفحة المعرض عند الضغط */}
      <section className="section-py bg-white dark:bg-gray-950">
        <div className="container-page">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="section-title flex items-center justify-center gap-3">
            <FaImages className="text-primary-500" />
            معرض الصور
            <FaImages className="text-primary-500" />
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} className="section-subtitle">لقطات من أنشطتنا الإنسانية</motion.p>
          
          <div className="relative max-w-5xl mx-auto">
            <Link href="/media/gallery">
              <motion.div 
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                  <h3 className="text-xl md:text-2xl font-bold">{galleryImages[currentSlide].alt}</h3>
                  <p className="text-sm opacity-80 mt-2 flex items-center gap-1">
                    اضغط للمشاهدة <FaArrowLeft className="text-xs group-hover:translate-x-1 transition-transform" />
                  </p>
                </div>
                <div className="w-full h-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
                  <Image 
                    src={galleryImages[currentSlide].src} 
                    alt={galleryImages[currentSlide].alt}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all z-15" />
              </motion.div>
            </Link>
            
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-all"
            >
              <FaChevronRight className="text-white text-xl" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-all"
            >
              <FaChevronLeft className="text-white text-xl" />
            </button>
            
            <div className="absolute bottom-4 right-4 z-30">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsAutoPlaying(!isAutoPlaying); }}
                className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-all"
              >
                {isAutoPlaying ? <FaPause className="text-white" /> : <FaPlay className="text-white" />}
              </button>
            </div>
            
            <div className="flex justify-center gap-2 mt-4">
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrentSlide(i); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 8000); }}
                  className={`h-2 rounded-full transition-all ${i === currentSlide ? 'bg-primary-500 w-8' : 'bg-gray-300 dark:bg-gray-700 w-2'}`}
                />
              ))}
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/media/gallery" className="btn btn-primary">
              عرض جميع الصور <FaArrowLeft />
            </Link>
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="section-py bg-gray-50 dark:bg-gray-900">
        <div className="container-page">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="section-title">برامجنا وقطاعاتنا</motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {programsPreview.map((program, i) => {
              const Icon = program.icon;
              return (
                <Link key={program.id} href="/programs">
                  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -5 }} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center h-full">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ background: program.color + '20' }}>
                      <Icon className="text-2xl" style={{ color: program.color }} />
                    </div>
                    <h3 className="font-bold mb-2">{program.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{program.desc}</p>
                  </motion.div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link href="/programs" className="btn btn-primary">عرض جميع البرامج <FaArrowLeft /></Link>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="section-py">
        <div className="container-page">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="section-title">آخر الأخبار</motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -5 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                    <item.icon className="text-xl text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1"><FaCalendar /> {item.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/media/news" className="btn btn-outline border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white">عرض جميع الأخبار <FaArrowLeft /></Link>
          </div>
        </div>
      </section>

      {/* Quick Links Grid */}
      <section className="section-py bg-gray-50 dark:bg-gray-900">
        <div className="container-page">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="section-title">روابط سريعة</motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {quickLinks.map((link, i) => (
              <Link key={i} href={link.href}>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.02 }} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center h-full border border-gray-200 dark:border-gray-700">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ background: link.color + '20' }}>
                    <link.icon className="text-xl" style={{ color: link.color }} />
                  </div>
                  <h3 className="font-bold mb-1">{link.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{link.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
