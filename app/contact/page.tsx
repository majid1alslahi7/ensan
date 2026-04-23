'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FaPhone, FaEnvelope, FaLocationDot, FaClock, FaWhatsapp, 
  FaPaperPlane, FaUser, FaMessage, FaCircleCheck, FaMapPin,
  FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn
} from 'react-icons/fa6';
import toast from 'react-hot-toast';
import { API_URL } from '@/lib/api';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_WHATSAPP, contactLinks } from '@/lib/contact';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    { icon: FaPhone, label: 'اتصل بنا', value: CONTACT_PHONE, color: '#1A5F7A', link: contactLinks.phone, description: 'متاح للاستفسارات والطلبات العاجلة' },
    { icon: FaWhatsapp, label: 'واتساب', value: CONTACT_WHATSAPP, color: '#25D366', link: contactLinks.whatsapp, description: 'رد سريع عبر واتساب' },
    { icon: FaEnvelope, label: 'البريد الإلكتروني', value: CONTACT_EMAIL, color: '#3B82F6', link: contactLinks.email, description: 'للاقتراحات والاستفسارات العامة' },
    { icon: FaLocationDot, label: 'العنوان', value: 'الضالع - اليمن', color: '#D4621A', description: 'المكتب الرئيسي' },
    { icon: FaClock, label: 'ساعات العمل', value: 'الأحد - الخميس: 8:00 ص - 4:00 م', color: '#8B5CF6', description: 'الجمعة والسبت: إجازة' },
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: contactLinks.facebook, color: '#1877F2' },
    { icon: FaTwitter, href: contactLinks.x, color: '#1DA1F2' },
    { icon: FaInstagram, href: contactLinks.instagram, color: '#E4405F' },
    { icon: FaYoutube, href: contactLinks.youtube, color: '#FF0000' },
    { icon: FaLinkedinIn, href: contactLinks.linkedin, color: '#0A66C2' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    try {
      const response = await fetch(`${API_URL}/complaints`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, type: 'inquiry' }) });
      if (response.ok) { setSubmitted(true); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); toast.success('تم إرسال رسالتك بنجاح'); }
      else { toast.error('حدث خطأ، الرجاء المحاولة لاحقاً'); }
    } catch { toast.error('حدث خطأ في الاتصال'); } finally { setLoading(false); }
  };

  return (
    <div className="pt-navbar">
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 text-white section-py overflow-hidden">
        <div className="absolute inset-0 opacity-10"><motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 20, repeat: Infinity }} className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-white blur-3xl" /><motion.div animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 25, repeat: Infinity }} className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-white blur-3xl" /></div>
        <div className="container-page relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6"><div className="inline-flex p-4 rounded-full bg-white/10 backdrop-blur-sm"><FaMessage className="text-4xl" /></div></motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold mb-4">تواصل معنا</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl opacity-90 max-w-2xl mx-auto">نحن هنا للإجابة على استفساراتكم وسماع اقتراحاتكم</motion.p>
        </div>
      </section>

      <section className="section-py bg-gray-50 dark:bg-gray-900">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {contactInfo.map((item, i) => (
              <motion.a key={i} href={item.link || '#'} target={item.link?.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -8, scale: 1.02 }} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all group">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ background: item.color + '20' }}><item.icon className="text-2xl" style={{ color: item.color }} /></div>
                <h3 className="font-bold text-lg mb-1">{item.label}</h3><p className="text-sm font-medium mb-2" style={{ color: item.color }} dir="ltr">{item.value}</p><p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><FaMessage className="text-primary-500" /> أرسل رسالة</h2>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"><FaCircleCheck className="text-4xl text-green-500" /></div>
                    <h3 className="text-xl font-bold mb-2">تم الإرسال بنجاح</h3><p className="text-gray-500 dark:text-gray-400">شكراً لتواصلك معنا، سنرد عليك في أقرب وقت</p>
                    <button onClick={() => setSubmitted(false)} className="mt-6 btn btn-primary">إرسال رسالة أخرى</button>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div><label className="block text-sm font-medium mb-2">الاسم الكامل *</label><div className="relative"><FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full pr-12 pl-4 py-3 border rounded-xl" required /></div></div>
                      <div><label className="block text-sm font-medium mb-2">البريد الإلكتروني *</label><div className="relative"><FaEnvelope className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" /><input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full pr-12 pl-4 py-3 border rounded-xl" required /></div></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div><label className="block text-sm font-medium mb-2">رقم الهاتف</label><div className="relative"><FaPhone className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" /><input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full pr-12 pl-4 py-3 border rounded-xl" /></div></div>
                      <div><label className="block text-sm font-medium mb-2">الموضوع</label><input type="text" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full px-4 py-3 border rounded-xl" /></div>
                    </div>
                    <div><label className="block text-sm font-medium mb-2">الرسالة *</label><textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows={5} className="w-full p-4 border rounded-xl" required /></div>
                    <button type="submit" disabled={loading} className="btn btn-primary w-full"><FaPaperPlane /> {loading ? 'جاري الإرسال...' : 'إرسال الرسالة'}</button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden h-64"><div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 flex items-center justify-center"><div className="text-center"><FaMapPin className="text-5xl text-primary-500 mx-auto mb-3" /><p className="font-bold">الضالع - اليمن</p><p className="text-sm text-gray-500">المكتب الرئيسي</p></div></div></div>
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6"><h3 className="font-bold mb-4">تابعنا على وسائل التواصل</h3><div className="flex gap-3">{socialLinks.map((social, i) => (<motion.a key={i} href={social.href} target="_blank" whileHover={{ scale: 1.1, y: -3 }} className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: social.color + '20' }}><social.icon className="text-xl" style={{ color: social.color }} /></motion.a>))}</div></div>
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white rounded-3xl shadow-xl p-6"><h3 className="font-bold mb-3 flex items-center gap-2"><FaClock /> أوقات الذروة</h3><p className="opacity-90">ننصح بالاتصال خلال ساعات الصباح (8:00 - 11:00) للحصول على رد أسرع</p></div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
