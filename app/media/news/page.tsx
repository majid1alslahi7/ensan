import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaCalendar, FaImages, FaNewspaper, FaStar } from 'react-icons/fa6';

import { fetchJSON, collection } from '@/lib/api/server';
import { excerpt, formatDate, primaryImage } from '@/lib/format';

export const revalidate = 900;

type NewsItem = {
  content?: string;
  created_at?: string;
  excerpt?: string;
  featured?: boolean;
  gallery?: string[] | null;
  id: number | string;
  image?: string | null;
  title?: string;
  title_ar?: string;
  updated_at?: string;
  views?: number;
};

async function getNews(): Promise<NewsItem[]> {
  const payload = await fetchJSON<NewsItem[] | { data?: NewsItem[] }>('/news', 900);
  return collection<NewsItem>(payload);
}

export default async function NewsPage() {
  const news = await getNews();
  const featured = news.find((item) => item.featured) ?? news[0];
  const remaining = featured ? news.filter((item) => item.id !== featured.id) : [];

  return (
    <div className="pt-navbar">
      <section className="section-py overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.16),_transparent_32%),linear-gradient(135deg,#1A5F7A_0%,#159C4B_100%)] text-white">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white/90 ring-1 ring-white/20">
              <FaNewspaper />
              المركز الإعلامي
            </p>
            <h1 className="text-4xl font-bold md:text-5xl">آخر الأخبار والبيانات الميدانية</h1>
            <p className="mt-4 text-lg leading-8 text-white/85">
              تغطية مستمرة لأنشطة المؤسسة، مع صور رئيسية واضحة وروابط مباشرة لقراءة التفاصيل ومعرض الصور.
            </p>
          </div>
        </div>
      </section>

      <section className="section-py bg-gray-50 dark:bg-gray-950">
        <div className="container-page space-y-10">
          {featured ? (
            <article className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900">
              <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="relative min-h-[320px]">
                  <Image
                    src={primaryImage(featured.image, featured.gallery)}
                    alt={featured.title_ar || featured.title || 'خبر'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                  <div className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur">
                    <FaStar className="text-yellow-300" />
                    خبر مميز
                  </div>
                </div>

                <div className="flex flex-col justify-center p-8 md:p-10">
                  <div className="mb-4 flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
                      <FaCalendar className="text-primary-500" />
                      {formatDate(featured.updated_at || featured.created_at)}
                    </span>
                    {!!featured.gallery?.length && (
                      <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
                        <FaImages className="text-primary-500" />
                        {featured.gallery.length} صور
                      </span>
                    )}
                  </div>

                  <h2 className="mb-4 text-3xl font-bold leading-tight text-gray-900 dark:text-white">
                    <Link href={`/media/news/${featured.id}`} className="hover:text-primary-500">
                      {featured.title_ar || featured.title}
                    </Link>
                  </h2>
                  <p className="mb-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                    {excerpt(featured.excerpt || featured.content, 260)}
                  </p>

                  <Link
                    href={`/media/news/${featured.id}`}
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-3 font-semibold text-white transition hover:gap-3"
                  >
                    اقرأ التفاصيل
                    <FaArrowLeft className="text-sm" />
                  </Link>
                </div>
              </div>
            </article>
          ) : null}

          {remaining.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {remaining.map((item) => (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
                >
                  <Link href={`/media/news/${item.id}`} className="block">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={primaryImage(item.image, item.gallery)}
                        alt={item.title_ar || item.title || 'خبر'}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      {!!item.gallery?.length && (
                        <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                          <FaImages />
                          {item.gallery.length} صور
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-6">
                    <div className="mb-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <FaCalendar className="text-primary-500" />
                      <span>{formatDate(item.updated_at || item.created_at)}</span>
                    </div>

                    <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                      <Link href={`/media/news/${item.id}`} className="hover:text-primary-500">
                        {item.title_ar || item.title}
                      </Link>
                    </h2>

                    <p className="mb-5 line-clamp-4 text-gray-600 dark:text-gray-300">
                      {excerpt(item.excerpt || item.content, 165)}
                    </p>

                    <Link
                      href={`/media/news/${item.id}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition hover:gap-3 dark:text-primary-300"
                    >
                      اقرأ المزيد
                      <FaArrowLeft className="text-xs" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : null}

          {news.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">
              <FaNewspaper className="mx-auto mb-4 text-5xl text-primary-400/60" />
              <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">لا توجد أخبار متاحة حالياً</h2>
              <p className="text-gray-500 dark:text-gray-400">
                سيتم نشر آخر الأخبار والتحديثات هنا فور إضافتها من النظام.
              </p>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
