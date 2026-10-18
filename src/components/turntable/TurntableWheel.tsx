import React, { useState, useEffect, useRef, useCallback } from 'react';
import { portfolioSections } from '../../data/portfolioData';
import { TurntableCard } from './TurntableCard';
import { GearTableSurface } from './GearTableSurface';

interface TurntableWheelProps {
  activeIndex: number;
  isDockOpen: boolean;
  swipeProgress?: number | null;
  openedBySwipe?: boolean;
  onSelectIndex: (index: number) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const STEP_ANGLE = 26; // Adjacent cards tilt at ±26° as specified
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
  onSelectIndex,
}) => {
  // Screen width responsive radius initialized with window width
  const [radius, setRadius] = useState<number>(() =>
    typeof window !== 'undefined' ? getResponsiveRadius(window.innerWidth) : 410
  );

  // Visual index for wheel rotation and cards placement
  const [visualIndex, setVisualIndex] = useState<number>(activeIndex);
  const [isIntroSpinning, setIsIntroSpinning] = useState<boolean>(false);
  const [isImmediateReset, setIsImmediateReset] = useState<boolean>(false);

  // Dragging state
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

  useEffect(() => {
    const handleResize = () => {
      setRadius(getResponsiveRadius(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Spin-in animation state machine on dock open & section change
  useEffect(() => {
    const wasOpen = prevDockOpenRef.current;
    prevDockOpenRef.current = isDockOpen;

    // Clear any pending timers
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
    if (startSpinTimerRef.current) {
      clearTimeout(startSpinTimerRef.current);
      startSpinTimerRef.current = null;
    }

    if (!wasOpen && isDockOpen) {
      // DOCK JUST OPENED
      if (openedBySwipe) {
        // User interactively scrubbed from 0 to activeIndex with their swipe gesture:
        // Settle smoothly on activeIndex without triggering redundant timer animation
        startSpinTimerRef.current = window.setTimeout(() => {
          setIsImmediateReset(false);
          setIsIntroSpinning(false);
          setVisualIndex(activeIndex);
        }, 0);
      } else if (activeIndex > 0) {
        // Opened via click/tap (e.g. Expand button or desktop): Animate from Card 01 to activeIndex
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
      // DOCK JUST CLOSED: Retain current active card in collapsed peeking mode
      if (introSpinTimerRef.current) {
        clearTimeout(introSpinTimerRef.current);
        introSpinTimerRef.current = null;
      }
      setIsIntroSpinning(false);
      setIsImmediateReset(false);
      setVisualIndex(activeIndex);
    } else {
      // User navigated to another section (while open or while collapsed)
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

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (introSpinTimerRef.current) clearTimeout(introSpinTimerRef.current);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      if (startSpinTimerRef.current) clearTimeout(startSpinTimerRef.current);
    };
  }, []);

  // Touch and Mouse Drag handlers with linear boundary resistance
  const handleStart = (clientX: number) => {
    if (!isDockOpen) return; // Prevent horizontal card dragging while dock is collapsed

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

      // Convert horizontal pixel drag into rotational degrees
      // Multiplier 85 ensures natural 1:1 swipe across mobile, tablet, and desktop
      const rawAngleDelta = (deltaX / radius) * 85;

      // Linear boundaries relative to activeIndex (cannot drag past Card 01 or Card 07)
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
      setDragOffsetAngle(angleDelta);
    },
    [isDragging, radius, activeIndex]
  );

  const handleEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    const deltaAngle = currentDragAngleRef.current;
    const duration = performance.now() - dragStartTimeRef.current;
    const velocity = deltaAngle / Math.max(duration, 1); // deg/ms
    const isQuickFlick = duration < 350 && Math.abs(deltaAngle) > 6;

    if (hasMovedSignificantlyRef.current) {
      // Calculate how many cards to shift based on drag displacement + flick momentum
      // Notice: dragging left (deltaAngle < 0) moves forward towards higher indices
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

    // Reset drag angle offset smoothly
    setDragOffsetAngle(0);
    currentDragAngleRef.current = 0;
  }, [isDragging, activeIndex, onSelectIndex]);

  // Global mouse & touch listeners while dragging
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

  // Active interactive scrub from Card 0 to activeIndex when swiping up dock
  const isInteractivelySwiping = swipeProgress !== null && swipeProgress !== undefined;
  const effectiveVisualIndex = isInteractivelySwiping
    ? swipeProgress * activeIndex
    : visualIndex;

  // Dynamic synchronized transitions for wheel and cards
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

  // Visual wheel rotation with custom spring easing
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
      {/* Physical Cogwheel Gear Table Surface */}
      <GearTableSurface
        rotation={wheelVisualRotation}
        transition={wheelTransition}
      />

      {/* Radially Mounted Carousel Cards: Strictly Linear Track (01 WELCOME to 07 CONTACT) */}
      <div className="turntable-cards-layer">
        {portfolioSections.map((section, idx) => {
          // Strictly linear offset from effective visualIndex
          const diff = idx - effectiveVisualIndex;

          // Net angle includes step angle + dynamic drag offset
          const netAngle = diff * STEP_ANGLE + dragOffsetAngle;
          const absAngle = Math.abs(netAngle);

          // Active card sits at netAngle = 0° (top center, upright) when not intro spinning/swiping
          const isActive =
            idx === activeIndex &&
            !isIntroSpinning &&
            !isInteractivelySwiping &&
            Math.abs(dragOffsetAngle) < 13;

          // Compute scale, opacity, and zIndex along the perimeter
          let scale: number;
          let opacity: number;
          let zIndex: number;

          if (absAngle < 5) {
            scale = 1.0;
            opacity = 1.0;
            zIndex = 10;
          } else if (absAngle <= 30) {
            // ±26° adjacent cards
            scale = 0.88;
            opacity = 0.82;
            zIndex = 6;
          } else if (absAngle <= 56) {
            // ±52° cards
            scale = 0.76;
            opacity = 0.55;
            zIndex = 4;
          } else if (absAngle <= 82) {
            // ±78° cards
            scale = 0.65;
            opacity = 0.28;
            zIndex = 2;
          } else {
            // Hidden beneath clipping horizon
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
