'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaUsers, FaMapPin, FaFolder } from 'react-icons/fa6';

import { projectsAPI } from '@/lib/api';

type ProjectDetail = {
  id?: number | string;
  title_ar?: string;
  image?: string;
  beneficiaries?: number;
  location?: string;
  status?: 'active' | 'completed' | string;
  description?: string;
  program?: {
    name_ar?: string;
  };
};

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const data = (await projectsAPI.getOne(Number(id))) as ProjectDetail;
        setProject(data);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProject();
  }, [id]);

  if (loading) {
    return <div className="pt-navbar container-page section-py text-center">جاري التحميل...</div>;
  }

  if (!project) {
    return <div className="pt-navbar container-page section-py text-center">المشروع غير موجود</div>;
  }

  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white section-py">
        <div className="container-page">
          <Link href="/projects" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <FaArrowLeft /> العودة للمشاريع
          </Link>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {project.title_ar}
          </motion.h1>

          <div className="flex flex-wrap gap-4 text-white/80 text-sm">
            <span className="flex items-center gap-1">
              <FaUsers /> {project.beneficiaries?.toLocaleString()} مستفيد
            </span>

            <span className="flex items-center gap-1">
              <FaMapPin /> {project.location}
            </span>

            <span className="flex items-center gap-1">
              <FaFolder /> {project.program?.name_ar}
            </span>

            <span
              className={`px-3 py-1 rounded-full text-xs ${
                project.status === 'active' ? 'bg-green-500' : 'bg-blue-500'
              }`}
            >
              {project.status === 'active' ? 'جاري' : 'مكتمل'}
            </span>
          </div>
        </div>
      </section>

      <section className="section-py">
        <div className="container-page max-w-4xl">
          {project.image && (
            <div className="relative mb-8 overflow-hidden rounded-2xl aspect-video">
              <Image
                src={project.image}
                alt={project.title_ar || 'صورة المشروع'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}