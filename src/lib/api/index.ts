const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL;
const productionApiUrl = 'https://system.insaaan.org/api/v1';

const shouldUseProductionApi =
  process.env.NODE_ENV === 'production' &&
  configuredApiUrl !== undefined &&
  /^(http:\/\/)?(127\.0\.0\.1|localhost)(:\d+)?\//.test(configuredApiUrl);

export const API_URL = (
  shouldUseProductionApi ? productionApiUrl : configuredApiUrl || productionApiUrl
).replace(/\/$/, '');

type QueryParams = Record<string, string | number | boolean | null | undefined>;

type ApiResponse<T> =
  | T
  | {
      data?: T;
    };

type FormDataPayload = Record<string, unknown>;

function queryString(params?: QueryParams): string {
  if (!params) return '';

  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      search.set(key, String(value));
    }
  });

  const value = search.toString();

  return value ? `?${value}` : '';
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  const json = (await res.json()) as ApiResponse<T>;

  if (isRecord(json) && 'data' in json) {
    return json.data as T;
  }

  return json as T;
}

export function collection<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) {
    return payload as T[];
  }

  if (isRecord(payload)) {
    const firstData = payload.data;

    if (Array.isArray(firstData)) {
      return firstData as T[];
    }

    if (isRecord(firstData) && Array.isArray(firstData.data)) {
      return firstData.data as T[];
    }
  }

  return [];
}

export function entity<T>(payload: unknown, key?: string): T | null {
  if (!payload) return null;

  if (key && isRecord(payload) && key in payload) {
    return payload[key] as T;
  }

  if (isRecord(payload) && 'data' in payload) {
    const data = payload.data;

    if (!Array.isArray(data)) {
      return data as T;
    }
  }

  return payload as T;
}

// الأخبار
export const newsAPI = {
  getAll: async () => collection(await fetchAPI<unknown>('/news')),
  getFeatured: async () => collection(await fetchAPI<unknown>('/featured-news')),
  getOne: async (id: number) => entity(await fetchAPI<unknown>(`/news/${id}`)),
};

// البرامج
export const programsAPI = {
  getAll: async () => collection(await fetchAPI<unknown>('/programs')),
  getOne: async (id: number) => entity(await fetchAPI<unknown>(`/programs/${id}`)),
};

// المشاريع
export const projectsAPI = {
  getAll: async (params?: QueryParams) =>
    collection(await fetchAPI<unknown>(`/projects${queryString(params)}`)),
  getOne: async (id: number) =>
    entity(await fetchAPI<unknown>(`/projects/${id}`), 'project'),
  getLatest: async () => collection(await fetchAPI<unknown>('/latest-projects')),
};

// الإحصائيات
export const statsAPI = {
  getAll: async () => collection(await fetchAPI<unknown>('/stats')),
  getHomeStats: async () => collection(await fetchAPI<unknown>('/home-stats')),
  getSummary: async () => entity(await fetchAPI<unknown>('/statistics/summary')),
};

// قصص النجاح
export const successStoriesAPI = {
  getAll: async () => collection(await fetchAPI<unknown>('/success-stories')),
  getOne: async (id: number) =>
    entity(await fetchAPI<unknown>(`/success-stories/${id}`), 'story'),
};

// التقارير
export const reportsAPI = {
  getAll: async () => collection(await fetchAPI<unknown>('/reports')),
  getOne: async (id: number) => entity(await fetchAPI<unknown>(`/reports/${id}`)),
};

// الوظائف
export const careersAPI = {
  getAll: async () => collection(await fetchAPI<unknown>('/careers')),
  getOne: async (id: number) => entity(await fetchAPI<unknown>(`/careers/${id}`)),
};

// المناقصات
export const tendersAPI = {
  getAll: async () => collection(await fetchAPI<unknown>('/tenders')),
  getOne: async (id: number) => entity(await fetchAPI<unknown>(`/tenders/${id}`)),
};

// معرض الصور
export const galleryAPI = {
  getAll: async () => collection(await fetchAPI<unknown>('/gallery')),
  getOne: async (id: number) => entity(await fetchAPI<unknown>(`/gallery/${id}`)),
};

// الفيديوهات
export const videosAPI = {
  getAll: async () => collection(await fetchAPI<unknown>('/videos')),
  getOne: async (id: number) => entity(await fetchAPI<unknown>(`/videos/${id}`)),
};

// المتطوعين
export const volunteersAPI = {
  create: (data: FormDataPayload) =>
    fetchAPI('/volunteers', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// المشتركين
export const subscribersAPI = {
  create: (data: FormDataPayload) =>
    fetchAPI('/subscribers', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// الشكاوى
export const complaintsAPI = {
  create: (data: FormDataPayload) =>
    fetchAPI('/complaints', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// التبرعات
export const donationsAPI = {
  create: (data: FormDataPayload) =>
    fetchAPI('/donations', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};