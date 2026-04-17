'use client';
import { motion } from 'motion/react';
import { FaBook, FaFilePdf, FaShield, FaScaleBalanced } from 'react-icons/fa6';

const policies = [
  { id: 1, title: 'سياسة الحماية', icon: FaShield, desc: 'سياسة حماية الطفل والفئات الضعيفة', color: '#1A5F7A' },
  { id: 2, title: 'مدونة السلوك', icon: FaScaleBalanced, desc: 'مدونة السلوك الأخلاقي والمهني', color: '#159C4B' },
  { id: 3, title: 'دليل السياسات المالية', icon: FaBook, desc: 'السياسات والإجراءات المالية', color: '#D4621A' },
  { id: 4, title: 'دليل الموارد البشرية', icon: FaBook, desc: 'سياسات وإجراءات الموارد البشرية', color: '#8B5CF6' },
  { id: 5, title: 'سياسة مكافحة الفساد', icon: FaShield, desc: 'سياسة مكافحة الفساد والاحتيال', color: '#EF4444' },
  { id: 6, title: 'الدليل الإجرائي', icon: FaBook, desc: 'الدليل الإجرائي للعمليات', color: '#3B82F6' },
];

export default function PoliciesPage() {
  return (
    <div className="pt-navbar">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white section-py">
        <div className="container-page text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="section-title text-white">
            الأدلة والسياسات
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="section-subtitle text-white/90">
            السياسات والأدلة المعتمدة في المؤسسة
          </motion.p>
        </div>
      </section>

      <section className="section-py bg-gray-50 dark:bg-gray-900">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {policies.map((policy, i) => {
              const Icon = policy.icon;
              return (
                <motion.div
                  key={policy.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 card-hover"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: policy.color + '20' }}>
                      <Icon className="text-xl" style={{ color: policy.color }} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">{policy.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{policy.desc}</p>
                      <button className="flex items-center gap-1 text-sm font-medium" style={{ color: policy.color }}>
                        <FaFilePdf /> تحميل PDF
                      </button>
                    </div>
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
