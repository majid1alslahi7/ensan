'use client';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { FaBook, FaShield, FaScaleBalanced, FaArrowLeft, FaDownload, FaFilePdf, FaFile, FaFileWord, FaFileLines } from 'react-icons/fa6';
import { reportsAPI, API_URL } from '@/lib/api';

const policyIcons: any = {
  'policy': FaShield,
  'financial': FaBook,
  'hr': FaBook,
  'procedure': FaBook,
  'default': FaScaleBalanced,
};

// دالة لتحديد أيقونة الملف ولونه
function getFileIcon(fileUrl?: string) {
  if (!fileUrl) return { icon: FaFile, color: '#6B7280', bg: '#F3F4F6', type: 'ملف' };
  const ext = fileUrl.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf': return { icon: FaFilePdf, color: '#EF4444', bg: '#FEE2E2', type: 'PDF' };
    case 'doc':
    case 'docx': return { icon: FaFileWord, color: '#2563EB', bg: '#DBEAFE', type: 'Word' };
    default: return { icon: FaFileLines, color: '#6B7280', bg: '#F3F4F6', type: ext?.toUpperCase() || 'ملف' };
  }
}

export default function PoliciesPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const data = await reportsAPI.getAll();
        const policies = data.filter((r: any) => r.category === 'policy');
        setReports(policies);
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
        <div className="container-page">
          <Link href="/reports" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <FaArrowLeft /> العودة للتقارير
          </Link>
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white">الأدلة والسياسات</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-subtitle text-white/90">السياسات والأدلة المعتمدة في المؤسسة</motion.p>
        </div>
      </section>

      <section className="section-py bg-gray-50 dark:bg-gray-900">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.length > 0 ? reports.map((policy, i) => {
              const Icon = policyIcons[policy.category] || FaBook;
              const fileInfo = getFileIcon(policy.file_url);
              const FileIcon = fileInfo.icon;
              return (
                <motion.div key={policy.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl shrink-0">
                      <Icon className="text-2xl text-primary-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold mb-2">{policy.title_ar}</h3>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{policy.description}</p>
                      
                      {/* عرض معلومات الملف + زر التحميل */}
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          {/* أيقونة الملف الملونة */}
                          <div className="p-1.5 rounded-lg shrink-0" style={{ backgroundColor: fileInfo.bg }}>
                            <FileIcon className="text-sm" style={{ color: fileInfo.color }} />
                          </div>
                          <div className="text-xs text-gray-400">
                            <span className="font-medium" style={{ color: fileInfo.color }}>{fileInfo.type}</span>
                            {policy.file_size && <span> - {policy.file_size}</span>}
                          </div>
                        </div>
                        <a
                          href={`${API_URL}/reports/${policy.id}/download`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors text-sm font-medium"
                        >
                          <FaDownload className="text-xs" /> تحميل
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            }) : (
              <div className="col-span-2 text-center py-10">
                <FaBook className="text-5xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">سيتم إضافة الأدلة والسياسات قريباً</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}


