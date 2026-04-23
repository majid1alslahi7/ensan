import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://insaaan.org'
  
  // الصفحات الثابتة مع أولويات وتكرار التحديث
  const staticPages = [
    // الصفحات الرئيسية - أولوية عالية
    { url: '/', priority: 1.0, changeFrequency: 'daily' as const },
    { url: '/about', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/programs', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/projects', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/statistics', priority: 0.8, changeFrequency: 'daily' as const },
    { url: '/contact', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/contact/contribute', priority: 0.9, changeFrequency: 'monthly' as const },
    
    // الإعلام - تحديث متكرر
    { url: '/media', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/media/news', priority: 0.9, changeFrequency: 'daily' as const },
    { url: '/media/success-stories', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/media/gallery', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/media/videos', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/media/infographics', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/media/jobs', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/media/tenders', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/media/daily-work', priority: 0.7, changeFrequency: 'weekly' as const },
    
    // التقارير
    { url: '/reports', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/reports/annual', priority: 0.7, changeFrequency: 'yearly' as const },
    { url: '/reports/policies', priority: 0.7, changeFrequency: 'yearly' as const },
    
    // من نحن
    { url: '/about/structure', priority: 0.6, changeFrequency: 'yearly' as const },
    { url: '/about/locations', priority: 0.6, changeFrequency: 'yearly' as const },
    
    // التواصل
    { url: '/contact/complaints', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/contact/call', priority: 0.8, changeFrequency: 'monthly' as const },
    
    // أخرى
    { url: '/announcements', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/volunteers', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/aboutdeveloper', priority: 0.5, changeFrequency: 'yearly' as const },
  ]

  const sitemapEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

  // جلب الصفحات الديناميكية (الأخبار، المشاريع، إلخ)
  try {
    const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL
    const API_URL = (
      process.env.NODE_ENV === 'production' &&
      configuredApiUrl &&
      /^(http:\/\/)?(127\.0\.0\.1|localhost)(:\d+)?\//.test(configuredApiUrl)
        ? 'https://system.insaaan.org/api/v1'
        : configuredApiUrl || 'https://system.insaaan.org/api/v1'
    )
    
    // جلب الأخبار
    const newsRes = await fetch(`${API_URL}/news`, { next: { revalidate: 3600 } })
    if (newsRes.ok) {
      const news = await newsRes.json()
      const newsItems = news.data || news
      if (Array.isArray(newsItems)) {
        newsItems.forEach((item: any) => {
          sitemapEntries.push({
            url: `${baseUrl}/media/news/${item.id}`,
            lastModified: new Date(item.updated_at || Date.now()),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
          })
        })
      }
    }

    // جلب المشاريع
    const projectsRes = await fetch(`${API_URL}/projects`, { next: { revalidate: 3600 } })
    if (projectsRes.ok) {
      const projects = await projectsRes.json()
      const projectItems = projects.data || projects
      if (Array.isArray(projectItems)) {
        projectItems.forEach((item: any) => {
          sitemapEntries.push({
            url: `${baseUrl}/projects/${item.id}`,
            lastModified: new Date(item.updated_at || Date.now()),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
          })
        })
      }
    }

    // جلب البرامج
    const programsRes = await fetch(`${API_URL}/programs`, { next: { revalidate: 86400 } })
    if (programsRes.ok) {
      const programs = await programsRes.json()
      if (Array.isArray(programs)) {
        programs.forEach((item: any) => {
          sitemapEntries.push({
            url: `${baseUrl}/programs/${item.id}`,
            lastModified: new Date(item.updated_at || Date.now()),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
          })
        })
      }
    }

    // جلب قصص النجاح
    const storiesRes = await fetch(`${API_URL}/success-stories`, { next: { revalidate: 3600 } })
    if (storiesRes.ok) {
      const stories = await storiesRes.json()
      const storyItems = stories.data || stories
      if (Array.isArray(storyItems)) {
        storyItems.forEach((item: any) => {
          sitemapEntries.push({
            url: `${baseUrl}/media/success-stories/${item.id}`,
            lastModified: new Date(item.updated_at || Date.now()),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
          })
        })
      }
    }

    // جلب الوظائف
    const jobsRes = await fetch(`${API_URL}/careers`, { next: { revalidate: 3600 } })
    if (jobsRes.ok) {
      const jobs = await jobsRes.json()
      const jobItems = jobs.data || jobs
      if (Array.isArray(jobItems)) {
        jobItems.forEach((item: any) => {
          sitemapEntries.push({
            url: `${baseUrl}/media/jobs/${item.id}`,
            lastModified: new Date(item.updated_at || Date.now()),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
          })
        })
      }
    }

    // جلب المناقصات
    const tendersRes = await fetch(`${API_URL}/tenders`, { next: { revalidate: 3600 } })
    if (tendersRes.ok) {
      const tenders = await tendersRes.json()
      const tenderItems = tenders.data || tenders
      if (Array.isArray(tenderItems)) {
        tenderItems.forEach((item: any) => {
          sitemapEntries.push({
            url: `${baseUrl}/media/tenders/${item.id}`,
            lastModified: new Date(item.updated_at || Date.now()),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
          })
        })
      }
    }
  } catch (error) {
    console.error('Error fetching dynamic routes for sitemap:', error)
  }

  return sitemapEntries
}
