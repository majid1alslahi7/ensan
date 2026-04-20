'use client';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FaStar, FaQuoteRight, FaUser, FaMapPin } from 'react-icons/fa6';
import { successStoriesAPI } from '@/lib/api';

export default function SuccessStoriesPage() {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStories() {
      try {
        const data = await successStoriesAPI.getAll();
        setStories(data.data || data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStories();
  }, []);

  if (loading) return <div className="pt-navbar container-page section-py text-center">جاري التحميل...</div>;

  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white section-py">
        <div className="container-page text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white">قصص نجاح</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-subtitle text-white/90">قصص ملهمة من المستفيدين</motion.p>
        </div>
      </section>

      <section className="section-py">
        <div className="container-page">
          <div className="grid md:grid-cols-2 gap-6">
            {stories.map((story, i) => (
              <motion.div key={story.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg relative">
                <FaQuoteRight className="absolute top-6 right-6 text-4xl opacity-10" />
                <FaStar className="text-3xl text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold mb-3">{story.title_ar}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{story.content}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><FaUser /> {story.person_name}</span>
                  <span className="flex items-center gap-1"><FaMapPin /> {story.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
