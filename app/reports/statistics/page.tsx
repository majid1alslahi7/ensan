'use client';

import { useEffect, useMemo, useState } from 'react';
import type { IconType } from 'react-icons';
import { motion } from 'motion/react';
import Link from 'next/link';
import {
  FaArrowLeft,
  FaBriefcase,
  FaBullhorn,
  FaChartLine,
  FaEnvelope,
  FaEye,
  FaFolderOpen,
  FaGlobe,
  FaHandHoldingHeart,
  FaHeart,
  FaNewspaper,
  FaPeopleGroup,
  FaStar,
  FaUsers,
} from 'react-icons/fa6';

import { statsAPI } from '@/lib/api';
import { formatDate, formatNumber } from '@/lib/format';

type NewsItem = {
  id: number | string;
  title_ar?: string;
  created_at?: string;
};

type Summary = {
  counts: {
    news: number;
    programs: number;
    projects: number;
    success_stories: number;
    volunteers: number;
    subscribers: number;
    open_tenders: number;
    open_careers: number;
  };
  totals: {
    beneficiaries: number;
    families: number;
    donations_amount: number;
    news_views: number;
    video_views: number;
  };
  recent_activity: {
    latest_news: NewsItem[];
    latest_volunteers: unknown[];
    latest_donations: unknown[];
  };
};

type HomeStat = {
  key?: string;
  label_ar?: string;
  value?: number;
  icon?: string;
  color?: string;
};

const fallbackSummary: Summary = {
  counts: {
    news: 0,
    programs: 0,
    projects: 0,
    success_stories: 0,
    volunteers: 0,
    subscribers: 0,
    open_tenders: 0,
    open_careers: 0,
  },
  totals: {
    beneficiaries: 0,
    families: 0,
    donations_amount: 0,
    news_views: 0,
    video_views: 0,
  },
  recent_activity: {
    latest_news: [],
    latest_volunteers: [],
    latest_donations: [],
  },
};

const iconMap: Record<string, IconType> = {
  FaFolderOpen,
  FaGlobe,
  FaUsers,
  FaHeart,
};

