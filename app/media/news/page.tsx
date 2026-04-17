'use client';
import { motion } from 'motion/react';
import { FaNewspaper, FaCalendar, FaArrowLeft } from 'react-icons/fa6';
import Link from 'next/link';

const news = [
  { id: 1, title: 'توزيع 5000 سلة غذائية في محافظة الضالع', date: '2026-04-15', excerpt: 'ضمن مشروع الأمن الغذائي، وزعت مؤسسة إنسان 5000 سلة غذائية للأسر الأكثر احتياجاً...', image: '/images/news1.jpg' },
  { id: 2, title: 'اختتام دورة تدريبية في مجال التمكين الاقتصادي', date: '2026-04-10', excerpt: 'اختتمت مؤسسة إنسان دورة تدريبية لـ 50 شاباً وشابة في مجال ريادة الأعمال...', image: '/images/news2.jpg' },
  { id: 3, title: 'حملة طبية مجانية في مديرية جحاف', date: '2026-04-05', excerpt: 'نفذت مؤسسة إنسان حملة طبية مجانية استفاد منها أكثر من 1200 مريض...', image: '/images/news3.jpg' },
  { id: 4, title: 'توقيع اتفاقية شراكة مع برنامج الأغذية العالمي', date: '2026-03-28', excerpt: 'وقعت مؤسسة إنسان اتفاقية شراكة استراتيجية مع برنامج الأغذية العالمي...', image: '/images/news4.jpg' },
];

export default function NewsPage() {
  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white section-py">
        <div className="container-page text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white">
            آخر الأخبار
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="section-subtitle text-white/90">
            تابع أحدث أخبار وأنشطة مؤسسة إنسان
          </motion.p>
        </div>
      </section>

      <section className="section-py bg-gray-50 dark:bg-gray-900">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {news.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden card-hover"
              >
                <div className="h-48 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                  <FaNewspaper className="text-6xl text-primary-500/50" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <FaCalendar className="text-primary-500" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 hover:text-primary-500 transition-colors">
                    <Link href={`/media/news/${item.id}`}>{item.title}</Link>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{item.excerpt}</p>
                  <Link
                    href={`/media/news/${item.id}`}
                    className="inline-flex items-center gap-2 text-primary-500 font-medium hover:gap-3 transition-all"
                  >
                    اقرأ المزيد <FaArrowLeft className="text-sm" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
