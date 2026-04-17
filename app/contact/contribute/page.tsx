'use client';
import { motion } from 'motion/react';
import { FaHandHoldingHeart, FaMoneyBill, FaClock, FaShare } from 'react-icons/fa6';

const ways = [
  { icon: FaMoneyBill, title: 'تبرع مالي', desc: 'تبرعك المالي يساعدنا في تمويل مشاريعنا الإنسانية', color: '#22c55e' },
  { icon: FaClock, title: 'تطوع بوقتك', desc: 'انضم إلى فريقنا التطوعي وساهم في العمل الميداني', color: '#2563eb' },
  { icon: FaShare, title: 'انشر رسالتنا', desc: 'ساعدنا في نشر الوعي بقضايانا الإنسانية', color: '#f97316' },
];

export default function ContributePage() {
  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white section-py">
        <div className="container-page text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white">ساهم معنا</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="section-subtitle text-white/90">طرق متعددة للمساهمة في عملنا الإنساني</motion.p>
        </div>
      </section>

      <section className="section-py">
        <div className="container-page">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {ways.map((way, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center card-hover">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center" style={{ background: way.color + '20' }}>
                  <way.icon className="text-4xl" style={{ color: way.color }} />
                </div>
                <h3 className="text-xl font-bold mb-3">{way.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{way.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="bg-gradient-to-r from-primary-500 to-secondary-500 p-10 rounded-3xl text-white text-center">
            <FaHandHoldingHeart className="text-5xl mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">كن جزءاً من التغيير اليوم</h2>
            <p className="text-xl mb-6 opacity-90">تبرعك مهما كان صغيراً يحدث فرقاً كبيراً في حياة المحتاجين</p>
            <button className="px-10 py-4 bg-white text-primary-600 rounded-full font-bold text-lg hover:scale-105 transition-transform">تبرع الآن</button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}