export default function StatisticsPage() {
  const [summary, setSummary] = useState<Summary>(fallbackSummary);
  const [homeStats, setHomeStats] = useState<HomeStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatistics() {
      try {
        const [summaryData, homeStatsData] = await Promise.all([
          statsAPI.getSummary() as Promise<Partial<Summary>>,
          statsAPI.getHomeStats() as Promise<HomeStat[]>,
        ]);

        setSummary({
          counts: {
            ...fallbackSummary.counts,
            ...(summaryData.counts || {}),
          },
          totals: {
            ...fallbackSummary.totals,
            ...(summaryData.totals || {}),
          },
          recent_activity: {
            ...fallbackSummary.recent_activity,
            ...(summaryData.recent_activity || {}),
          },
        });

        setHomeStats(Array.isArray(homeStatsData) ? homeStatsData : []);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStatistics();
  }, []);

  const mainStats = useMemo(() => {
    const { counts, totals } = summary;

    return [
      {
        label: 'المشاريع',
        value: counts.projects,
        icon: FaFolderOpen,
        color: '#1A5F7A',
        detail: 'مشروع ومبادرة',
      },
      {
        label: 'المستفيدون',
        value: totals.beneficiaries,
        icon: FaPeopleGroup,
        color: '#159C4B',
        detail: 'إجمالي الأفراد',
      },
      {
        label: 'الأسر',
        value: totals.families,
        icon: FaUsers,
        color: '#D4621A',
        detail: 'أسرة مستفيدة',
      },
      {
        label: 'المتطوعون',
        value: counts.volunteers,
        icon: FaHandHoldingHeart,
        color: '#8B5CF6',
        detail: 'طلب ومشاركة',
      },
    ];
  }, [summary]);

  const contentStats = useMemo(() => {
    const { counts, totals } = summary;

    return [
      {
        label: 'الأخبار',
        value: counts.news,
        icon: FaNewspaper,
        color: '#2563EB',
      },
      {
        label: 'قصص النجاح',
        value: counts.success_stories,
        icon: FaStar,
        color: '#F59E0B',
      },
      {
        label: 'مشاهدات الأخبار',
        value: totals.news_views,
        icon: FaEye,
        color: '#EF4444',
      },
      {
        label: 'مشاهدات الفيديو',
        value: totals.video_views,
        icon: FaChartLine,
        color: '#0EA5E9',
      },
    ];
  }, [summary]);

  const actionStats = useMemo(() => {
    const { counts } = summary;

    return [
      {
        label: 'مشتركون نشطون',
        value: counts.subscribers,
        icon: FaEnvelope,
        color: '#159C4B',
      },
      {
        label: 'مناقصات مفتوحة',
        value: counts.open_tenders,
        icon: FaBullhorn,
        color: '#D4621A',
      },
      {
        label: 'وظائف مفتوحة',
        value: counts.open_careers,
        icon: FaBriefcase,
        color: '#1A5F7A',
      },
    ];
  }, [summary]);

  const maxContentValue = Math.max(
    1,
    ...contentStats.map((item) => Number(item.value || 0))
  );

  if (loading) {
    return <div className="pt-navbar container-page section-py text-center">جاري تحميل الإحصائيات...</div>;
  }

  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white section-py">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm mb-5">
              <FaChartLine /> لوحة أثر مباشرة
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">الإحصائيات والأثر</h1>

            <p className="text-lg text-white/90 leading-relaxed">
              قراءة مركزة لأرقام البرامج والمشاريع والمستفيدين والمحتوى المنشور، محدثة من بيانات النظام.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-py bg-gray-50 dark:bg-gray-900">
        <div className="container-page">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {mainStats.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center justify-between gap-4 mb-5">
                  <span
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <item.icon className="text-2xl" style={{ color: item.color }} />
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{item.detail}</span>
                </div>

                <p className="text-4xl font-bold mb-2">{formatNumber(item.value)}</p>
                <h2 className="text-gray-600 dark:text-gray-300 font-semibold">{item.label}</h2>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py">
        <div className="container-page">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-6">مؤشرات المحتوى والتفاعل</h2>

              <div className="space-y-5">
                {contentStats.map((item) => {
                  const width = `${Math.max(
                    8,
                    (Number(item.value || 0) / maxContentValue) * 100
                  )}%`;

                  return (
                    <div key={item.label}>
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <div className="flex items-center gap-3">
                          <span
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${item.color}20` }}
                          >
                            <item.icon style={{ color: item.color }} />
                          </span>
                          <span className="font-semibold">{item.label}</span>
                        </div>

                        <span className="font-bold">{formatNumber(item.value)}</span>
                      </div>

                      <div className="h-3 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width, backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-6">مؤشرات نشطة</h2>

              <div className="space-y-4">
                {actionStats.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-xl bg-gray-50 dark:bg-gray-700/60 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${item.color}20` }}
                      >
                        <item.icon style={{ color: item.color }} />
                      </span>
                      <span className="font-semibold">{item.label}</span>
                    </div>

                    <span className="text-2xl font-bold">{formatNumber(item.value)}</span>
                  </div>
                ))}
              </div>

              <Link href="/contact/contribute" className="btn btn-primary w-full mt-6">
                ساهم معنا <FaArrowLeft />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-py bg-gray-50 dark:bg-gray-900">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-6">أرقام الصفحة الرئيسية</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {homeStats.map((stat) => {
                  const Icon = stat.icon ? iconMap[stat.icon] ?? FaChartLine : FaChartLine;
                  const statColor = stat.color || '#1A5F7A';

                  return (
                    <div
                      key={stat.key || stat.label_ar}
                      className="rounded-xl bg-gray-50 dark:bg-gray-700/60 p-4"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${statColor}20` }}
                        >
                          <Icon style={{ color: statColor }} />
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {stat.label_ar}
                        </span>
                      </div>

                      <p className="text-3xl font-bold">{formatNumber(stat.value)}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-6">آخر الأخبار في النظام</h2>

              <div className="space-y-3">
                {summary.recent_activity.latest_news.map((item) => (
                  <Link
                    key={item.id}
                    href={`/media/news/${item.id}`}
                    className="block rounded-xl bg-gray-50 dark:bg-gray-700/60 p-4 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                  >
                    <p className="font-semibold mb-1">{item.title_ar}</p>
                    <p className="text-sm text-gray-500">{formatDate(item.created_at)}</p>
                  </Link>
                ))}

                {summary.recent_activity.latest_news.length === 0 && (
                  <p className="text-gray-500">لا توجد أخبار حديثة حالياً.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}