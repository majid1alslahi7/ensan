import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaArrowLeft, FaCalendar, FaEye, FaFolder, FaImages, FaPenNib, FaStar } from 'react-icons/fa6';

import MediaGallery from '@/components/content/MediaGallery';
import RichContent from '@/components/content/RichContent';
import { entity, fetchJSON } from '@/lib/api/server';
import { formatDate, formatNumber, galleryImages, primaryImage } from '@/lib/format';
import { extractHashtags } from '@/lib/rich-text';

export const revalidate = 900;

type NewsDetail = {
  category?: string | null;
  content?: string | null;
  published_at?: string;
  excerpt?: string | null;
  featured?: boolean;
  gallery?: string[] | null;
  id: number | string;
  image?: string | null;
  title?: string;
  title_ar?: string;
  views?: number;
};

async function getNews(id: string): Promise<NewsDetail | null> {
  const payload = await fetchJSON<NewsDetail | { data?: NewsDetail }>(`/news/${id}`, 900);
  return entity<NewsDetail>(payload);
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const news = await getNews(id);

  if (!news) {
    notFound();
  }

  const title = news.title_ar || news.title || 'تفاصيل الخبر';
  const cover = primaryImage(news.image, news.gallery);
  const tags = extractHashtags(news.content);
  const gallery = galleryImages(news.gallery);

  return (
    <div className="pt-navbar bg-gray-50 dark:bg-gray-950">
      <section className="overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.14),_transparent_28%),linear-gradient(135deg,#1A5F7A_0%,#159C4B_100%)] text-white">
        <div className="container-page py-12 md:py-16">
          <Link href="/media/news" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white">
            <FaArrowLeft />
            العودة إلى الأخبار
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="mb-5 flex flex-wrap gap-3">
                {news.featured ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                    <FaStar className="text-yellow-300" />
                    خبر مميز
                  </span>
                ) : null}
                {news.category ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                    <FaFolder />
                    {news.category}
                  </span>
                ) : null}
              </div>

              <h1 className="max-w-4xl text-3xl font-bold leading-tight md:text-5xl">{title}</h1>

              <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/80">
                <span className="inline-flex items-center gap-2 rounded-full bg-black/15 px-4 py-2 backdrop-blur">
                  <FaCalendar />
                  {formatDate(news.published_at)}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-black/15 px-4 py-2 backdrop-blur">
                  <FaEye />
                  {formatNumber(news.views)} مشاهدة
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-black/15 px-4 py-2 backdrop-blur">
                  <FaImages />
                  {gallery.length} صور إضافية
                </span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
              <div className="relative aspect-[4/3]">
                <Image src={cover} alt={title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
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
                  <FaPenNib className="text-lg" />
                </span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">نص الخبر</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">تنسيق تلقائي للروابط والوسوم والفقرات الطويلة</p>
                </div>
              </div>
              <RichContent content={news.content || ''} />
            </div>

            <MediaGallery images={gallery} title={title} />
          </article>

          <aside className="space-y-6 xl:sticky xl:top-28 xl:self-start">
            {tags.length > 0 ? (
              <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">الوسوم المستخرجة</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="inline-flex rounded-full bg-primary-50 px-3 py-1.5 text-sm font-semibold text-primary-700 ring-1 ring-primary-100 dark:bg-primary-900/20 dark:text-primary-300 dark:ring-primary-800/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">ملخص سريع</h3>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <p className="flex items-center justify-between gap-4 rounded-2xl bg-gray-50 px-4 py-3 dark:bg-gray-800/70">
                  <span>تاريخ النشر</span>
                  <strong className="text-gray-900 dark:text-white">{formatDate(news.published_at)}</strong>
                </p>
                <p className="flex items-center justify-between gap-4 rounded-2xl bg-gray-50 px-4 py-3 dark:bg-gray-800/70">
                  <span>عدد الصور</span>
                  <strong className="text-gray-900 dark:text-white">{gallery.length}</strong>
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}