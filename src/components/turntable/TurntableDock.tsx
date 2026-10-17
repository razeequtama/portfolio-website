import React, { useState, useEffect } from 'react';
import { portfolioSections } from '../../data/portfolioData';
import { TurntableWheel } from './TurntableWheel';
import { DiscEngravedText } from './DiscEngravedText';

interface TurntableDockProps {
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const TurntableDock: React.FC<TurntableDockProps> = ({
  activeIndex,
  onSelectIndex,
  onNext,
  onPrev,
}) => {
  const [isHidden, setIsHidden] = useState<boolean>(false);

  // Global keyboard navigation: ArrowLeft (prev) and ArrowRight (next)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing inside an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPrev, onNext]);

  // Previous and next section metadata for dynamic on-disc labels
  const totalCards = portfolioSections.length;
  const prevIndex = (activeIndex - 1 + totalCards) % totalCards;
  const nextIndex = (activeIndex + 1) % totalCards;
  const prevSection = portfolioSections[prevIndex];
  const nextSection = portfolioSections[nextIndex];

  return (
    <nav
      className={`turntable-dock ${isHidden ? 'is-hidden' : ''}`}
      aria-label="Interactive Turntable Dock Navigation"
      role="region"
      aria-roledescription="dock"
    >
      {/* Dock Header with single centered pill toggle */}
      <div className="dock-header">
        <button
          type="button"
          className="dock-toggle-pill"
          onClick={() => setIsHidden((prev) => !prev)}
          aria-expanded={!isHidden}
          aria-label={isHidden ? 'Show Turntable Dock' : 'Hide Turntable Dock'}
        >
          <span>{isHidden ? 'Show Turntable' : 'Hide Turntable'}</span>
          <span className="dock-toggle-arrow" aria-hidden="true">
            {isHidden ? '▴' : '▾'}
          </span>
        </button>
      </div>

      {/* Turntable Viewport (Clipping the lower half of the disc wheel) */}
      <div className="turntable-viewport">
        {/* Prominent Next and Previous Arc Navigation Buttons */}
        <DiscEngravedText
          prevSection={prevSection}
          nextSection={nextSection}
          onPrev={onPrev}
          onNext={onNext}
        />

        {/* Physical Wheel & Radially Mounted Cards */}
        <TurntableWheel
          activeIndex={activeIndex}
          onSelectIndex={onSelectIndex}
          onNext={onNext}
          onPrev={onPrev}
        />
      </div>
    </nav>
  );
};
