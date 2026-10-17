import React, { useState, useEffect, useRef, useCallback } from 'react';
import { portfolioSections } from '../../data/portfolioData';
import { TurntableCard } from './TurntableCard';

interface TurntableWheelProps {
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
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
  onSelectIndex,
  onNext,
  onPrev,
}) => {
  // Screen width responsive radius initialized with window width
  const [radius, setRadius] = useState<number>(() =>
    typeof window !== 'undefined' ? getResponsiveRadius(window.innerWidth) : 410
  );

  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffsetAngle, setDragOffsetAngle] = useState(0);

  const dragStartXRef = useRef<number>(0);
  const dragStartTimeRef = useRef<number>(0);
  const hasMovedSignificantlyRef = useRef<boolean>(false);
  const currentDragAngleRef = useRef<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setRadius(getResponsiveRadius(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Touch and Mouse Drag handlers
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    dragStartXRef.current = clientX;
    dragStartTimeRef.current = performance.now();
    hasMovedSignificantlyRef.current = false;
    currentDragAngleRef.current = 0;
    setDragOffsetAngle(0);
  };

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStartXRef.current;
    if (Math.abs(deltaX) > 4) {
      hasMovedSignificantlyRef.current = true;
    }

    // Convert horizontal pixel drag into rotational degrees
    const angleDelta = (deltaX / radius) * 55;
    currentDragAngleRef.current = angleDelta;
    setDragOffsetAngle(angleDelta);
  }, [isDragging, radius]);

  const handleEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    const deltaAngle = currentDragAngleRef.current;
    const duration = performance.now() - dragStartTimeRef.current;
    const isQuickFlick = duration < 300 && Math.abs(deltaAngle) > 6;

    if (hasMovedSignificantlyRef.current) {
      // Determine snap direction
      if (isQuickFlick || Math.abs(deltaAngle) >= STEP_ANGLE / 2.5) {
        if (deltaAngle < 0) {
          // Dragged left -> roll next card
          onNext();
        } else {
          // Dragged right -> roll prev card
          onPrev();
        }
      }
    }

    // Reset drag angle offset smoothly
    setDragOffsetAngle(0);
    currentDragAngleRef.current = 0;
  }, [isDragging, onNext, onPrev]);

  // Global mouse move & up listeners while dragging
  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX);
    };

    const onMouseUp = () => {
      handleEnd();
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, handleMove, handleEnd]);

  // Visual wheel rotation with custom spring easing
  const wheelVisualRotation = -activeIndex * STEP_ANGLE + dragOffsetAngle;

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
      {/* Physical Disc Surface with subtle grooves and center hub */}
      <div
        className="disc-surface"
        style={{
          transform: `rotate(${wheelVisualRotation}deg)`,
          transition: isDragging ? 'none' : 'transform 0.45s cubic-bezier(0.2, 0.9, 0.2, 1.05)',
        }}
      >
        <div className="disc-groove groove-outer" />
        <div className="disc-groove groove-middle" />
        <div className="disc-groove groove-inner" />
        <div className="disc-groove groove-core" />
        <div className="disc-center-hub" />
      </div>

      {/* Apex indicator mark */}
      <div className="disc-apex-indicator" />

      {/* Radially Mounted Carousel Cards */}
      <div className="turntable-cards-layer">
        {portfolioSections.map((section, idx) => {
          // Calculate shortest circular difference from activeIndex
          let diff = ((idx - activeIndex) % TOTAL_CARDS + TOTAL_CARDS) % TOTAL_CARDS;
          if (diff > TOTAL_CARDS / 2) {
            diff -= TOTAL_CARDS;
          }

          // Net angle includes step angle + dynamic drag offset
          const netAngle = diff * STEP_ANGLE + dragOffsetAngle;
          const absAngle = Math.abs(netAngle);

          // Active card sits at netAngle = 0° (top center, upright)
          const isActive = idx === activeIndex && Math.abs(dragOffsetAngle) < 13;

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
              onClick={() => {
                if (!hasMovedSignificantlyRef.current) {
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
