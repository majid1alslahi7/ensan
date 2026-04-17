'use client';
import { motion } from 'motion/react';
import { FaStar, FaQuoteRight } from 'react-icons/fa6';

const stories = [
  { title: 'أحمد - من النزوح إلى التمكين', desc: 'بعد فقدان منزله، حصل على تدريب مهني وبدأ مشروعه الصغير', location: 'مأرب' },
  { title: 'فاطمة - قصة كفاح', desc: 'أرملة وأم لخمسة أطفال، تم تمكينها اقتصادياً عبر مشروع خياطة', location: 'الضالع' },
  { title: 'محمد - العودة إلى المدرسة', desc: 'طفل نازح عاد إلى التعليم بفضل برامج الدعم التعليمي', location: 'صنعاء' },
];

export default function SuccessStoriesPage() {
  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white section-py">
        <div className="container-page text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white">قصص نجاح</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="section-subtitle text-white/90">قصص ملهمة من المستفيدين من برامجنا</motion.p>
        </div>
      </section>

      <section className="section-py">
        <div className="container-page">
          <div className="grid md:grid-cols-3 gap-8">
            {stories.map((story, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg card-hover relative">
                <FaQuoteRight className="absolute top-6 right-6 text-4xl text-primary-200 dark:text-primary-900/30" />
                <FaStar className="text-3xl text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold mb-3">{story.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{story.desc}</p>
                <p className="text-primary-500 font-medium">{story.location}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}