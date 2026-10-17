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
    <div className="disc-navigation-controls" aria-label="Turntable Navigation Controls">
      {/* PREVIOUS SECTION BUTTON */}
      <button
        type="button"
        className="arc-nav-btn prev-nav-btn"
        onClick={onPrev}
        aria-label={`Go to previous section: ${prevSection.title}`}
        title={`Previous: ${prevSection.title} (Left Arrow)`}
      >
        <span className="nav-btn-icon" aria-hidden="true">
          ‹
        </span>
        <div className="nav-btn-content">
          <div className="nav-btn-hint">
            <span className="nav-direction">PREV</span>
          </div>
          <div className="nav-btn-title">{prevSection.title}</div>
        </div>
      </button>

      {/* NEXT SECTION BUTTON */}
      <button
        type="button"
        className="arc-nav-btn next-nav-btn"
        onClick={onNext}
        aria-label={`Go to next section: ${nextSection.title}`}
        title={`Next: ${nextSection.title} (Right Arrow)`}
      >
        <div className="nav-btn-content text-right">
          <div className="nav-btn-hint">
            <span className="nav-direction">NEXT</span>
          </div>
          <div className="nav-btn-title">{nextSection.title}</div>
        </div>
        <span className="nav-btn-icon" aria-hidden="true">
          ›
        </span>
      </button>
    </div>
  );
};
