import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaCalendar, FaList, FaMapPin, FaUsers } from 'react-icons/fa6';

import { collection, fetchJSON } from '@/lib/api/server';
import { formatDate, formatNumber, primaryImage } from '@/lib/format';

type ProjectProgram = {
  color?: string | null;
  id?: number | string;
  name?: string;
  name_ar?: string;
};

type ProjectItem = {
  beneficiaries?: number;
  created_at?: string;
  end_date?: string | null;
  featured?: boolean;
  gallery?: string[] | null;
  id: number | string;
  image?: string | null;
  location?: string;
  program?: ProjectProgram | null;
  start_date?: string | null;
  status?: string;
  title?: string;
  title_ar?: string;
};

type ProgramItem = {
  id: number | string;
  name?: string;
  name_ar?: string;
};

async function getProjects(programId?: string): Promise<ProjectItem[]> {
  const query = programId ? `?program_id=${encodeURIComponent(programId)}&per_page=50` : '';
  const payload = await fetchJSON<ProjectItem[] | { data?: ProjectItem[] }>(`/projects${query}`, 900);
  return collection<ProjectItem>(payload);
}

async function getPrograms(): Promise<ProgramItem[]> {
  const payload = await fetchJSON<ProgramItem[] | { data?: ProgramItem[] }>('/programs', 1800);
  return collection<ProgramItem>(payload);
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ program_id?: string }>;
}) {
  const { program_id: programId } = await searchParams;
  const [projects, programs] = await Promise.all([
    getProjects(programId),
    programId ? getPrograms() : Promise.resolve([]),
  ]);

  const program = programId
    ? programs.find((item) => String(item.id) === String(programId)) ?? null
    : null;

  const pageTitle = program ? `مشاريع ${program.name_ar || program.name}` : 'أبرز المشاريع';
  const pageDescription = program
    ? `المشاريع المرتبطة ببرنامج ${program.name_ar || program.name}`
    : 'مشاريع إنسانية وتنموية مع صور رئيسية واضحة ومعارض صور في صفحات التفاصيل.';

  return (
    <div className="pt-navbar">
      <section className="section-py overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),_transparent_34%),linear-gradient(135deg,#1A5F7A_0%,#159C4B_100%)] text-white">
        <div className="container-page text-center">
          <h1 className="section-title text-white">{pageTitle}</h1>
          <p className="section-subtitle text-white/90">{pageDescription}</p>
          {program ? (
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-sm font-semibold text-white hover:bg-white/25"
            >
              <FaArrowLeft />
              العودة للبرامج
            </Link>
          ) : null}
        </div>
      </section>

      <section className="section-py bg-gray-50 dark:bg-gray-950">
        <div className="container-page">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => {
                const cover = primaryImage(project.image, project.gallery);
                const programName = project.program?.name_ar || project.program?.name;

                return (
                  <article
                    key={project.id}
                    className="group overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
                  >
                    <Link href={`/projects/${project.id}`} className="block">
                      <div className="relative h-60 overflow-hidden">
                        <Image
                          src={cover}
                          alt={project.title_ar || project.title || 'مشروع'}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute left-4 top-4 flex gap-2">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              project.status === 'active'
                                ? 'bg-emerald-500/90 text-white'
                                : 'bg-slate-900/75 text-white'
                            }`}
                          >
                            {project.status === 'active' ? 'جاري التنفيذ' : 'مكتمل'}
                          </span>
                          {project.featured ? (
                            <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-primary-700">
                              مميز
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </Link>

                    <div className="p-6">
                      <div className="mb-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <FaCalendar className="text-primary-500" />
                        <span>{formatDate(project.start_date || project.created_at)}</span>
                      </div>

                      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                        <Link href={`/projects/${project.id}`} className="hover:text-primary-500">
                          {project.title_ar || project.title}
                        </Link>
                      </h2>

                      <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                        <p className="flex items-center gap-2">
                          <FaMapPin className="text-primary-500" />
                          <span>{project.location || 'غير محدد'}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <FaUsers className="text-primary-500" />
                          <span>{formatNumber(project.beneficiaries)} مستفيد</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <FaList className="text-primary-500" />
                          <span>{programName || 'غير مصنف'}</span>
                        </p>
                      </div>

                      <Link
                        href={`/projects/${project.id}`}
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition hover:gap-3 dark:text-primary-300"
                      >
                        تفاصيل المشروع
                        <FaArrowLeft className="text-xs" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">
              <FaList className="mx-auto mb-4 text-5xl text-gray-300" />
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">لا توجد مشاريع حالياً</h2>
              <p className="mb-6 text-gray-500 dark:text-gray-400">
                {program ? 'سيتم عرض مشاريع هذا البرنامج عند إضافتها في النظام.' : 'سيتم عرض المشاريع عند إضافتها في النظام.'}
              </p>
              <Link href="/programs" className="btn btn-primary">
                عرض البرامج
                <FaArrowLeft />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
