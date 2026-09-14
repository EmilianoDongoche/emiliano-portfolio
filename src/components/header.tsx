'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/i18n/context';
import { LanguageSwitcher } from './language-switcher';

export function Header() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.contact, href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-3 px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="max-w-[170px] text-[9px] font-bold leading-[1.2] tracking-[0.08em] text-foreground transition-colors hover:text-accent sm:max-w-[220px] sm:text-[10px] md:max-w-none md:text-[11px] md:tracking-[0.12em]"
        >
          {t.nav.brandName}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pl-4 border-l border-border flex items-center gap-4">
            <LanguageSwitcher />
            <a
              href="#contact"
              className="text-xs font-medium px-4 py-2 bg-accent text-[#08111f] rounded-lg hover:bg-[#91bdff] transition-colors"
            >
              {t.nav.letsWork}
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-muted transition-colors hover:text-foreground"
            aria-label={isMobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm text-muted hover:text-foreground transition-colors py-2"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-muted transition-colors text-center mt-2"
              >
                {t.nav.letsWork}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
