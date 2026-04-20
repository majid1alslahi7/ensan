const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

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

// ========== الأخبار ==========
export const newsAPI = {
  getAll: () => fetchAPI('/news'),
  getFeatured: () => fetchAPI('/featured-news'),
  getOne: (id: number) => fetchAPI(`/news/${id}`),
};

// ========== البرامج ==========
export const programsAPI = {
  getAll: () => fetchAPI('/programs'),
  getOne: (id: number) => fetchAPI(`/programs/${id}`),
};

// ========== المشاريع ==========
export const projectsAPI = {
  getAll: () => fetchAPI('/projects'),
  getOne: (id: number) => fetchAPI(`/projects/${id}`),
  getLatest: () => fetchAPI('/latest-projects'),
};

// ========== الإحصائيات ==========
export const statsAPI = {
  getAll: () => fetchAPI('/stats'),
  getHomeStats: () => fetchAPI('/home-stats'),
};

// ========== قصص النجاح ==========
export const successStoriesAPI = {
  getAll: () => fetchAPI('/success-stories'),
  getOne: (id: number) => fetchAPI(`/success-stories/${id}`),
};

// ========== التقارير ==========
export const reportsAPI = {
  getAll: () => fetchAPI('/reports'),
  getOne: (id: number) => fetchAPI(`/reports/${id}`),
};

// ========== الوظائف ==========
export const careersAPI = {
  getAll: () => fetchAPI('/careers'),
  getOne: (id: number) => fetchAPI(`/careers/${id}`),
};

// ========== المناقصات ==========
export const tendersAPI = {
  getAll: () => fetchAPI('/tenders'),
  getOne: (id: number) => fetchAPI(`/tenders/${id}`),
};

// ========== معرض الصور ==========
export const galleryAPI = {
  getAll: () => fetchAPI('/gallery'),
  getOne: (id: number) => fetchAPI(`/gallery/${id}`),
};

// ========== الفيديوهات ==========
export const videosAPI = {
  getAll: () => fetchAPI('/videos'),
  getOne: (id: number) => fetchAPI(`/videos/${id}`),
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
