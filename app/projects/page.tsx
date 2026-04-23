'use client';
import { Suspense, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { FaList, FaMapPin, FaUsers, FaArrowLeft } from 'react-icons/fa6';
import { programsAPI, projectsAPI } from '@/lib/api';
import { formatNumber, imageUrl } from '@/lib/format';

export default function ProjectsPage() {
  return (
    <Suspense fallback={<ProjectsLoading />}>
      <ProjectsContent />
    </Suspense>
  );
}

function ProjectsLoading() {
  return (
    <div className="pt-navbar container-page section-py text-center">
      <p className="text-gray-500">جاري تحميل المشاريع...</p>
    </div>
  );
}

function ProjectsContent() {
  const searchParams = useSearchParams();
  const programId = searchParams.get('program_id');
  const [projects, setProjects] = useState<any[]>([]);
  const [program, setProgram] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const [projectsData, programData] = await Promise.all([
          projectsAPI.getAll(programId ? { program_id: programId, per_page: 50 } : undefined),
          programId ? programsAPI.getAll() : Promise.resolve([]),
        ]);

        setProjects(projectsData);
        setProgram(programId ? programData.find((item: any) => String(item.id) === String(programId)) || null : null);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, [programId]);

  if (loading) {
    return <ProjectsLoading />;
  }

  const pageTitle = program ? `مشاريع ${program.name_ar || program.name}` : 'أبرز المشاريع';
  const pageDescription = program
    ? `المشاريع المرتبطة ببرنامج ${program.name_ar || program.name}`
    : 'تعرف على أبرز مشاريعنا الإنسانية والتنموية';

  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white section-py">
        <div className="container-page text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white">
            {pageTitle}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="section-subtitle text-white/90">
            {pageDescription}
          </motion.p>
          {program && (
            <Link href="/programs" className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-sm font-semibold text-white hover:bg-white/25">
              <FaArrowLeft /> العودة للبرامج
            </Link>
          )}
        </div>
      </section>

      <section className="section-py bg-gray-50 dark:bg-gray-900">
        <div className="container-page">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="h-2" style={{ background: project.program?.color || '#1A5F7A' }} />
                {project.image && (
                  <div className="relative h-44">
                    <Image src={imageUrl(project.image)} alt={project.title_ar || 'مشروع'} fill className="object-cover" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: (project.program?.color || '#1A5F7A') + '20' }}>
                      <FaList className="text-2xl" style={{ color: project.program?.color || '#1A5F7A' }} />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                      {project.status === 'active' ? 'جاري' : 'مكتمل'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{project.title_ar}</h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-2"><FaMapPin className="text-primary-500" /> {project.location}</div>
                    <div className="flex items-center gap-2"><FaUsers className="text-primary-500" /> {formatNumber(project.beneficiaries)} مستفيد</div>
                    {project.program && (
                      <div className="flex items-center gap-2"><FaList className="text-primary-500" /> {project.program.name_ar}</div>
                    )}
                  </div>
                  {/* رابط التفاصيل */}
                  <Link 
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-2 text-primary-500 font-medium hover:gap-3 transition-all"
                  >
                    تفاصيل المشروع <FaArrowLeft className="text-sm" />
                  </Link>
                </div>
              </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 text-center shadow-lg">
              <FaList className="text-5xl text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">لا توجد مشاريع حالياً</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {program ? 'سيتم عرض مشاريع هذا البرنامج عند إضافتها في النظام.' : 'سيتم عرض المشاريع عند إضافتها في النظام.'}
              </p>
              <Link href="/programs" className="btn btn-primary">عرض البرامج <FaArrowLeft /></Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
