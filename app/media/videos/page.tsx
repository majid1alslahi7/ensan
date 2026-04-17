'use client';
import { motion } from 'motion/react';
import { FaVideo, FaPlay } from 'react-icons/fa6';

const videos = [
  { id: 1, title: 'تقرير مشروع الأمن الغذائي 2026', duration: '5:30' },
  { id: 2, title: 'قصص نجاح - المستفيدون يتحدثون', duration: '8:15' },
  { id: 3, title: 'حملة إغاثة عاجلة في مأرب', duration: '3:45' },
  { id: 4, title: 'يوم في حياة متطوع', duration: '6:20' },
];

export default function VideosPage() {
  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white section-py">
        <div className="container-page text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white">
            مكتبة الفيديو
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="section-subtitle text-white/90">
            فيديوهات توثق أنشطتنا وإنجازاتنا
          </motion.p>
        </div>
      </section>

      <section className="section-py">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((video, i) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden card-hover"
              >
                <div className="relative h-48 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                  <FaVideo className="text-6xl text-primary-500/50" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
                      <FaPlay className="text-white text-2xl mr-1" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 right-3 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                    {video.duration}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{video.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
