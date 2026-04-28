'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import {
  FaChartPie,
  FaFilePdf,
  FaBook,
  FaDownload,
  FaFile,
  FaFileWord,
  FaFileExcel,
  FaFileZipper,
  FaImage,
  FaFileLines,
} from 'react-icons/fa6';

import { reportsAPI, API_URL } from '@/lib/api';
import { formatNumber } from '@/lib/format';

// ================= TYPES =================

type Report = {
  id: number | string;
  title_ar?: string;
  description?: string;
  file_url?: string;
  file_size?: string;
  year?: number;
  downloads?: number;
};

// ================= FILE ICON =================

function getFileIcon(fileUrl?: string) {
  if (!fileUrl) {
    return { icon: FaFile, color: '#6B7280', bg: '#F3F4F6', type: 'ملف' };
  }

  const ext = fileUrl.split('.').pop()?.toLowerCase();

  switch (ext) {
    case 'pdf':
      return { icon: FaFilePdf, color: '#EF4444', bg: '#FEE2E2', type: 'PDF' };

    case 'doc':
    case 'docx':
      return { icon: FaFileWord, color: '#2563EB', bg: '#DBEAFE', type: 'Word' };

    case 'xls':
    case 'xlsx':
      return { icon: FaFileExcel, color: '#16A34A', bg: '#DCFCE7', type: 'Excel' };

    case 'zip':
    case 'rar':
    case '7z':
      return { icon: FaFileZipper, color: '#D97706', bg: '#FEF3C7', type: 'مضغوط' };

    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'webp':
      return { icon: FaImage, color: '#A855F7', bg: '#F3E8FF', type: 'صورة' };

    default:
      return {
        icon: FaFileLines,
        color: '#6B7280',
        bg: '#F3F4F6',
        type: ext?.toUpperCase() || 'ملف',
      };
  }
}

// ================= COMPONENT =================

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const data = (await reportsAPI.getAll()) as Report[];
        setReports(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, []);

  const categories = [
    {
      name: 'حصادنا',
      href: '/reports/annual',
      icon: FaChartPie,
      color: '#1A5F7A',
      desc: 'التقارير السنوية وحصاد الإنجازات',
    },
    {
      name: 'الأدلة والسياسات',
      href: '/reports/policies',
      icon: FaBook,
      color: '#159C4B',
      desc: 'السياسات والأدلة المعتمدة',
    },
    {
      name: 'جميع التقارير',
      href: '/reports',
      icon: FaFilePdf,
      color: '#D4621A',
      desc: 'جميع التقارير والإصدارات',
      active: true,
    },
  ];

  if (loading) {
    return (
      <div className="pt-navbar container-page section-py text-center">
        جاري التحميل...
      </div>
    );
  }

  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white section-py">
        <div className="container-page text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white">
            التقارير والإصدارات
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-subtitle text-white/90">
            اطلع على تقاريرنا وإنجازاتنا
          </motion.p>
        </div>
      </section>

      <section className="section-py bg-gray-50 dark:bg-gray-900">
        <div className="container-page">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {categories.map((cat, i) => (
              <Link key={i} href={cat.href}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  className={`p-6 rounded-2xl text-center transition-all ${
                    cat.active
                      ? 'bg-primary-500 text-white'
                      : 'bg-white dark:bg-gray-800 hover:shadow-lg'
                  }`}
                >
                  <cat.icon
                    className={`text-4xl mx-auto mb-3 ${cat.active ? 'text-white' : ''}`}
                    style={{ color: cat.active ? 'white' : cat.color }}
                  />
                  <h3 className="text-xl font-bold">{cat.name}</h3>
                  <p className={`text-sm mt-2 ${cat.active ? 'text-white/80' : 'text-gray-500'}`}>
                    {cat.desc}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-6 text-center">جميع التقارير</h2>

          <div className="space-y-4 max-w-4xl mx-auto">
            {reports.map((report, i) => {
              const fileInfo = getFileIcon(report.file_url);
              const Icon = fileInfo.icon;

              return (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl shrink-0" style={{ backgroundColor: fileInfo.bg }}>
                      <Icon className="text-2xl" style={{ color: fileInfo.color }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold truncate">{report.title_ar}</h3>

                      <p className="text-sm text-gray-500 line-clamp-1">
                        {report.description}
                      </p>

                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-gray-400">
                        <span>السنة: {report.year}</span>

                        <span className="flex items-center gap-1">
                          <FaDownload className="text-xs" />
                          {formatNumber(report.downloads)} تحميل
                        </span>

                        {report.file_size && (
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{ backgroundColor: fileInfo.bg, color: fileInfo.color }}
                          >
                            <Icon className="text-[10px]" />
                            {fileInfo.type} - {report.file_size}
                          </span>
                        )}
                      </div>
                    </div>

                    <a
                      href={`${API_URL}/reports/${report.id}/download`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 px-6 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors inline-flex items-center gap-2 text-sm font-semibold"
                    >
                      <FaDownload /> تحميل
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}