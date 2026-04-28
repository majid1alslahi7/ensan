'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  FaFilePdf,
  FaDownload,
  FaCalendar,
  FaFile,
  FaFileWord,
  FaFileExcel,
  FaFileZipper,
  FaFileLines,
} from 'react-icons/fa6';

import { reportsAPI, API_URL } from '@/lib/api';

type Report = {
  id: number | string;
  title_ar?: string;
  title?: string;
  file_url?: string;
  file_size?: string;
  year?: number;
  downloads?: number;
  category?: string;
};

// ===== icon helper =====
function getFileIcon(fileUrl?: string) {
  if (!fileUrl) return { icon: FaFile, color: '#6B7280', bg: '#F3F4F6', type: 'ملف' };

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
    default:
      return { icon: FaFileLines, color: '#6B7280', bg: '#F3F4F6', type: ext?.toUpperCase() || 'ملف' };
  }
}

export default function AnnualReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const data = (await reportsAPI.getAll()) as Report[];
        setReports(data.filter((r) => r.category === 'annual'));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, []);

  if (loading) {
    return <div className="pt-navbar container-page section-py text-center">جاري التحميل...</div>;
  }

  return (
    <div className="pt-navbar">
      <section className="section-py">
        <div className="container-page max-w-4xl">
          <div className="space-y-4">
            {reports.map((report, i) => {
              const fileInfo = getFileIcon(report.file_url);
              const Icon = fileInfo.icon;

              return (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl" style={{ backgroundColor: fileInfo.bg }}>
                      <Icon style={{ color: fileInfo.color }} />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold">{report.title_ar || report.title}</h3>

                      <div className="flex gap-4 text-sm text-gray-500 mt-2">
                        <span><FaCalendar /> {report.year}</span>
                        <span><FaDownload /> {report.downloads || 0}</span>
                      </div>
                    </div>

                    <a
                      href={`${API_URL}/reports/${report.id}/download`}
                      target="_blank"
                      className="px-4 py-2 bg-primary-500 text-white rounded-xl"
                    >
                      تحميل
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