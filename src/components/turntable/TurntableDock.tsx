import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  // Desktop hover state & Mobile/Tablet explicit expand state
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const hoverTimeoutRef = useRef<number | null>(null);
  const dockRef = useRef<HTMLElement>(null);

  // Wheel scroll to change cards with throttle
  const lastScrollTimeRef = useRef<number>(0);
  const scrollAccumulatorRef = useRef<number>(0);

  // Mobile/Tablet vertical touch drag-up / drag-down state
  const touchStartYRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const isDockOpen = isHovered || isExpanded;

  // Global keyboard navigation: ArrowLeft (prev) and ArrowRight (next)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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

  // Mouse wheel & trackpad scroll listener to change cards
  useEffect(() => {
    const dockEl = dockRef.current;
    if (!dockEl) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const now = performance.now();
      const dominantDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      scrollAccumulatorRef.current += dominantDelta;

      if (now - lastScrollTimeRef.current > 180) {
        if (scrollAccumulatorRef.current > 12) {
          onNext();
          lastScrollTimeRef.current = now;
          scrollAccumulatorRef.current = 0;
        } else if (scrollAccumulatorRef.current < -12) {
          onPrev();
          lastScrollTimeRef.current = now;
          scrollAccumulatorRef.current = 0;
        }
      }
    };

    dockEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      dockEl.removeEventListener('wheel', handleWheel);
    };
  }, [onNext, onPrev]);

  // Desktop hover handlers with exit buffer
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsHovered(false);
    }, 180);
  };

  // Mobile & Tablet Drag-Up to Expand and Drag-Down to Collapse
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartYRef.current = e.touches[0].clientY;
      touchStartXRef.current = e.touches[0].clientX;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartYRef.current === null) return;
    const currentY = e.touches[0].clientY;
    const currentX = e.touches[0].clientX;
    const deltaY = currentY - touchStartYRef.current;
    const deltaX = Math.abs(currentX - (touchStartXRef.current || currentX));

    // When peeking: Dragging up expands the disc
    if (!isDockOpen) {
      if (deltaY < -20 && Math.abs(deltaY) > deltaX) {
        setIsExpanded(true);
        touchStartYRef.current = null;
      }
    } else {
      // When expanded: Swiping down from top handle collapses it
      if (deltaY > 40 && Math.abs(deltaY) > deltaX * 1.5) {
        setIsExpanded(false);
        setIsHovered(false);
        touchStartYRef.current = null;
      }
    }
  };

  const handleTouchEnd = () => {
    touchStartYRef.current = null;
    touchStartXRef.current = null;
  };

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  // Section metadata for previous and next cards
  const totalCards = portfolioSections.length;
  const prevIndex = (activeIndex - 1 + totalCards) % totalCards;
  const nextIndex = (activeIndex + 1) % totalCards;
  const prevSection = portfolioSections[prevIndex];
  const nextSection = portfolioSections[nextIndex];

  return (
    <nav
      ref={dockRef}
      className={`turntable-dock ${isDockOpen ? 'is-focused' : 'is-unfocused'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={handleMouseEnter}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          handleMouseLeave();
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Interactive Circular Turntable Navigation"
      role="region"
      aria-roledescription="turntable-dock"
    >
      {/* Mobile & Tablet Expand / Collapse Control Pill */}
      <div className="dock-mobile-control-bar">
        {!isDockOpen ? (
          <button
            type="button"
            className="touch-expand-pill"
            onClick={toggleExpand}
            aria-label="Expand turntable dock"
          >
            <span className="expand-pill-arrow" aria-hidden="true">
              ▴
            </span>
            <span>Expand</span>
          </button>
        ) : (
          <button
            type="button"
            className="touch-collapse-pill"
            onClick={toggleExpand}
            aria-label="Collapse turntable dock"
          >
            <span>Collapse</span>
            <span className="collapse-pill-arrow" aria-hidden="true">
              ▾
            </span>
          </button>
        )}
      </div>

      {/* Transparent Circular Turntable Viewport */}
      <div
        className="turntable-viewport"
        onClick={() => {
          // If peeking on mobile, tapping anywhere on the peeking disc expands it
          if (!isDockOpen) {
            setIsExpanded(true);
          }
        }}
      >
        {/* Next and Previous buttons situated on the sides of the active card */}
        <DiscEngravedText
          prevSection={prevSection}
          nextSection={nextSection}
          onPrev={onPrev}
          onNext={onNext}
        />

        {/* The Circular Wheel Disc & Radially Mounted Cards */}
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
