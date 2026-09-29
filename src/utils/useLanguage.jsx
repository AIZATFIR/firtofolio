import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext({
  lang: 'id',
  setLang: () => {},
  toggleLang: () => {},
  t: (idVal, enVal) => idVal,
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('zafir-lang') || 'id';
    }
    return 'id';
  });

  useEffect(() => {
    localStorage.setItem('zafir-lang', lang);
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  const setLang = (newLang) => {
    setLangState(newLang);
  };

  const toggleLang = () => {
    setLangState((prev) => (prev === 'id' ? 'en' : 'id'));
  };

  const t = (idVal, enVal) => {
    return lang === 'id' ? idVal : enVal;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      lang: 'id',
      setLang: () => {},
      toggleLang: () => {},
      t: (idVal, enVal) => idVal,
    };
  }
  return context;
}

export default useLanguage;
