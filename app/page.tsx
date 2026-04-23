import HomePageClient from '@/components/home/HomePageClient';
import { API_URL } from '@/lib/api';

export const revalidate = 1800;

type CollectionPayload<T> = {
  data?: T[] | { data?: T[] };
};

function collection<T>(payload: T[] | CollectionPayload<T> | null): T[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  return [];
}

async function fetchJSON(endpoint: string, revalidateTime: number) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      next: { revalidate: revalidateTime },
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const [newsPayload, programsPayload, statsPayload, galleryPayload] = await Promise.all([
    fetchJSON('/featured-news', 900),
    fetchJSON('/programs', 1800),
    fetchJSON('/home-stats', 1800),
    fetchJSON('/gallery', 900),
  ]);

  return (
    <HomePageClient
      gallery={collection(galleryPayload)}
      news={collection(newsPayload)}
      programs={collection(programsPayload)}
      stats={collection(statsPayload)}
    />
  );
}
