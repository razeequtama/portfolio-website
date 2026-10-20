import React, { useEffect, useRef, useState, useMemo } from 'react';
import { TECH_LOGOS, type TechLogo } from '../../data/techLogos';
import '../../styles/heroTechGlows.css';

// 20 distinct anchor coordinates (in percentages of the hero section)
// Placed so top vinyls are fully uncropped and bottom vinyls gracefully dissolve in the bottom fade
const ANCHOR_POINTS = [
  // Top row: comfortably below canvas top so discs are never cropped
  { xPercent: 2,   yPercent: 12 }, // Top-left corner
  { xPercent: 25,  yPercent: 15 }, // Top-left-center
  { xPercent: 49,  yPercent: 11 }, // Top-center
  { xPercent: 73,  yPercent: 14 }, // Top-right-center
  { xPercent: 98,  yPercent: 10 }, // Top-right corner

  // Upper-mid perimeter & backdrop
  { xPercent: -1,  yPercent: 32 }, // Left edge
  { xPercent: 22,  yPercent: 36 }, // Left-mid behind text
  { xPercent: 45,  yPercent: 29 }, // Center upper-mid gap
  { xPercent: 68,  yPercent: 34 }, // Mid-gap right
  { xPercent: 101, yPercent: 30 }, // Right edge

  // Lower-mid perimeter & backdrop
  { xPercent: 1,   yPercent: 57 }, // Left edge mid
  { xPercent: 20,  yPercent: 61 }, // Left-mid below bio
  { xPercent: 46,  yPercent: 55 }, // Center lower-mid
  { xPercent: 67,  yPercent: 60 }, // Right-mid below portrait
  { xPercent: 101, yPercent: 58 }, // Right edge mid

  // Bottom row: enters the fading gradient zone where vinyls softly dissolve into transparency
  { xPercent: 3,   yPercent: 86 }, // Bottom-left corner
  { xPercent: 26,  yPercent: 90 }, // Bottom-left-center
  { xPercent: 49,  yPercent: 93 }, // Bottom-center
  { xPercent: 73,  yPercent: 89 }, // Bottom-right-center
  { xPercent: 98,  yPercent: 85 }, // Bottom-right corner
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

interface VinylParticle {
  logo: TechLogo;
  xPercent: number;
  yPercent: number;
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  phase: number;
  spinDuration: number;
  ampX: number;
  ampY: number;
  freqX: number;
  freqY: number;
  variation: 'var-1' | 'var-2';
}

export const HeroTechGlows: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const hoveredIdxRef = useRef<number | null>(null);

  // Randomize logo distribution once on mount
  const randomizedLogos = useMemo(() => shuffleArray(TECH_LOGOS), []);

  // Persistent vinyl particles initialized once
  const [initialParticles] = useState<VinylParticle[]>(() =>
    ANCHOR_POINTS.map((pt, i) => {
      const logo = randomizedLogos[i % randomizedLogos.length];
      // Varied rotation duration for organic turntable feel (16s to 26s)
      const spinDuration = 16 + (i % 5) * 2.5;

      const variation: 'var-1' | 'var-2' = i % 2 === 0 ? 'var-1' : 'var-2';

      // Soft harmonic drift amplitudes and frequencies
      const ampX = 30 + (i % 4) * 5; // 30px to 45px
      const ampY = 24 + (i % 3) * 6; // 24px to 36px
      const freqX = 0.00045 + (i % 3) * 0.0001;
      const freqY = 0.00038 + ((i + 1) % 3) * 0.0001;

      return {
        logo,
        xPercent: pt.xPercent,
        yPercent: pt.yPercent,
        baseX: 0,
        baseY: 0,
        x: 0,
        y: 0,
        phase: (i * 1.61803398875) % (Math.PI * 2),
        spinDuration,
        ampX,
        ampY,
        freqX,
        freqY,
        variation,
      };
    })
  );

  const particlesRef = useRef<VinylParticle[]>(initialParticles);

  // Smooth floating animation loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 1200;
    let height = container.clientHeight || 600;

    const updateBasePositions = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      for (const p of particlesRef.current) {
        const targetX = (p.xPercent / 100) * width;
        const targetY = (p.yPercent / 100) * height;
        p.baseX = targetX;
        p.baseY = targetY;
        if (p.x === 0 && p.y === 0) {
          p.x = targetX;
          p.y = targetY;
        }
      }
    };

    updateBasePositions();

    const resizeObserver = new ResizeObserver(() => {
      updateBasePositions();
    });
    resizeObserver.observe(container);

    let animationFrameId: number;

    const loop = (time: number) => {
      const particles = particlesRef.current;
      const hovered = hoveredIdxRef.current;

      // Generous bounds allowing discs to float off-screen naturally
      const MARGIN_OFFSCREEN = 140;
      const minX = -MARGIN_OFFSCREEN;
      const maxX = width + MARGIN_OFFSCREEN;
      const minY = -MARGIN_OFFSCREEN;
      const maxY = height + MARGIN_OFFSCREEN;

      const isMobile = width <= 640;
      const ampScale = isMobile ? 0.5 : width <= 1024 ? 0.75 : 1.0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const nodeEl = nodeRefs.current[i];
        if (!nodeEl) continue;

        // Smooth harmonic floating drift (gentle, organic zero-gravity float)
        const floatX = (Math.sin(time * p.freqX + p.phase) * p.ampX + Math.cos(time * (p.freqX * 0.55) + p.phase * 1.4) * (p.ampX * 0.4)) * ampScale;
        const floatY = (Math.cos(time * p.freqY + p.phase * 1.1) * p.ampY + Math.sin(time * (p.freqY * 0.6) + p.phase * 0.8) * (p.ampY * 0.35)) * ampScale;

        const targetX = p.baseX + floatX;
        const targetY = p.baseY + floatY;

        // Smooth spring interpolation
        p.x += (targetX - p.x) * 0.05;
        p.y += (targetY - p.y) * 0.05;

        // Bounded within off-screen margins
        p.x = Math.max(minX, Math.min(maxX, p.x));
        p.y = Math.max(minY, Math.min(maxY, p.y));

        const isHovered = i === hovered;
        const scale = isHovered ? 1.10 : 1.0;

        nodeEl.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  const clickTimeoutRef = useRef<number | null>(null);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        window.clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (idx: number) => {
    // Only apply hover state if not on mobile/tablet (desktop with fine pointer)
    const isDesktop =
      typeof window !== 'undefined' &&
      window.innerWidth > 1024 &&
      window.matchMedia('(hover: hover)').matches;

    if (isDesktop) {
      hoveredIdxRef.current = idx;
      setHoveredIdx(idx);
    }
  };

  const handleMouseLeave = () => {
    const isDesktop =
      typeof window !== 'undefined' &&
      window.innerWidth > 1024 &&
      window.matchMedia('(hover: hover)').matches;

    if (isDesktop) {
      hoveredIdxRef.current = null;
      setHoveredIdx(null);
    }
  };

  // On tablet and phone mode: clicking a vinyl animates it, then returns to original display after 1 second
  const handleClick = (idx: number) => {
    const isTabletOrPhone =
      typeof window !== 'undefined' &&
      (window.innerWidth <= 1024 || window.matchMedia('(hover: none)').matches);

    if (isTabletOrPhone) {
      if (clickTimeoutRef.current) {
        window.clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = null;
      }

      hoveredIdxRef.current = idx;
      setHoveredIdx(idx);

      clickTimeoutRef.current = window.setTimeout(() => {
        hoveredIdxRef.current = null;
        setHoveredIdx(null);
        nodeRefs.current[idx]?.blur();
        clickTimeoutRef.current = null;
      }, 1000);
    }
  };

  return (
    <div className="hero-tech-glows-canvas" ref={containerRef}>
      {initialParticles.map((particle, idx) => {
        const { logo, spinDuration, variation } = particle;
        const isHovered = hoveredIdx === idx;

        return (
          <div
            key={`hero-vinyl-${logo.id}-${idx}`}
            ref={(el) => { nodeRefs.current[idx] = el; }}
            className={`hero-vinyl-node ${variation} ${isHovered ? 'is-hovered' : ''}`}
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(idx)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick(idx);
              }
            }}
            onFocus={() => handleMouseEnter(idx)}
            onBlur={handleMouseLeave}
            tabIndex={0}
            role="button"
            aria-label={`Technology: ${logo.name}`}
          >
            {/* Spinning Vinyl Platter with Sound Grooves & Specular Sheen */}
            <div
              className="vinyl-disc-body"
              style={{ animationDuration: `${spinDuration}s` }}
            >
              <div className="vinyl-grooves-ring-1" />
              <div className="vinyl-grooves-ring-2" />
            </div>

            {/* Red Center Record Label Hub with Spindle Hole & Tech SVG Logo */}
            <div className="vinyl-center-label">
              <div className="vinyl-spindle-hole" />
              <div className="vinyl-icon-wrap">
                <svg
                  viewBox={logo.viewBox || '0 0 24 24'}
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d={logo.path} />
                </svg>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
