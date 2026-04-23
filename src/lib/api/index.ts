const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL;
const productionApiUrl = 'https://system.insaaan.org/api/v1';
const shouldUseProductionApi =
  process.env.NODE_ENV === 'production' &&
  configuredApiUrl !== undefined &&
  /^(http:\/\/)?(127\.0\.0\.1|localhost)(:\d+)?\//.test(configuredApiUrl);

export const API_URL = (shouldUseProductionApi ? productionApiUrl : configuredApiUrl || productionApiUrl).replace(/\/$/, '');
type QueryParams = Record<string, string | number | boolean | null | undefined>;

function queryString(params?: QueryParams): string {
  if (!params) {
    return '';
  }

  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      search.set(key, String(value));
    }
  });

  const value = search.toString();

  return value ? `?${value}` : '';
}

async function fetchAPI(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
}

function collection<T = any>(payload: any): T[] {
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

function entity<T = any>(payload: any, key?: string): T | null {
  if (!payload) {
    return null;
  }

  if (key && payload[key]) {
    return payload[key];
  }

  if (payload.data && !Array.isArray(payload.data)) {
    return payload.data;
  }

  return payload;
}

function data<T = any>(payload: any): T {
  return payload?.data ?? payload;
}

// ========== الأخبار ==========
export const newsAPI = {
  getAll: async () => collection(await fetchAPI('/news')),
  getFeatured: async () => collection(await fetchAPI('/featured-news')),
  getOne: async (id: number) => entity(await fetchAPI(`/news/${id}`)),
};

// ========== البرامج ==========
export const programsAPI = {
  getAll: async () => collection(await fetchAPI('/programs')),
  getOne: async (id: number) => entity(await fetchAPI(`/programs/${id}`), 'program'),
};

// ========== المشاريع ==========
export const projectsAPI = {
  getAll: async (params?: QueryParams) => collection(await fetchAPI(`/projects${queryString(params)}`)),
  getOne: async (id: number) => entity(await fetchAPI(`/projects/${id}`), 'project'),
  getLatest: async () => collection(await fetchAPI('/latest-projects')),
};

// ========== الإحصائيات ==========
export const statsAPI = {
  getAll: async () => collection(await fetchAPI('/stats')),
  getHomeStats: async () => collection(await fetchAPI('/home-stats')),
  getSummary: async () => data(await fetchAPI('/statistics/summary')),
};

// ========== قصص النجاح ==========
export const successStoriesAPI = {
  getAll: async () => collection(await fetchAPI('/success-stories')),
  getOne: async (id: number) => entity(await fetchAPI(`/success-stories/${id}`), 'story'),
};

// ========== التقارير ==========
export const reportsAPI = {
  getAll: async () => collection(await fetchAPI('/reports')),
  getOne: async (id: number) => entity(await fetchAPI(`/reports/${id}`)),
};

// ========== الوظائف ==========
export const careersAPI = {
  getAll: async () => collection(await fetchAPI('/careers')),
  getOne: async (id: number) => entity(await fetchAPI(`/careers/${id}`)),
};

// ========== المناقصات ==========
export const tendersAPI = {
  getAll: async () => collection(await fetchAPI('/tenders')),
  getOne: async (id: number) => entity(await fetchAPI(`/tenders/${id}`)),
};

// ========== معرض الصور ==========
export const galleryAPI = {
  getAll: async () => collection(await fetchAPI('/gallery')),
  getOne: async (id: number) => entity(await fetchAPI(`/gallery/${id}`)),
};

// ========== الفيديوهات ==========
export const videosAPI = {
  getAll: async () => collection(await fetchAPI('/videos')),
  getOne: async (id: number) => entity(await fetchAPI(`/videos/${id}`)),
};

// ========== المتطوعين ==========
export const volunteersAPI = {
  create: (data: any) => fetchAPI('/volunteers', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// ========== المشتركين ==========
export const subscribersAPI = {
  create: (data: any) => fetchAPI('/subscribers', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// ========== الشكاوى ==========
export const complaintsAPI = {
  create: (data: any) => fetchAPI('/complaints', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// ========== التبرعات ==========
export const donationsAPI = {
  create: (data: any) => fetchAPI('/donations', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};
