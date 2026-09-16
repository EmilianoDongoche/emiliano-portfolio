'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Download } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/i18n/context';

const cvFiles = {
  pt: '/documents/CV-Emiliano-Dongoche-PT.pdf',
  en: '/documents/CV-Emiliano-Dongoche-EN.pdf',
  es: '/documents/CV-Emiliano-Dongoche-ES.pdf',
} as const;

const languageFlags = {
  pt: '🇵🇹',
  en: '🇬🇧',
  es: '🇪🇸',
} as const;

export function CVDownload() {
  const { lang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuId = 'cv-download-menu';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyEscape);
    };
  }, []);

  const languages = [
    { code: 'pt', label: t.contact.cvLanguages.pt },
    { code: 'en', label: t.contact.cvLanguages.en },
    { code: 'es', label: t.contact.cvLanguages.es },
  ] as const;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={t.contact.downloadCv}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={menuId}
        className="button-secondary inline-flex items-center gap-2"
      >
        <Download size={16} aria-hidden="true" />
        {t.contact.downloadCv}
        <ChevronDown size={15} aria-hidden="true" className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={menuId}
            role="menu"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute bottom-full left-1/2 z-50 mb-2 w-52 -translate-x-1/2 overflow-hidden rounded-lg border border-border bg-card shadow-xl sm:bottom-auto sm:top-full sm:mt-2"
          >
            <div className="py-1">
              {languages.map((language) => (
                <a
                  key={language.code}
                  href={cvFiles[language.code]}
                  download
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                  className={`flex min-h-11 w-full items-center gap-3 px-4 py-2 text-left text-sm transition-colors ${
                    lang === language.code
                      ? 'bg-accent/10 font-medium text-accent'
                      : 'text-muted hover:bg-surface hover:text-foreground'
                  }`}
                >
                  <span aria-hidden="true">{languageFlags[language.code]}</span>
                  <span className="flex-1">{language.label}</span>
                  {lang === language.code && <Check size={15} aria-hidden="true" />}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
