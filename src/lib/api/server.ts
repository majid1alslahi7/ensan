import { API_URL } from '@/lib/api';

type CollectionPayload<T> = {
  data?: T[] | { data?: T[] };
};

export function collection<T>(payload: T[] | CollectionPayload<T> | null): T[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.data?.data)) {
    return payload.data.data;
  }

  return [];
}

export function entity<T>(payload: unknown, key?: string): T | null {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const record = payload as Record<string, unknown>;

  if (key && record[key] && typeof record[key] === 'object') {
    return record[key] as T;
  }

  if (record.data && !Array.isArray(record.data) && typeof record.data === 'object') {
    return record.data as T;
  }

  return record as T;
}

export async function fetchJSON<T>(endpoint: string, revalidateTime = 900): Promise<T | null> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      next: { revalidate: revalidateTime },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}
