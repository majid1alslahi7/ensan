'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaExpand, FaImages, FaXmark } from 'react-icons/fa6';

import { imageUrl } from '@/lib/format';

type MediaGalleryProps = {
  images: string[];
  title: string;
};

export default function MediaGallery({ images, title }: MediaGalleryProps) {
  const gallery = images.filter(Boolean);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) {
      return undefined;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null);
      }

      if (event.key === 'ArrowRight') {
        setActiveIndex((current) => (current === null ? 0 : (current + 1) % gallery.length));
      }

      if (event.key === 'ArrowLeft') {
        setActiveIndex((current) => (current === null ? 0 : (current - 1 + gallery.length) % gallery.length));
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, gallery.length]);

  if (gallery.length === 0) {
    return null;
  }

  const previous = () => {
    setActiveIndex((current) => (current === null ? 0 : (current - 1 + gallery.length) % gallery.length));
  };

  const next = () => {
    setActiveIndex((current) => (current === null ? 0 : (current + 1) % gallery.length));
  };

  return (
    <>
      <section className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-700 dark:bg-primary-900/20 dark:text-primary-300">
              <FaImages />
              معرض الصور
            </p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">صور إضافية من {title}</h2>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{gallery.length} صورة</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {gallery.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`group relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 text-right shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <div className={`relative ${index === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
                <Image
                  src={imageUrl(src)}
                  alt={`${title} ${index + 1}`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes={index === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 1280px) 50vw, 33vw'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 text-white opacity-0 transition group-hover:opacity-100">
                  <span className="text-sm font-semibold">عرض الصورة</span>
                  <FaExpand className="text-lg" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {activeIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/90 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="mx-auto flex h-full max-w-7xl flex-col">
            <div className="mb-4 flex items-center justify-between text-white">
              <div>
                <p className="text-sm text-white/70">معرض {title}</p>
                <h3 className="text-lg font-semibold">
                  الصورة {activeIndex + 1} من {gallery.length}
                </h3>
              </div>
              <button type="button" onClick={() => setActiveIndex(null)} className="rounded-full bg-white/10 p-3 hover:bg-white/20">
                <FaXmark className="text-xl" />
              </button>
            </div>

            <div className="relative flex-1 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
              <Image
                src={imageUrl(gallery[activeIndex])}
                alt={`${title} ${activeIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />

              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={previous}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-4 text-white hover:bg-black/65"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-4 text-white hover:bg-black/65"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}
            </div>

            {gallery.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {gallery.map((src, index) => (
                  <button
                    key={`${src}-thumb-${index}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`relative h-20 w-24 shrink-0 overflow-hidden rounded-xl border transition ${
                      index === activeIndex
                        ? 'border-white shadow-lg'
                        : 'border-white/15 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={imageUrl(src)} alt={`${title} ${index + 1}`} fill className="object-cover" sizes="96px" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
