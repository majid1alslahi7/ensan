import Image from 'next/image';

import { imageUrl } from '@/lib/format';
import { blockImageUrls, splitContentBlocks } from '@/lib/rich-text';

const TOKEN_REGEX = /(https?:\/\/[^\s<]+|#[\p{L}\p{N}_-]+)/gu;

function trimTrailingPunctuation(value: string): { clean: string; trailing: string } {
  const match = value.match(/[).,!?،؛:]+$/u);

  if (!match) {
    return { clean: value, trailing: '' };
  }

  return {
    clean: value.slice(0, -match[0].length),
    trailing: match[0],
  };
}

function renderInline(text: string) {
  const parts = text.split(TOKEN_REGEX);

  return parts.map((part, index) => {
    if (!part) {
      return null;
    }

    if (part.startsWith('#')) {
      return (
        <span
          key={`${part}-${index}`}
          className="mx-1 inline-flex rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700 ring-1 ring-primary-100 dark:bg-primary-900/20 dark:text-primary-300 dark:ring-primary-800/60"
        >
          {part}
        </span>
      );
    }

    if (part.startsWith('http://') || part.startsWith('https://')) {
      const { clean, trailing } = trimTrailingPunctuation(part);

      return (
        <span key={`${clean}-${index}`}>
          <a
            href={clean}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-primary-600 underline decoration-primary-300 underline-offset-4 hover:text-primary-700 dark:text-primary-300 dark:decoration-primary-700"
          >
            {clean}
          </a>
          {trailing}
        </span>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

type RichContentProps = {
  content: string;
};

export default function RichContent({ content }: RichContentProps) {
  const blocks = splitContentBlocks(content);

  return (
    <div className="space-y-6 text-base leading-8 text-gray-700 dark:text-gray-200 md:text-lg">
      {blocks.map((block, index) => {
        const imageUrls = blockImageUrls(block);

        if (imageUrls.length > 0) {
          return (
            <div key={`images-${index}`} className="grid gap-4 sm:grid-cols-2">
              {imageUrls.map((url, imageIndex) => (
                <div key={`${url}-${imageIndex}`} className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={imageUrl(url)}
                      alt={`صورة مرفقة ${imageIndex + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          );
        }

        return (
          <p key={`paragraph-${index}`} className="whitespace-pre-line">
            {renderInline(block)}
          </p>
        );
      })}
    </div>
  );
}
