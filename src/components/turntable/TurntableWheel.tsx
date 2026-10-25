import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getPortfolioSections } from '../../data/portfolioData';
import { useLanguage } from '../../context/LanguageContext';
import { TurntableCard } from './TurntableCard';
import { GearTableSurface } from './GearTableSurface';

interface TurntableWheelProps {
  activeIndex: number;
  isDockOpen: boolean;
  swipeProgress?: number | null;
  openedBySwipe?: boolean;
  showFirstVisitCue?: boolean;
  onSelectIndex: (index: number) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const STEP_ANGLE = 26;
const TOTAL_CARDS = 7;

function getResponsiveRadius(width: number): number {
  if (width <= 640) return 300;
  if (width <= 1024) return 360;
  return 410;
}

export const TurntableWheel: React.FC<TurntableWheelProps> = ({
  activeIndex,
  isDockOpen,
  swipeProgress,
  openedBySwipe,
  showFirstVisitCue,
  onSelectIndex,
}) => {
  const { language } = useLanguage();
  const sections = getPortfolioSections(language);
  const [radius, setRadius] = useState<number>(() =>
    typeof window !== 'undefined' ? getResponsiveRadius(window.innerWidth) : 410
  );

  const [visualIndex, setVisualIndex] = useState<number>(activeIndex);
  const [isIntroSpinning, setIsIntroSpinning] = useState<boolean>(false);
  const [isImmediateReset, setIsImmediateReset] = useState<boolean>(false);

  const [isDragging, setIsDragging] = useState(false);
  const [dragOffsetAngle, setDragOffsetAngle] = useState(0);

  const dragStartXRef = useRef<number>(0);
  const dragStartTimeRef = useRef<number>(0);
  const hasMovedSignificantlyRef = useRef<boolean>(false);
  const currentDragAngleRef = useRef<number>(0);

  const prevDockOpenRef = useRef<boolean>(isDockOpen);
  const introSpinTimerRef = useRef<number | null>(null);
  const resetTimerRef = useRef<number | null>(null);
  const startSpinTimerRef = useRef<number | null>(null);
  const dragRafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setRadius(getResponsiveRadius(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const wasOpen = prevDockOpenRef.current;
    prevDockOpenRef.current = isDockOpen;

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
    if (startSpinTimerRef.current) {
      clearTimeout(startSpinTimerRef.current);
      startSpinTimerRef.current = null;
    }

    if (!wasOpen && isDockOpen) {
      if (openedBySwipe) {
        startSpinTimerRef.current = window.setTimeout(() => {
          setIsImmediateReset(false);
          setIsIntroSpinning(false);
          setVisualIndex(activeIndex);
        }, 0);
      } else if (activeIndex > 0) {
        startSpinTimerRef.current = window.setTimeout(() => {
          setIsImmediateReset(true);
          setIsIntroSpinning(false);
          setVisualIndex(0);

          const spinDuration = Math.min(480 + activeIndex * 85, 950);
          const spinTick = window.setTimeout(() => {
            setIsImmediateReset(false);
            setIsIntroSpinning(true);
            setVisualIndex(activeIndex);

            introSpinTimerRef.current = window.setTimeout(() => {
              setIsIntroSpinning(false);
            }, spinDuration + 40);
          }, 30);

          startSpinTimerRef.current = spinTick;
        }, 0);
      } else {
        startSpinTimerRef.current = window.setTimeout(() => {
          setIsImmediateReset(false);
          setIsIntroSpinning(false);
          setVisualIndex(0);
        }, 0);
      }
    } else if (wasOpen && !isDockOpen) {
      if (introSpinTimerRef.current) {
        clearTimeout(introSpinTimerRef.current);
        introSpinTimerRef.current = null;
      }
      setIsIntroSpinning(false);
      setIsImmediateReset(false);
      setVisualIndex(activeIndex);
    } else {
      startSpinTimerRef.current = window.setTimeout(() => {
        if (introSpinTimerRef.current) {
          clearTimeout(introSpinTimerRef.current);
          introSpinTimerRef.current = null;
        }
        setIsImmediateReset(false);
        setIsIntroSpinning(false);
        setVisualIndex(activeIndex);
      }, 0);
    }
  }, [isDockOpen, activeIndex, openedBySwipe]);

  useEffect(() => {
    return () => {
      if (introSpinTimerRef.current) clearTimeout(introSpinTimerRef.current);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      if (startSpinTimerRef.current) clearTimeout(startSpinTimerRef.current);
      if (dragRafRef.current !== null) cancelAnimationFrame(dragRafRef.current);
    };
  }, []);

  const handleStart = (clientX: number) => {
    if (!isDockOpen) return;

    if (isIntroSpinning) {
      if (introSpinTimerRef.current) {
        clearTimeout(introSpinTimerRef.current);
        introSpinTimerRef.current = null;
      }
      setIsIntroSpinning(false);
      setVisualIndex(activeIndex);
    }

    setIsDragging(true);
    dragStartXRef.current = clientX;
    dragStartTimeRef.current = performance.now();
    hasMovedSignificantlyRef.current = false;
    currentDragAngleRef.current = 0;
    setDragOffsetAngle(0);
  };

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging) return;
      const deltaX = clientX - dragStartXRef.current;
      if (Math.abs(deltaX) > 4) {
        hasMovedSignificantlyRef.current = true;
      }

