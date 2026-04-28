'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FaVideo, FaPlay, FaEye } from 'react-icons/fa6';

import { videosAPI } from '@/lib/api';
import { formatNumber } from '@/lib/format';

type Video = {
  id: number | string;
  title_ar?: string;
  video_url?: string;
  duration?: string;
  views?: number;
  category?: string;
};

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const data = (await videosAPI.getAll()) as Video[];
        setVideos(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  if (loading) {
    return <div className="pt-navbar container-page section-py text-center">جاري التحميل...</div>;
  }

  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white section-py">
        <div className="container-page text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-title text-white"
          >
            مكتبة الفيديو
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="section-subtitle text-white/90"
          >
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
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="relative h-48 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                  <FaVideo className="text-5xl text-primary-500/50" />

                  {video.video_url && (
                    <a
                      href={video.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
                        <FaPlay className="text-white text-2xl ml-1" />
                      </div>
                    </a>
                  )}

                  {video.duration && (
                    <span className="absolute bottom-3 right-3 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                      {video.duration}
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{video.title_ar}</h3>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <FaEye /> {formatNumber(video.views)} مشاهدة
                    </span>

                    <span>{video.category}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}