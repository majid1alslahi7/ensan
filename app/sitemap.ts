import type { MetadataRoute } from 'next'

type SitemapEntity = {
  id: number | string
  updated_at?: string
  published_at?: string
}

// عنوان API الأساسي - يعمل في standalone و development
const getApiUrl = (): string => {
  const configuredUrl = process.env.NEXT_PUBLIC_API_URL
  if (configuredUrl && !configuredUrl.includes('localhost') && !configuredUrl.includes('127.0.0.1')) {
    return configuredUrl
  }
  // القيمة الافتراضية للإنتاج - تأكد من أن هذا هو عنوان API الصحيح
  return 'https://system.insaaan.org/api/v1'
}

// دالة مساعدة لجلب البيانات مع مهلة زمنية ومعالجة أخطاء قوية
async function fetchWithTimeout<T>(url: string, timeout = 8000): Promise<T | null> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 3600 }, // إعادة التوليد كل ساعة في standalone
      headers: { 'Cache-Control': 'no-cache' }
    })
    clearTimeout(timeoutId)
    if (!response.ok) return null
    const data = (await response.json()) as { data?: T } | T
    // التعامل مع API التي تعيد البيانات داخل { data: [...] }
    return (data.data || data) as T
  } catch (error) {
    clearTimeout(timeoutId)
    console.error(`Fetch error for ${url}:`, error)
    return null
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://insaaan.org'
  const apiUrl = getApiUrl()

  // الصفحات الثابتة
  const staticPages = [
    { url: '/', priority: 1.0, changeFrequency: 'daily' as const },
    { url: '/about', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/programs', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/projects', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/statistics', priority: 0.8, changeFrequency: 'daily' as const },
    { url: '/contact', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/contact/contribute', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/media', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/media/news', priority: 0.9, changeFrequency: 'daily' as const },
    { url: '/media/success-stories', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/media/gallery', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/media/videos', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/media/infographics', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/media/jobs', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/media/tenders', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/media/daily-work', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/reports', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/reports/annual', priority: 0.7, changeFrequency: 'yearly' as const },
    { url: '/reports/policies', priority: 0.7, changeFrequency: 'yearly' as const },
    { url: '/about/structure', priority: 0.6, changeFrequency: 'yearly' as const },
    { url: '/about/locations', priority: 0.6, changeFrequency: 'yearly' as const },
    { url: '/contact/complaints', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/contact/call', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/announcements', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/volunteers', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/aboutdeveloper', priority: 0.5, changeFrequency: 'yearly' as const },
  ]

  const entries: MetadataRoute.Sitemap = staticPages.map(page => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

  // تعريف endpoints الديناميكية
  const dynamicEndpoints = [
    { path: 'news', urlPrefix: '/media/news', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: 'projects', urlPrefix: '/projects', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: 'programs', urlPrefix: '/programs', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: 'success-stories', urlPrefix: '/media/success-stories', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: 'careers', urlPrefix: '/media/jobs', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: 'tenders', urlPrefix: '/media/tenders', priority: 0.8, changeFrequency: 'weekly' as const },
  ]

  // جلب البيانات لكل endpoint مع حماية من الفشل
  for (const endpoint of dynamicEndpoints) {
    const url = `${apiUrl}/${endpoint.path}`
    const items = await fetchWithTimeout<SitemapEntity[]>(url, 10000)
    if (items && Array.isArray(items)) {
      for (const item of items) {
        if (item.id) {
          entries.push({
            url: `${baseUrl}${endpoint.urlPrefix}/${item.id}`,
            lastModified: new Date(item.updated_at || item.published_at || Date.now()),
            changeFrequency: endpoint.changeFrequency,
            priority: endpoint.priority,
          })
        }
      }
    }
  }

  return entries
}