      const rawAngleDelta = (deltaX / radius) * 85;

      const maxPositiveAngle = activeIndex * STEP_ANGLE;
      const maxNegativeAngle = -(TOTAL_CARDS - 1 - activeIndex) * STEP_ANGLE;

      let angleDelta = rawAngleDelta;
      if (rawAngleDelta > maxPositiveAngle) {
        const overdrag = rawAngleDelta - maxPositiveAngle;
        angleDelta = maxPositiveAngle + overdrag * 0.22;
      } else if (rawAngleDelta < maxNegativeAngle) {
        const overdrag = rawAngleDelta - maxNegativeAngle;
        angleDelta = maxNegativeAngle + overdrag * 0.22;
      }

      currentDragAngleRef.current = angleDelta;
      if (dragRafRef.current === null) {
        dragRafRef.current = requestAnimationFrame(() => {
          setDragOffsetAngle(currentDragAngleRef.current);
          dragRafRef.current = null;
        });
      }
    },
    [isDragging, radius, activeIndex]
  );

  const handleEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    const deltaAngle = currentDragAngleRef.current;
    const duration = performance.now() - dragStartTimeRef.current;
    const velocity = deltaAngle / Math.max(duration, 1);
    const isQuickFlick = duration < 350 && Math.abs(deltaAngle) > 6;

    if (hasMovedSignificantlyRef.current) {
      const momentumAngle = isQuickFlick ? velocity * 140 : 0;
      const effectiveAngle = deltaAngle + momentumAngle;
      const cardsDisplaced = -effectiveAngle / STEP_ANGLE;
      const targetSteps = Math.round(cardsDisplaced);

      if (targetSteps !== 0) {
        const targetIndex = Math.max(0, Math.min(TOTAL_CARDS - 1, activeIndex + targetSteps));
        if (targetIndex !== activeIndex) {
          onSelectIndex(targetIndex);
        }
      }
    }

    if (dragRafRef.current !== null) {
      cancelAnimationFrame(dragRafRef.current);
      dragRafRef.current = null;
    }
    setDragOffsetAngle(0);
    currentDragAngleRef.current = 0;
  }, [isDragging, activeIndex, onSelectIndex]);

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX);
    };

    const onMouseUp = () => {
      handleEnd();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handleMove(e.touches[0].clientX);
      }
    };

    const onTouchEnd = () => {
      handleEnd();
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchcancel', onTouchEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [isDragging, handleMove, handleEnd]);

  const isInteractivelySwiping = swipeProgress !== null && swipeProgress !== undefined;
  const effectiveVisualIndex = isInteractivelySwiping
    ? swipeProgress * activeIndex
    : visualIndex;

  const spinDurationMs = Math.min(480 + activeIndex * 85, 950);
  const spinDurationSec = (spinDurationMs / 1000).toFixed(2);

  let wheelTransition: string;
  let cardTransition: string;

  if (isInteractivelySwiping || isDragging || isImmediateReset) {
    wheelTransition = 'none';
    cardTransition = 'none';
  } else if (isIntroSpinning) {
    wheelTransition = `transform ${spinDurationSec}s cubic-bezier(0.16, 1, 0.3, 1)`;
    cardTransition = `transform ${spinDurationSec}s cubic-bezier(0.16, 1, 0.3, 1), opacity ${(
      (spinDurationMs * 0.7) /
      1000
    ).toFixed(2)}s ease`;
  } else {
    wheelTransition = 'transform 0.45s cubic-bezier(0.2, 0.9, 0.2, 1.05)';
    cardTransition = 'transform 0.45s cubic-bezier(0.2, 0.9, 0.2, 1.05), opacity 0.35s ease';
  }

  const wheelVisualRotation = -effectiveVisualIndex * STEP_ANGLE + dragOffsetAngle;

  return (
    <div
      className={`turntable-wheel-container ${isDragging ? 'is-dragging' : ''}`}
      onMouseDown={(e) => {
        if (e.button === 0) {
          handleStart(e.clientX);
        }
      }}
      onTouchStart={(e) => {
        if (e.touches.length === 1) {
          handleStart(e.touches[0].clientX);
        }
      }}
      onTouchMove={(e) => {
        if (e.touches.length === 1) {
          handleMove(e.touches[0].clientX);
        }
      }}
      onTouchEnd={handleEnd}
      onTouchCancel={handleEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Portfolio Sections Carousel Disc"
    >
      {showFirstVisitCue && !isDockOpen && (
        <div className="turntable-cue-beacon" aria-hidden="true">
          <div className="turntable-cue-ring cue-wave-1" />
          <div className="turntable-cue-ring cue-wave-2" />
          <div className="turntable-cue-ring cue-wave-3" />
        </div>
      )}

      <GearTableSurface
        rotation={wheelVisualRotation}
        transition={wheelTransition}
      />

      <div className="turntable-cards-layer">
        {sections.map((section, idx) => {
          const diff = idx - effectiveVisualIndex;

          const netAngle = diff * STEP_ANGLE + dragOffsetAngle;
          const absAngle = Math.abs(netAngle);

          const isActive =
            idx === activeIndex &&
            !isIntroSpinning &&
            !isInteractivelySwiping &&
            Math.abs(dragOffsetAngle) < 13;

          let scale: number;
          let opacity: number;
          let zIndex: number;

          if (absAngle < 5) {
            scale = 1.0;
            opacity = 1.0;
            zIndex = 10;
          } else if (absAngle <= 30) {
            scale = 0.88;
            opacity = 0.82;
            zIndex = 6;
          } else if (absAngle <= 56) {
            scale = 0.76;
            opacity = 0.55;
            zIndex = 4;
          } else if (absAngle <= 82) {
            scale = 0.65;
            opacity = 0.28;
            zIndex = 2;
          } else {
            scale = 0.6;
            opacity = 0;
            zIndex = 1;
          }

          return (
            <TurntableCard
              key={section.id}
              section={section}
              netAngle={netAngle}
              radius={radius}
              scale={scale}
              opacity={opacity}
              zIndex={zIndex}
              isActive={isActive}
              transition={cardTransition}
              onClick={() => {
                if (!hasMovedSignificantlyRef.current && !isIntroSpinning) {
                  onSelectIndex(idx);
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
