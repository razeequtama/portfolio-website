import React from 'react';
import type { SectionMeta } from '../../types/portfolio';
import { useLanguage } from '../../context/LanguageContext';

interface DiscEngravedTextProps {
  prevSection: SectionMeta | null;
  nextSection: SectionMeta | null;
  onPrev: () => void;
  onNext: () => void;
}

export const DiscEngravedText: React.FC<DiscEngravedTextProps> = ({
  prevSection,
  nextSection,
  onPrev,
  onNext,
}) => {
  const { language } = useLanguage();
  const isID = language === 'id';

  return (
    <div
      className="disc-flanking-controls"
      aria-label={isID ? 'Kontrol Navigasi Turntable' : 'Turntable Navigation Controls'}
    >
      {prevSection && (
        <button
          type="button"
          className="arc-flank-btn flank-prev"
          onClick={onPrev}
          aria-label={
            isID
              ? `Bagian sebelumnya: ${prevSection.title}`
              : `Previous section: ${prevSection.title}`
          }
          title={
            isID
              ? `Sebelumnya: ${prevSection.title} (Scroll ke atas atau klik)`
              : `Previous: ${prevSection.title} (Scroll up or click)`
          }
        >
          <span className="flank-icon" aria-hidden="true">
            ‹
          </span>
          <div className="flank-info">
            <span className="flank-direction">{isID ? 'SEBELUM' : 'PREV'}</span>
            <span className="flank-title">{prevSection.title}</span>
          </div>
        </button>
      )}

      {nextSection && (
        <button
          type="button"
          className="arc-flank-btn flank-next"
          onClick={onNext}
          aria-label={
            isID
              ? `Bagian selanjutnya: ${nextSection.title}`
              : `Next section: ${nextSection.title}`
          }
          title={
            isID
              ? `Selanjutnya: ${nextSection.title} (Scroll ke bawah atau klik)`
              : `Next: ${nextSection.title} (Scroll down or click)`
          }
        >
          <div className="flank-info text-right">
            <span className="flank-direction">{isID ? 'LANJUT' : 'NEXT'}</span>
            <span className="flank-title">{nextSection.title}</span>
          </div>
          <span className="flank-icon" aria-hidden="true">
            ›
          </span>
        </button>
      )}
    </div>
  );
};
