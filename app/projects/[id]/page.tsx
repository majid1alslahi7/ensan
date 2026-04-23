import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaArrowLeft, FaCalendar, FaCircleCheck, FaFolder, FaImages, FaList, FaMapPin, FaUsers } from 'react-icons/fa6';

import MediaGallery from '@/components/content/MediaGallery';
import RichContent from '@/components/content/RichContent';
import { entity, fetchJSON } from '@/lib/api/server';
import { formatDate, formatNumber, galleryImages, primaryImage } from '@/lib/format';
import { extractHashtags } from '@/lib/rich-text';

export const revalidate = 900;

type ProjectProgram = {
  color?: string | null;
  id?: number | string;
  name?: string;
  name_ar?: string;
};

type ProjectDetail = {
  beneficiaries?: number;
  created_at?: string;
  description?: string | null;
  end_date?: string | null;
  featured?: boolean;
  gallery?: string[] | null;
  id: number | string;
  image?: string | null;
  location?: string | null;
  program?: ProjectProgram | null;
  start_date?: string | null;
  status?: string | null;
  title?: string;
  title_ar?: string;
};

async function getProject(id: string): Promise<ProjectDetail | null> {
  const payload = await fetchJSON<ProjectDetail | { data?: ProjectDetail }>(`/projects/${id}`, 900);
  return entity<ProjectDetail>(payload, 'project');
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  const title = project.title_ar || project.title || 'تفاصيل المشروع';
  const cover = primaryImage(project.image, project.gallery);
  const gallery = project.image ? galleryImages(project.gallery) : galleryImages(project.gallery).slice(1);
  const tags = extractHashtags(project.description);
  const programName = project.program?.name_ar || project.program?.name || 'غير مصنف';
  const accent = project.program?.color || '#1A5F7A';

  return (
    <div className="pt-navbar bg-gray-50 dark:bg-gray-950">
      <section className="overflow-hidden text-white" style={{ background: `linear-gradient(135deg, ${accent} 0%, #159C4B 100%)` }}>
        <div className="container-page py-12 md:py-16">
          <Link href="/projects" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white">
            <FaArrowLeft />
            العودة إلى المشاريع
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="mb-5 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                  <FaFolder />
                  {programName}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                  <FaCircleCheck />
                  {project.status === 'active' ? 'قيد التنفيذ' : 'مكتمل'}
                </span>
              </div>

              <h1 className="max-w-4xl text-3xl font-bold leading-tight md:text-5xl">{title}</h1>
              <div className="mt-8 grid gap-3 text-sm text-white/85 sm:grid-cols-2 xl:grid-cols-4">
                <p className="rounded-2xl bg-black/15 px-4 py-3 backdrop-blur">
                  <span className="mb-1 block text-xs text-white/60">الموقع</span>
                  {project.location || 'غير محدد'}
                </p>
                <p className="rounded-2xl bg-black/15 px-4 py-3 backdrop-blur">
                  <span className="mb-1 block text-xs text-white/60">المستفيدون</span>
                  {formatNumber(project.beneficiaries)}
                </p>
                <p className="rounded-2xl bg-black/15 px-4 py-3 backdrop-blur">
                  <span className="mb-1 block text-xs text-white/60">تاريخ البدء</span>
                  {formatDate(project.start_date || project.created_at)}
                </p>
                <p className="rounded-2xl bg-black/15 px-4 py-3 backdrop-blur">
                  <span className="mb-1 block text-xs text-white/60">تاريخ الانتهاء</span>
                  {formatDate(project.end_date)}
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
              <div className="relative aspect-[4/3]">
                <Image src={cover} alt={title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" priority />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-py">
        <div className="container-page grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
          <article className="space-y-8">
            <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-300">
                  <FaList className="text-lg" />
                </span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">تفاصيل المشروع</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">عرض منسق للوصف مع التعرف على الوسوم والروابط تلقائياً</p>
                </div>
              </div>
              <RichContent content={project.description || ''} />
            </div>

            <MediaGallery images={gallery} title={title} />
          </article>

          <aside className="space-y-6 xl:sticky xl:top-28 xl:self-start">
            <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">بطاقة المشروع</h3>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <p className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3 dark:bg-gray-800/70">
                  <FaMapPin className="text-primary-500" />
                  <span>{project.location || 'غير محدد'}</span>
                </p>
                <p className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3 dark:bg-gray-800/70">
                  <FaUsers className="text-primary-500" />
                  <span>{formatNumber(project.beneficiaries)} مستفيد</span>
                </p>
                <p className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3 dark:bg-gray-800/70">
                  <FaCalendar className="text-primary-500" />
                  <span>{formatDate(project.start_date || project.created_at)}</span>
                </p>
                <p className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3 dark:bg-gray-800/70">
                  <FaImages className="text-primary-500" />
                  <span>{gallery.length} صور إضافية</span>
                </p>
              </div>
            </div>

            {tags.length > 0 ? (
              <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">الوسوم</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex rounded-full bg-primary-50 px-3 py-1.5 text-sm font-semibold text-primary-700 ring-1 ring-primary-100 dark:bg-primary-900/20 dark:text-primary-300 dark:ring-primary-800/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </section>
    </div>
  );
}
