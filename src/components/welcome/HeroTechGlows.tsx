import React, { useEffect, useRef, useState, useMemo } from 'react';
import { TECH_LOGOS, type TechLogo } from '../../data/techLogos';
import '../../styles/heroTechGlows.css';

const ANCHOR_POINTS = [
  { xPercent: 2,   yPercent: 12 },
  { xPercent: 25,  yPercent: 15 },
  { xPercent: 49,  yPercent: 11 },
  { xPercent: 73,  yPercent: 14 },
  { xPercent: 98,  yPercent: 10 },

  { xPercent: -1,  yPercent: 32 },
  { xPercent: 22,  yPercent: 36 },
  { xPercent: 45,  yPercent: 29 },
  { xPercent: 68,  yPercent: 34 },
  { xPercent: 101, yPercent: 30 },

  { xPercent: 1,   yPercent: 57 },
  { xPercent: 20,  yPercent: 61 },
  { xPercent: 46,  yPercent: 55 },
  { xPercent: 67,  yPercent: 60 },
  { xPercent: 101, yPercent: 58 },

  { xPercent: 3,   yPercent: 86 },
  { xPercent: 26,  yPercent: 90 },
  { xPercent: 49,  yPercent: 93 },
  { xPercent: 73,  yPercent: 89 },
  { xPercent: 98,  yPercent: 85 },
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
  pulseStartTime: number;
}

const getHitRadius = (canvasWidth: number): number => {
  if (canvasWidth <= 640) return 46;
  if (canvasWidth <= 1024) return 60;
  return 76;
};

