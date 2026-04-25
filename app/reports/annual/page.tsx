'use client';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { FaFilePdf, FaDownload, FaCalendar, FaFile, FaFileWord, FaFileExcel, FaFileZipper, FaFileLines } from 'react-icons/fa6';
import { reportsAPI, API_URL } from '@/lib/api';

// دالة لتحديد الأيقونة واللون حسب نوع الملف
function getFileIcon(fileUrl?: string) {
  if (!fileUrl) return { icon: FaFile, color: '#6B7280', bg: '#F3F4F6', type: 'ملف' };
  const ext = fileUrl.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf': return { icon: FaFilePdf, color: '#EF4444', bg: '#FEE2E2', type: 'PDF' };
    case 'doc':
    case 'docx': return { icon: FaFileWord, color: '#2563EB', bg: '#DBEAFE', type: 'Word' };
    case 'xls':
    case 'xlsx': return { icon: FaFileExcel, color: '#16A34A', bg: '#DCFCE7', type: 'Excel' };
    case 'zip':
    case 'rar':
    case '7z': return { icon: FaFileZipper, color: '#D97706', bg: '#FEF3C7', type: 'مضغوط' };
    default: return { icon: FaFileLines, color: '#6B7280', bg: '#F3F4F6', type: ext?.toUpperCase() || 'ملف' };
  }
}

export default function AnnualReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const data = await reportsAPI.getAll();
        setReports(data.filter((report: any) => report.category === 'annual'));
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, []);

  if (loading) return <div className="pt-navbar container-page section-py text-center">جاري التحميل...</div>;

  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white section-py">
        <div className="container-page text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white">
            حصادنا - التقارير السنوية
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="section-subtitle text-white/90">
            تقاريرنا السنوية التي توثق إنجازاتنا وأثرنا
          </motion.p>
        </div>
      </section>

      <section className="section-py">
        <div className="container-page max-w-4xl">
          <div className="space-y-4">
            {reports.length > 0 ? reports.map((report, i) => {
              const fileInfo = getFileIcon(report.file_url);
              const Icon = fileInfo.icon;
              return (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6"
                >
                  <div className="flex items-center gap-4">
                    {/* أيقونة الملف الملونة بحسب نوعه */}
                    <div className="p-3 rounded-xl shrink-0" style={{ backgroundColor: fileInfo.bg }}>
                      <Icon className="text-2xl" style={{ color: fileInfo.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold">{report.title_ar || report.title}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <FaCalendar className="text-xs" />
                          {report.year}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaDownload className="text-xs" />
                          {report.downloads || 0} تحميل
                        </span>
                        {/* عرض حجم الملف ونوعه */}
                        {report.file_size && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: fileInfo.bg, color: fileInfo.color }}>
                            <Icon className="text-[10px]" />
                            {fileInfo.type} - {report.file_size}
                          </span>
                        )}
                        {!report.file_size && fileInfo.type !== 'ملف' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: fileInfo.bg, color: fileInfo.color }}>
                            <Icon className="text-[10px]" />
                            {fileInfo.type}
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
            }) : (
              <div className="text-center py-12 text-gray-500">سيتم نشر التقارير السنوية قريباً</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}


