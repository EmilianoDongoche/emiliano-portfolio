'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TranslationData } from './types';
import { en } from './en';
import { pt } from './pt';
import { es } from './es';

const dictionaries: Record<Language, TranslationData> = {
  en,
  pt,
  es,
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationData;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('site-lang') as Language;
    let preferredLang: Language = 'en';
    if (savedLang && (savedLang === 'en' || savedLang === 'pt' || savedLang === 'es')) {
      preferredLang = savedLang;
    } else {
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang === 'pt') {
        preferredLang = 'pt';
      } else if (browserLang === 'es') {
        preferredLang = 'es';
      }
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLang(preferredLang);
    document.documentElement.lang = preferredLang;
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('site-lang', newLang);
    document.documentElement.lang = newLang;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t: dictionaries[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
