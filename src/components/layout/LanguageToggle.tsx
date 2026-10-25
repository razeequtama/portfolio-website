import React from 'react';
import { useLanguage, type Language } from '../../context/LanguageContext';

export const FlagUK: React.FC<{ size?: number }> = ({ size = 20 }) => {
  const height = Math.round((size * 2) / 3);
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 60 40"
      aria-hidden="true"
      className="lang-flag-svg"
      style={{
        borderRadius: '2px',
        display: 'inline-block',
        flexShrink: 0,
        boxShadow: '0 0 1px rgba(0,0,0,0.3)',
      }}
    >
      <clipPath id="uk-flag-clip">
        <rect width="60" height="40" rx="2" />
      </clipPath>
      <g clipPath="url(#uk-flag-clip)">
        <rect width="60" height="40" fill="#012169" />
        <path d="M0,0 L60,40 M60,0 L0,40" stroke="#FFFFFF" strokeWidth="8" />
        <path d="M0,0 L60,40" stroke="#C8102E" strokeWidth="4" />
        <path d="M60,0 L0,40" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v40 M0,20 h60" stroke="#FFFFFF" strokeWidth="12" />
        <path d="M30,0 v40 M0,20 h60" stroke="#C8102E" strokeWidth="7" />
      </g>
    </svg>
  );
};

export const FlagID: React.FC<{ size?: number }> = ({ size = 20 }) => {
  const height = Math.round((size * 2) / 3);
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 60 40"
      aria-hidden="true"
      className="lang-flag-svg"
      style={{
        borderRadius: '2px',
        display: 'inline-block',
        flexShrink: 0,
        boxShadow: '0 0 1px rgba(0,0,0,0.3)',
      }}
    >
      <clipPath id="id-flag-clip">
        <rect width="60" height="40" rx="2" />
      </clipPath>
      <g clipPath="url(#id-flag-clip)">
        <rect width="60" height="20" fill="#CE1126" />
        <rect y="20" width="60" height="20" fill="#FFFFFF" />
        <rect
          width="60"
          height="40"
          fill="none"
          stroke="rgba(128,128,128,0.35)"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
};

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <div
      className="language-toggle-group"
      role="radiogroup"
      aria-label="Language selection / Pilihan bahasa"
    >
      <button
        type="button"
        role="radio"
        aria-checked={language === 'en'}
        className={`lang-option-btn ${language === 'en' ? 'is-active' : ''}`}
        onClick={() => handleSelect('en')}
        title="Switch to English"
        aria-label="English"
      >
        <FlagUK size={20} />
      </button>

      <span className="lang-divider" aria-hidden="true" />

      <button
        type="button"
        role="radio"
        aria-checked={language === 'id'}
        className={`lang-option-btn ${language === 'id' ? 'is-active' : ''}`}
        onClick={() => handleSelect('id')}
        title="Ubah ke Bahasa Indonesia"
        aria-label="Bahasa Indonesia"
      >
        <FlagID size={20} />
      </button>
    </div>
  );
};
