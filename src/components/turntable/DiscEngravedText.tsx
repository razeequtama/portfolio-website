import React from 'react';
import type { SectionMeta } from '../../types/portfolio';

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
  return (
    <div className="disc-flanking-controls" aria-label="Turntable Navigation Controls">
      {prevSection && (
        <button
          type="button"
          className="arc-flank-btn flank-prev"
          onClick={onPrev}
          aria-label={`Previous section: ${prevSection.title}`}
          title={`Previous: ${prevSection.title} (Scroll up or click)`}
        >
          <span className="flank-icon" aria-hidden="true">
            ‹
          </span>
          <div className="flank-info">
            <span className="flank-direction">PREV</span>
            <span className="flank-title">{prevSection.title}</span>
          </div>
        </button>
      )}

      {nextSection && (
        <button
          type="button"
          className="arc-flank-btn flank-next"
          onClick={onNext}
          aria-label={`Next section: ${nextSection.title}`}
          title={`Next: ${nextSection.title} (Scroll down or click)`}
        >
          <div className="flank-info text-right">
            <span className="flank-direction">NEXT</span>
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
