import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getPortfolioSections } from '../../data/portfolioData';
import { useLanguage } from '../../context/LanguageContext';
import { TurntableWheel } from './TurntableWheel';
import { DiscEngravedText } from './DiscEngravedText';

interface TurntableDockProps {
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

const CUE_STORAGE_KEY = 'portfolio_turntable_cue_dismissed';

export const TurntableDock: React.FC<TurntableDockProps> = ({
  activeIndex,
  onSelectIndex,
  onNext,
  onPrev,
}) => {
  const { language } = useLanguage();
  const sections = getPortfolioSections(language);
  const isID = language === 'id';

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isManuallyCollapsed, setIsManuallyCollapsed] = useState<boolean>(false);

  const [showFirstVisitCue, setShowFirstVisitCue] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      return localStorage.getItem(CUE_STORAGE_KEY) !== 'true';
    } catch {
      return false;
    }
  });

  const dismissCue = useCallback(() => {
    setShowFirstVisitCue((prev) => {
      if (!prev) return false;
      try {
        localStorage.setItem(CUE_STORAGE_KEY, 'true');
      } catch (err) {
        void err;
      }
      return false;
    });
  }, []);

  const hoverTimeoutRef = useRef<number | null>(null);
  const dockRef = useRef<HTMLElement>(null);

  const lastScrollTimeRef = useRef<number>(0);
  const scrollAccumulatorRef = useRef<number>(0);

  const touchStartYRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartTimeRef = useRef<number>(0);
  const isSwipingUpRef = useRef<boolean>(false);
  const [swipeProgress, setSwipeProgress] = useState<number | null>(null);
  const [openedBySwipe, setOpenedBySwipe] = useState<boolean>(false);

  const isDockOpen = !isManuallyCollapsed && (isHovered || isExpanded);

  const isCueActive = showFirstVisitCue && !isDockOpen;

  useEffect(() => {
    if (isDockOpen) {
      try {
        localStorage.setItem(CUE_STORAGE_KEY, 'true');
      } catch (err) {
        void err;
      }
    }
  }, [isDockOpen]);

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

  useEffect(() => {
    const dockEl = dockRef.current;
    if (!dockEl) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const now = performance.now();
      const rawDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      if (now - lastScrollTimeRef.current > 220) {
        scrollAccumulatorRef.current = 0;
      }
      lastScrollTimeRef.current = now;

      scrollAccumulatorRef.current += rawDelta;

      const SCROLL_STEP_THRESHOLD = 35;
      if (Math.abs(scrollAccumulatorRef.current) >= SCROLL_STEP_THRESHOLD) {
        const steps = Math.trunc(scrollAccumulatorRef.current / SCROLL_STEP_THRESHOLD);
        scrollAccumulatorRef.current -= steps * SCROLL_STEP_THRESHOLD;

        const target = Math.max(0, Math.min(sections.length - 1, activeIndex + steps));
        if (target !== activeIndex) {
          onSelectIndex(target);
        }
      }
    };

    dockEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      dockEl.removeEventListener('wheel', handleWheel);
    };
  }, [activeIndex, onSelectIndex, sections.length]);

  const lastToggleTimeRef = useRef<number>(0);

  const isFinePointer = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const handleMouseEnter = () => {
    dismissCue();
    if (!isFinePointer()) return;

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (!isManuallyCollapsed) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isFinePointer()) return;

    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsHovered(false);
      setIsExpanded(false);
      setIsManuallyCollapsed(false);
    }, 180);
  };

  const handleCollapse = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    dismissCue();
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
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [dismissCue]);

  const handleExpand = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    dismissCue();
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
  }, [dismissCue]);

  const toggleDock = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    dismissCue();
    if (e) {
      e.stopPropagation();
    }
    if (isDockOpen) {
      handleCollapse(e);
    } else {
      handleExpand(e);
    }
  }, [isDockOpen, handleCollapse, handleExpand, dismissCue]);

  useEffect(() => {
    if (!isDockOpen) return;

    const handlePointerDownOutside = (e: PointerEvent) => {
      const target = e.target;
      if (!(target instanceof Node)) return;

      const dockEl = dockRef.current;
      if (!dockEl) return;

      const wheelEl = dockEl.querySelector('.turntable-wheel-container');
      const controlBarEl = dockEl.querySelector('.dock-mobile-control-bar');
      const flankingEl = dockEl.querySelector('.disc-flanking-controls');

      const isInsideInteractiveTurntable =
        Boolean(wheelEl?.contains(target)) ||
        Boolean(controlBarEl?.contains(target)) ||
        Boolean(flankingEl?.contains(target));

      if (!isInsideInteractiveTurntable) {
        handleCollapse();
      }
    };

    const timer = window.setTimeout(() => {
      document.addEventListener('pointerdown', handlePointerDownOutside, { capture: true });
    }, 60);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('pointerdown', handlePointerDownOutside, { capture: true });
    };
  }, [isDockOpen, handleCollapse]);

  const handleTouchStart = (e: React.TouchEvent) => {
    dismissCue();
    if (e.touches.length === 1) {
      touchStartYRef.current = e.touches[0].clientY;
      touchStartXRef.current = e.touches[0].clientX;
      touchStartTimeRef.current = performance.now();
      isSwipingUpRef.current = false;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartYRef.current === null) return;
    const currentY = e.touches[0].clientY;
    const currentX = e.touches[0].clientX;
    const deltaY = currentY - touchStartYRef.current;
    const deltaX = Math.abs(currentX - (touchStartXRef.current || currentX));

    if (!isDockOpen) {
      if (deltaY < -2 && Math.abs(deltaY) > deltaX * 0.45) {
        dismissCue();
        isSwipingUpRef.current = true;
        const maxDragDistance = window.innerWidth <= 640 ? 140 : 180;
        const progress = Math.min(1, Math.max(0, -deltaY / maxDragDistance));
        setSwipeProgress(progress);
      }
    } else {
      if (deltaY > 18 && deltaY > deltaX * 0.9) {
        handleCollapse();
        touchStartYRef.current = null;
        touchStartXRef.current = null;
        setSwipeProgress(null);
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
        const isCommitted =
          (swipeProgress !== null && swipeProgress > 0.35) ||
          ((deltaY < -10 && isQuickFlick) || deltaY < -20);

        if (isCommitted && Math.abs(deltaY) > deltaX * 0.45) {
          setOpenedBySwipe(true);
          setSwipeProgress(null);
          handleExpand();
          window.setTimeout(() => setOpenedBySwipe(false), 550);
        } else {
          setSwipeProgress(null);
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
    isSwipingUpRef.current = false;
  };

  const totalCards = sections.length;
  const prevSection = activeIndex > 0 ? sections[activeIndex - 1] : null;
  const nextSection = activeIndex < totalCards - 1 ? sections[activeIndex + 1] : null;

  const dockSwipeStyle: React.CSSProperties | undefined =
    swipeProgress !== null
      ? {
          transform: `translateY(calc((100% - ${window.innerWidth <= 640 ? '60px' : '78px'}) * ${1 - swipeProgress}))`,
          filter: `brightness(${0.48 + swipeProgress * 0.52}) grayscale(${0.4 * (1 - swipeProgress)})`,
          opacity: 0.72 + swipeProgress * 0.28,
          transition: 'none',
        }
      : undefined;

  return (
    <nav
      ref={dockRef}
      className={`turntable-dock ${isDockOpen ? 'is-focused' : 'is-unfocused'} ${isCueActive ? 'has-first-visit-cue' : ''}`}
      style={dockSwipeStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={() => {
        dismissCue();
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
      aria-label={isID ? 'Navigasi Turntable Interaktif' : 'Interactive Circular Turntable Navigation'}
      role="region"
      aria-roledescription="turntable-dock"
    >
      <div className="dock-mobile-control-bar">
        <div className="expand-pill-wrapper">
          {isCueActive && (
            <div className="pill-cue-beacon" aria-hidden="true">
              <span className="pill-cue-ring pill-wave-1" />
              <span className="pill-cue-ring pill-wave-2" />
            </div>
          )}
          <button
            type="button"
            className={`touch-pill-btn ${isDockOpen ? 'touch-collapse-pill' : 'touch-expand-pill'} ${isCueActive ? 'has-cue-glow' : ''}`}
            onClick={toggleDock}
            aria-label={
              isDockOpen
                ? isID
                  ? 'Tutup navigasi turntable'
                  : 'Collapse turntable dock'
                : isID
                  ? 'Buka navigasi turntable'
                  : 'Expand turntable dock'
            }
          >
            {!isDockOpen ? (
              <>
                <span className="expand-pill-arrow" aria-hidden="true">
                  ▴
                </span>
                <span>{isID ? 'Buka' : 'Expand'}</span>
              </>
            ) : (
              <>
                <span>{isID ? 'Tutup' : 'Collapse'}</span>
                <span className="collapse-pill-arrow" aria-hidden="true">
                  ▾
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      <div
        className="turntable-viewport"
        onClick={() => {
          if (!isDockOpen) {
            handleExpand();
          }
        }}
      >
        <DiscEngravedText
          prevSection={prevSection}
          nextSection={nextSection}
          onPrev={onPrev}
          onNext={onNext}
        />

        <TurntableWheel
          activeIndex={activeIndex}
          isDockOpen={isDockOpen}
          swipeProgress={swipeProgress}
          openedBySwipe={openedBySwipe}
          showFirstVisitCue={isCueActive}
          onSelectIndex={onSelectIndex}
          onNext={onNext}
          onPrev={onPrev}
        />
      </div>
    </nav>
  );
};
