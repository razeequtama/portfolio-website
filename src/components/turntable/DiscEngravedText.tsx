import React from 'react';
import type { SectionMeta } from '../../types/portfolio';

interface DiscEngravedTextProps {
  prevSection: SectionMeta;
  nextSection: SectionMeta;
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
      {/* PREVIOUS SECTION BUTTON (Situated right on the left side of the active card) */}
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

      {/* NEXT SECTION BUTTON (Situated right on the right side of the active card) */}
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
    </div>
  );
};
