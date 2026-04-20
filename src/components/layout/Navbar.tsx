'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaBars, FaXmark, FaChevronDown, FaMoon, FaSun } from 'react-icons/fa6';
import { useTheme } from '@/components/ui/ThemeProvider';
import { siteData } from '@/lib/data/siteData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const { mode, toggleTheme } = useTheme();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown('');
  }, [pathname]);

  const handleDropdownEnter = (name: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(name);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(''), 200);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl py-2' : 'bg-white dark:bg-gray-900 py-2'} border-b border-gray-200/50 dark:border-gray-800/50`}>
      <div className="container-page">
        <div className="flex justify-between items-center">
          {/* شعار - صورة مستطيلة فقط بدون أي نص */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 md:h-12 w-48 md:w-56">
              <Image 
                src="/logo-wide.png" 
                alt="مؤسسة إنسان للأعمال الإنسانية" 
                fill
                className="object-contain object-right" 
                priority={true}
              />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {siteData.navigation.main.map((item: any) => {
              const hasChildren = item.children && item.children.length > 0;
              const Icon = item.icon;
              const isActive = pathname === item.href || (hasChildren && item.children?.some((c: any) => pathname === c.href));
              
              if (hasChildren) {
                return (
                  <div 
                    key={item.name} 
                    className="relative"
                    onMouseEnter={() => handleDropdownEnter(item.name)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${isActive ? 'text-white bg-gradient-to-r from-primary-600 to-secondary-600 shadow-lg' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                    >
                      {Icon && <Icon className="text-lg" />}
                      <span className="font-medium">{item.name}</span>
                      <FaChevronDown className={`text-xs transition-transform duration-300 ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ type: 'spring', damping: 20 }}
                          className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 py-3 z-50 overflow-hidden"
                          onMouseEnter={() => handleDropdownEnter(item.name)}
                          onMouseLeave={handleDropdownLeave}
                        >
                          {item.children.map((child: any) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`block px-5 py-3 text-sm transition-all ${pathname === child.href ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border-r-4 border-primary-500' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${isActive ? 'text-white bg-gradient-to-r from-primary-600 to-secondary-600 shadow-lg' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  {Icon && <Icon className="text-lg" />}
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
            
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all ml-2"
            >
              {mode === 'light' ? <FaMoon /> : <FaSun />}
            </motion.button>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={toggleTheme} className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
              {mode === 'light' ? <FaMoon /> : <FaSun />}
            </motion.button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-3 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
              {isOpen ? <FaXmark className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              ref={sidebarRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-2xl z-50 lg:hidden overflow-hidden"
            >
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                  <div className="relative h-8 w-40">
                    <Image 
                      src="/logo-wide.png" 
                      alt="مؤسسة إنسان" 
                      fill
                      className="object-contain object-right" 
                    />
                  </div>
                  <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                    <FaXmark className="text-xl" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {siteData.navigation.main.map((item: any) => {
                    const hasChildren = item.children && item.children.length > 0;
                    const Icon = item.icon;
                    
                    if (hasChildren) {
                      return (
                        <div key={item.name}>
                          <button
                            onClick={() => setOpenDropdown(openDropdown === item.name ? '' : item.name)}
                            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            {Icon && <Icon className="text-xl" />}
                            <span className="font-medium">{item.name}</span>
                            <FaChevronDown className={`text-xs mr-auto transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                          </button>
                          <AnimatePresence>
                            {openDropdown === item.name && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mr-6 mt-2 space-y-1 border-r-2 border-primary-500/30 pr-4"
                              >
                                {item.children.map((child: any) => (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-2 text-sm rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                                  >
                                    {child.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }
                    
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        {Icon && <Icon className="text-xl" />}
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
