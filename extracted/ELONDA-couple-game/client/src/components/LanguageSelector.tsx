import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

const LanguageSelector: React.FC = () => {
  const { currentLanguage, setLanguage } = useLanguage();

  const languages = [
    { code: 'pt', name: 'Português' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'ru', name: 'Русский' },
    { code: 'fr', name: 'Français' }
  ];

  return (
    <div className="fixed top-4 right-4 z-[9999]">
      <select
        value={currentLanguage}
        onChange={(e) => setLanguage(e.target.value)}
        className="glass-card text-white text-xs md:text-sm py-2 px-3 rounded-lg bg-gradient-to-r from-purple-800 to-pink-800 border border-purple-500 shadow-lg outline-none cursor-pointer"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code} className="bg-gray-800 text-white">
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;