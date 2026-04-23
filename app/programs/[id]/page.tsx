import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaArrowLeft,
  FaChartLine,
  FaCircleInfo,
  FaFolderOpen,
  FaList,
  FaMapPin,
  FaUsers,
} from 'react-icons/fa6';
import { API_URL } from '@/lib/api';
import { excerpt, formatNumber, imageUrl } from '@/lib/format';

type Program = {
  id: number;
  name?: string;
  name_ar?: string;
  description?: string;
  full_description?: string;
  image?: string;
  color?: string;
  projects_count?: number;
  families_count?: number;
  individuals_count?: number;
  locations?: string[];
};

type Project = {
  id: number;
  title?: string;
  title_ar?: string;
  description?: string;
  image?: string;
  status?: string;
  beneficiaries?: number;
  location?: string;
  program?: Program;
};

function collection(payload: any): any[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  return [];
}

async function getProgram(id: string): Promise<Program | null> {
  const response = await fetch(`${API_URL}/programs`, { next: { revalidate: 3600 } });

  if (!response.ok) {
    return null;
  }

  const programs = collection(await response.json()) as Program[];

  return programs.find((program) => String(program.id) === String(id)) || null;
}

async function getProgramProjects(id: string): Promise<Project[]> {
  const response = await fetch(`${API_URL}/projects?program_id=${encodeURIComponent(id)}&per_page=50`, {
    next: { revalidate: 1800 },
  });

  if (!response.ok) {
    return [];
  }

  return collection(await response.json()) as Project[];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const program = await getProgram(id);
  const title = program?.name_ar || program?.name || 'تفاصيل البرنامج';
  const description = excerpt(program?.full_description || program?.description, 155);

  return {
    title: `${title} | مؤسسة إنسان للأعمال الإنسانية`,
    description,
    openGraph: {
      title,
      description,
      images: program?.image ? [{ url: program.image, alt: title }] : undefined,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: program?.image ? [program.image] : undefined,
    },
  };
}

export default async function ProgramDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [program, projects] = await Promise.all([getProgram(id), getProgramProjects(id)]);

  if (!program) {
    return (
      <div className="pt-navbar container-page section-py text-center">
        <h1 className="text-2xl font-bold mb-3">البرنامج غير موجود</h1>
        <Link href="/programs" className="btn btn-primary">العودة للبرامج</Link>
      </div>
    );
  }

  const programColor = program.color || '#1A5F7A';
  const title = program.name_ar || program.name || 'تفاصيل البرنامج';
  const totalBeneficiaries = projects.reduce((total, project) => total + Number(project.beneficiaries || 0), 0);
  const activeProjects = projects.filter((project) => project.status === 'active').length;
  const completedProjects = projects.filter((project) => project.status === 'completed').length;
  const locations = Array.isArray(program.locations) ? program.locations : [];

  const statCards = [
    { label: 'مشروع مرتبط', value: projects.length || program.projects_count || 0, icon: FaFolderOpen, color: programColor },
    { label: 'مستفيد', value: totalBeneficiaries || program.individuals_count || 0, icon: FaUsers, color: '#159C4B' },
    { label: 'مشروع جاري', value: activeProjects, icon: FaChartLine, color: '#D4621A' },
    { label: 'مشروع مكتمل', value: completedProjects, icon: FaCircleInfo, color: '#2563EB' },
  ];

  return (
    <div className="pt-navbar">
      <section className="relative overflow-hidden bg-gray-950 text-white">
        <div className="absolute inset-0">
          <Image src={imageUrl(program.image)} alt={title} fill className="object-cover opacity-45" priority />
          <div className="absolute inset-0 bg-gradient-to-l from-black/85 via-black/60 to-black/40" />
        </div>
        <div className="container-page relative z-10 py-20 md:py-28">
          <Link href="/programs" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <FaArrowLeft /> العودة للبرامج
          </Link>
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full px-4 py-2 text-sm font-semibold mb-5" style={{ backgroundColor: `${programColor}CC` }}>
              برنامج إنساني وتنموي
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-5">{title}</h1>
            <p className="text-lg leading-9 text-white/90">{program.description}</p>
          </div>
        </div>
      </section>

      <section className="section-py bg-gray-50 dark:bg-gray-900">
        <div className="container-page">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {statCards.map((item) => (
              <div key={item.label} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <span className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${item.color}20` }}>
                  <item.icon className="text-xl" style={{ color: item.color }} />
                </span>
                <p className="text-3xl font-bold mb-1">{formatNumber(item.value)}</p>
                <p className="text-gray-500 dark:text-gray-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py">
        <div className="container-page">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4">نبذة عن البرنامج</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-9">
                {program.full_description || program.description || 'سيتم إضافة وصف تفصيلي لهذا البرنامج قريباً.'}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4">نطاق العمل</h2>
              {locations.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {locations.map((location) => (
                    <span key={location} className="inline-flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-700 px-4 py-2 text-sm">
                      <FaMapPin className="text-primary-500" /> {location}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">سيتم تحديث مواقع العمل قريباً.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section-py bg-gray-50 dark:bg-gray-900">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">المشاريع المرتبطة</h2>
              <p className="text-gray-500 dark:text-gray-400">مشاريع هذا البرنامج كما هي مسجلة في نظام Laravel.</p>
            </div>
            <Link href={`/projects?program_id=${program.id}`} className="btn btn-primary">
              عرض كل مشاريع البرنامج <FaArrowLeft />
            </Link>
          </div>

          {projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <article key={project.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                  <div className="relative h-44">
                    <Image src={imageUrl(project.image || program.image)} alt={project.title_ar || project.title || 'مشروع'} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="inline-flex items-center gap-2 text-xs font-semibold rounded-full px-3 py-1" style={{ backgroundColor: `${programColor}20`, color: programColor }}>
                        <FaList /> {title}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${project.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                        {project.status === 'active' ? 'جاري' : 'مكتمل'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{project.title_ar || project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{excerpt(project.description, 130)}</p>
                    <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-5">
                      <div className="flex items-center gap-2"><FaMapPin className="text-primary-500" /> {project.location || 'غير محدد'}</div>
                      <div className="flex items-center gap-2"><FaUsers className="text-primary-500" /> {formatNumber(project.beneficiaries)} مستفيد</div>
                    </div>
                    <Link href={`/projects/${project.id}`} className="inline-flex items-center gap-2 font-semibold text-primary-600 dark:text-primary-400 hover:gap-3 transition-all">
                      تفاصيل المشروع <FaArrowLeft className="text-sm" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 text-center shadow-lg">
              <FaFolderOpen className="text-5xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">لا توجد مشاريع مرتبطة حالياً</h3>
              <p className="text-gray-500 dark:text-gray-400">ستظهر المشاريع هنا مباشرة بعد ربطها بهذا البرنامج في لوحة التحكم.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
