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
  // Desktop hover state, explicit expand state, and manual collapse override
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isManuallyCollapsed, setIsManuallyCollapsed] = useState<boolean>(false);

  const hoverTimeoutRef = useRef<number | null>(null);
  const dockRef = useRef<HTMLElement>(null);

  // Wheel scroll to change cards with throttle
  const lastScrollTimeRef = useRef<number>(0);
  const scrollAccumulatorRef = useRef<number>(0);

  // Mobile/Tablet vertical touch drag-up / drag-down state
  const touchStartYRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartTimeRef = useRef<number>(0);

  // Dock is open if either hovered or explicitly expanded, unless manually collapsed
  const isDockOpen = !isManuallyCollapsed && (isHovered || isExpanded);

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

  const lastToggleTimeRef = useRef<number>(0);

  // Check if device uses fine pointer (desktop mouse)
  const isFinePointer = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Desktop hover handlers with exit buffer (only active for fine pointer / mouse)
  const handleMouseEnter = () => {
    if (!isFinePointer()) return;

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    // Only expand on hover if user hasn't explicitly clicked Collapse during this hover
    if (!isManuallyCollapsed) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isFinePointer()) return;

    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsHovered(false);
      setIsExpanded(false);
      setIsManuallyCollapsed(false); // Reset manual collapse lock when cursor leaves
    }, 180);
  };

  // Explicit Collapse handler (works on desktop, tablet, and mobile)
  const handleCollapse = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const now = performance.now();
    if (now - lastToggleTimeRef.current < 320) {
      return;
    }
    lastToggleTimeRef.current = now;

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsManuallyCollapsed(true);
    setIsExpanded(false);
    setIsHovered(false);
    // Blur button so activeElement focus doesn't keep dock open
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, []);

  // Explicit Expand handler (works on desktop, tablet, and mobile)
  const handleExpand = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const now = performance.now();
    if (now - lastToggleTimeRef.current < 320) {
      return;
    }
    lastToggleTimeRef.current = now;

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsManuallyCollapsed(false);
    setIsExpanded(true);
    setIsHovered(true);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, []);

  // Unified Toggle handler for single stable button element (prevents mobile ghost clicks)
  const toggleDock = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (isDockOpen) {
      handleCollapse(e);
    } else {
      handleExpand(e);
    }
  }, [isDockOpen, handleCollapse, handleExpand]);

  // Mobile & Tablet Drag-Up to Expand and Drag-Down to Collapse with fluid thresholds
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartYRef.current = e.touches[0].clientY;
      touchStartXRef.current = e.touches[0].clientX;
      touchStartTimeRef.current = performance.now();
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartYRef.current === null) return;
    const currentY = e.touches[0].clientY;
    const currentX = e.touches[0].clientX;
    const deltaY = currentY - touchStartYRef.current;
    const deltaX = Math.abs(currentX - (touchStartXRef.current || currentX));

    // When peeking (closed): fluid upward drag expands the disc effortlessly
    if (!isDockOpen) {
      if (deltaY < -12 && Math.abs(deltaY) > deltaX * 0.7) {
        handleExpand();
        touchStartYRef.current = null;
        touchStartXRef.current = null;
      }
    } else {
      // When expanded (open): fluid downward drag collapses it easily
      if (deltaY > 18 && deltaY > deltaX * 0.9) {
        handleCollapse();
        touchStartYRef.current = null;
        touchStartXRef.current = null;
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartYRef.current !== null && e.changedTouches.length === 1) {
      const endY = e.changedTouches[0].clientY;
      const endX = e.changedTouches[0].clientX;
      const deltaY = endY - touchStartYRef.current;
      const deltaX = Math.abs(endX - (touchStartXRef.current || endX));
      const duration = performance.now() - touchStartTimeRef.current;
      const isQuickFlick = duration < 350;

      if (!isDockOpen) {
        if ((deltaY < -10 && isQuickFlick) || deltaY < -16) {
          if (Math.abs(deltaY) > deltaX * 0.6) {
            handleExpand();
          }
        }
      } else {
        if ((deltaY > 14 && isQuickFlick) || deltaY > 20) {
          if (deltaY > deltaX * 0.7) {
            handleCollapse();
          }
        }
      }
    }
    touchStartYRef.current = null;
    touchStartXRef.current = null;
  };

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
      onFocusCapture={() => {
        if (isFinePointer() && !isManuallyCollapsed) {
          handleMouseEnter();
        }
      }}
      onBlurCapture={(e) => {
        if (isFinePointer() && !e.currentTarget.contains(e.relatedTarget)) {
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
      {/* Expand / Collapse Control Pill (Desktop, Tablet, & Mobile) */}
      <div className="dock-mobile-control-bar">
        <button
          type="button"
          className={`touch-pill-btn ${isDockOpen ? 'touch-collapse-pill' : 'touch-expand-pill'}`}
          onClick={toggleDock}
          aria-label={isDockOpen ? 'Collapse turntable dock' : 'Expand turntable dock'}
        >
          {!isDockOpen ? (
            <>
              <span className="expand-pill-arrow" aria-hidden="true">
                ▴
              </span>
              <span>Expand</span>
            </>
          ) : (
            <>
              <span>Collapse</span>
              <span className="collapse-pill-arrow" aria-hidden="true">
                ▾
              </span>
            </>
          )}
        </button>
      </div>

      {/* Transparent Circular Turntable Viewport */}
      <div
        className="turntable-viewport"
        onClick={() => {
          // If peeking, clicking/tapping anywhere on the peeking disc expands it
          if (!isDockOpen) {
            handleExpand();
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
