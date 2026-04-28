import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaImages, FaMapPin, FaQuoteRight, FaStar, FaUser } from 'react-icons/fa6';

import { collection, fetchJSON } from '@/lib/api/server';
import { excerpt, primaryImage } from '@/lib/format';

export const revalidate = 900;

type StoryProgram = {
  id?: number | string;
  name?: string;
  name_ar?: string;
};

type StoryItem = {
  content?: string | null;
  published_at?: string;
  featured?: boolean;
  gallery?: string[] | null;
  id: number | string;
  image?: string | null;
  location?: string | null;
  person_name?: string | null;
  program?: StoryProgram | null;
  title?: string;
  title_ar?: string;
};

async function getStories(): Promise<StoryItem[]> {
  const payload = await fetchJSON<StoryItem[] | { data?: StoryItem[] }>('/success-stories', 900);
  return collection<StoryItem>(payload);
}

export default async function SuccessStoriesPage() {
  const stories = await getStories();
  const featured = stories.find((story) => story.featured) ?? stories[0];
  const remaining = featured ? stories.filter((story) => story.id !== featured.id) : [];

  return (
    <div className="pt-navbar">
      <section className="section-py overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.16),_transparent_32%),linear-gradient(135deg,#D4621A_0%,#159C4B_100%)] text-white">
        <div className="container-page text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white/90 ring-1 ring-white/20">
            <FaQuoteRight />
            قصص ملهمة
          </p>
          <h1 className="section-title text-white">قصص النجاح</h1>
          <p className="section-subtitle text-white/90">حكايات حقيقية من الميدان، مع صور رئيسية واضحة وصفحات تفاصيل غنية بالصور.</p>
        </div>
      </section>

      <section className="section-py bg-gray-50 dark:bg-gray-950">
        <div className="container-page space-y-10">
          {featured ? (
            <article className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900">
              <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="relative min-h-[320px]">
                  <Image
                    src={primaryImage(featured.image, featured.gallery)}
                    alt={featured.title_ar || featured.title || 'قصة نجاح'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 52vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur">
                    <FaStar className="text-yellow-300" />
                    قصة مميزة
                  </div>
                </div>

                <div className="flex flex-col justify-center p-8 md:p-10">
                  <h2 className="mb-4 text-3xl font-bold leading-tight text-gray-900 dark:text-white">
                    <Link href={`/media/success-stories/${featured.id}`} className="hover:text-primary-500">
                      {featured.title_ar || featured.title}
                    </Link>
                  </h2>
                  <p className="mb-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                    {excerpt(featured.content, 260)}
                  </p>

                  <div className="mb-6 flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
                      <FaUser className="text-primary-500" />
                      {featured.person_name || 'مستفيد'}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
                      <FaMapPin className="text-primary-500" />
                      {featured.location || 'غير محدد'}
                    </span>
                    {!!featured.gallery?.length && (
                      <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
                        <FaImages className="text-primary-500" />
                        {featured.gallery.length} صور
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/media/success-stories/${featured.id}`}
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-3 font-semibold text-white transition hover:gap-3"
                  >
                    اقرأ القصة كاملة
                    <FaArrowLeft className="text-sm" />
                  </Link>
                </div>
              </div>
            </article>
          ) : null}

          {remaining.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {remaining.map((story) => (
                <article
                  key={story.id}
                  className="group overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
                >
                  <Link href={`/media/success-stories/${story.id}`} className="block">
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={primaryImage(story.image, story.gallery)}
                        alt={story.title_ar || story.title || 'قصة نجاح'}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                  </Link>

                  <div className="p-6">
                    <div className="mb-4 flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
                        <FaUser className="text-primary-500" />
                        {story.person_name || 'مستفيد'}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
                        <FaMapPin className="text-primary-500" />
                        {story.location || 'غير محدد'}
                      </span>
                    </div>

                    <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                      <Link href={`/media/success-stories/${story.id}`} className="hover:text-primary-500">
                        {story.title_ar || story.title}
                      </Link>
                    </h2>

                    <p className="mb-5 line-clamp-4 text-gray-600 dark:text-gray-300">
                      {excerpt(story.content, 160)}
                    </p>

                    <Link
                      href={`/media/success-stories/${story.id}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition hover:gap-3 dark:text-primary-300"
                    >
                      عرض القصة
                      <FaArrowLeft className="text-xs" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : null}

          {stories.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">
              <FaQuoteRight className="mx-auto mb-4 text-5xl text-primary-400/60" />
              <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">لا توجد قصص نجاح حالياً</h2>
              <p className="text-gray-500 dark:text-gray-400">سيتم عرض قصص النجاح فور إضافتها من النظام.</p>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
