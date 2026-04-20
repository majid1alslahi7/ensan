'use client';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { FaBook, FaFilePdf, FaShield, FaScaleBalanced, FaArrowLeft, FaDownload } from 'react-icons/fa6';
import { reportsAPI } from '@/lib/api';

const policyIcons: any = {
  'policy': FaShield,
  'financial': FaBook,
  'hr': FaBook,
  'procedure': FaBook,
  'default': FaScaleBalanced,
};

export default function PoliciesPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const data = await reportsAPI.getAll();
        const policies = (data.data || data).filter((r: any) => r.category === 'policy');
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
              return (
                <motion.div key={policy.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                      <Icon className="text-2xl text-primary-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold mb-2">{policy.title_ar}</h3>
                      <p className="text-sm text-gray-500 mb-4">{policy.description}</p>
                      <button className="flex items-center gap-1 text-sm font-medium text-primary-500">
                        <FaFilePdf /> تحميل PDF
                      </button>
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
