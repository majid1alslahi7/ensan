'use client';
import { motion } from 'motion/react';
import { FaHandHoldingHeart, FaArrowDown } from 'react-icons/fa6';
import Link from 'next/link';
import { tokens } from '@/lib/tokens';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700">
      <div className="absolute inset-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-white/5 blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], rotate: [45, 0, 45] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-secondary-500/10 blur-3xl"
        />
        <motion.div 
          animate={{ x: [-100, 100, -100], y: [-50, 50, -50] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-accent-500/10 blur-3xl"
        />
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-8"
        >
          <div className="inline-block p-6 rounded-full bg-white/10 backdrop-blur-sm">
            <FaHandHoldingHeart className="text-6xl md:text-7xl" />
          </div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          {tokens.brand.nameAr}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-xl md:text-3xl mb-10 opacity-95"
        >
          {tokens.brand.slogan}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-wrap gap-5 justify-center"
        >
          <Link href="/about">
            <motion.span 
              whileHover={{ scale: 1.08 }} 
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all cursor-pointer"
            >
              تعرف علينا
              <FaArrowDown className="rotate-180" />
            </motion.span>
          </Link>
          <Link href="/contact/contribute">
            <motion.span 
              whileHover={{ scale: 1.08 }} 
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-primary-600 transition-all cursor-pointer"
            >
              ساهم معنا
            </motion.span>
          </Link>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70"
      >
        <div className="w-7 h-12 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div 
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
