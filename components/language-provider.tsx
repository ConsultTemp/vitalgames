"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import it from '@/dictionaries/it.json';
import en from '@/dictionaries/en.json';
import es from '@/dictionaries/es.json';

export type Language = 'it' | 'en' | 'es';

const dictionaries = {
  it,
  en,
  es,
};

type LanguageContextType = {
  lang: Language;
  dictionary: typeof it;
  setLang: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [lang, setLang] = useState<Language>('it');

  useEffect(() => {
    const pathLang = pathname.split('/')[1] as Language;
    if (pathLang && ['it', 'en', 'es'].includes(pathLang)) {
      setLang(pathLang);
    }
  }, [pathname]);

  return (
    /* @ts-ignore */
    <LanguageContext.Provider value={{ lang, dictionary: dictionaries[lang], setLang }}>
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