export const HeroTechGlows: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const hoveredIdxRef = useRef<number | null>(null);
  const cursorPosRef = useRef<{ x: number; y: number } | null>(null);

  const randomizedLogos = useMemo(() => shuffleArray(TECH_LOGOS), []);

  const [initialParticles] = useState<VinylParticle[]>(() =>
    ANCHOR_POINTS.map((pt, i) => {
      const logo = randomizedLogos[i % randomizedLogos.length];
      const spinDuration = 16 + (i % 5) * 2.5;

      const variation: 'var-1' | 'var-2' = i % 2 === 0 ? 'var-1' : 'var-2';

      const ampX = 30 + (i % 4) * 5;
      const ampY = 24 + (i % 3) * 6;
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
        pulseStartTime: -1,
      };
    })
  );

  const particlesRef = useRef<VinylParticle[]>(initialParticles);

  const triggerActive = (idx: number) => {
    const p = particlesRef.current[idx];
    if (p) {
      p.pulseStartTime = performance.now();
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 1200;
    let height = container.clientHeight || 600;

    const heroSection = (container.closest('.welcome-hero') as HTMLElement) || container;

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

    const handlePointerMove = (e: PointerEvent) => {
      const isDesktop =
        typeof window !== 'undefined' &&
        window.innerWidth > 1024 &&
        window.matchMedia('(hover: hover) and (pointer: fine)').matches;

      if (!isDesktop) return;

      const target = e.target as HTMLElement | null;
      if (target?.closest('button, a, input, textarea, select, .flip-card-letter, .welcome-hero-image-wrapper')) {
        cursorPosRef.current = null;
        heroSection.style.cursor = '';
        return;
      }

      const rect = container.getBoundingClientRect();
      cursorPosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handlePointerLeave = () => {
      cursorPosRef.current = null;
      heroSection.style.cursor = '';
      hoveredIdxRef.current = null;
      setHoveredIdx(null);
    };

    const handleHeroClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('button, a, input, textarea, select, .flip-card-letter, .welcome-hero-image-wrapper')) {
        return;
      }

      const rect = container.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      const hitRadius = getHitRadius(width);
      const radiusSq = hitRadius * hitRadius;

      let hitIdx: number | null = null;
      let minDistSq = radiusSq;

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const dx = cx - particles[i].x;
        const dy = cy - particles[i].y;
        const d2 = dx * dx + dy * dy;
        if (d2 < minDistSq) {
          minDistSq = d2;
          hitIdx = i;
        }
      }

      if (hitIdx !== null) {
        triggerActive(hitIdx);
      }
    };

    heroSection.addEventListener('pointermove', handlePointerMove);
    heroSection.addEventListener('pointerleave', handlePointerLeave);
    heroSection.addEventListener('click', handleHeroClick);
    window.addEventListener('blur', handlePointerLeave);

    let animationFrameId: number;

    const loop = (time: number) => {
      const particles = particlesRef.current;

      const isDesktop =
        width > 1024 && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

      let hitIdx: number | null = null;

      if (cursorPosRef.current && isDesktop) {
        const { x: cx, y: cy } = cursorPosRef.current;
        const hitRadius = getHitRadius(width);
        let minDistSq = hitRadius * hitRadius;

        for (let i = 0; i < particles.length; i++) {
          const dx = cx - particles[i].x;
          const dy = cy - particles[i].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < minDistSq) {
            minDistSq = d2;
            hitIdx = i;
          }
        }
      }

      if (hitIdx !== hoveredIdxRef.current) {
        if (hitIdx !== null) {
          particles[hitIdx].pulseStartTime = time;
        }
        hoveredIdxRef.current = hitIdx;
        setHoveredIdx(hitIdx);
        heroSection.style.cursor = hitIdx !== null ? 'pointer' : '';
      }

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

        const floatX = (Math.sin(time * p.freqX + p.phase) * p.ampX + Math.cos(time * (p.freqX * 0.55) + p.phase * 1.4) * (p.ampX * 0.4)) * ampScale;
        const floatY = (Math.cos(time * p.freqY + p.phase * 1.1) * p.ampY + Math.sin(time * (p.freqY * 0.6) + p.phase * 0.8) * (p.ampY * 0.35)) * ampScale;

        const targetX = p.baseX + floatX;
        const targetY = p.baseY + floatY;

        p.x += (targetX - p.x) * 0.05;
        p.y += (targetY - p.y) * 0.05;

        p.x = Math.max(minX, Math.min(maxX, p.x));
        p.y = Math.max(minY, Math.min(maxY, p.y));

        let pulseScale = 0;
        if (p.pulseStartTime > 0) {
          const elapsed = time - p.pulseStartTime;
          const PULSE_DURATION = 380;
          if (elapsed >= 0 && elapsed < PULSE_DURATION) {
            const progress = elapsed / PULSE_DURATION;
            pulseScale = Math.sin(progress * Math.PI) * 0.12;
          } else {
            p.pulseStartTime = -1;
          }
        }

        const scale = 1.0 + pulseScale;
        const opacity = (0.19 + pulseScale * 0.75).toFixed(2);

        nodeEl.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
        nodeEl.style.opacity = opacity;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      heroSection.removeEventListener('pointermove', handlePointerMove);
      heroSection.removeEventListener('pointerleave', handlePointerLeave);
      heroSection.removeEventListener('click', handleHeroClick);
      window.removeEventListener('blur', handlePointerLeave);
      heroSection.style.cursor = '';
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

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
            onClick={(e) => {
              e.stopPropagation();
              triggerActive(idx);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                triggerActive(idx);
              }
            }}
            onFocus={() => {
              hoveredIdxRef.current = idx;
              setHoveredIdx(idx);
            }}
            onBlur={() => {
              hoveredIdxRef.current = null;
              setHoveredIdx(null);
            }}
            tabIndex={0}
            role="button"
            aria-label={`Technology: ${logo.name}`}
          >
            <div
              className="vinyl-disc-body"
              style={{ animationDuration: `${spinDuration}s` }}
            >
              <div className="vinyl-grooves-ring-1" />
              <div className="vinyl-grooves-ring-2" />
            </div>

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
