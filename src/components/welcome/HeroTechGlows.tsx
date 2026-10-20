import React, { useEffect, useRef, useState, useMemo } from 'react';
import { TECH_LOGOS, type TechLogo } from '../../data/techLogos';
import '../../styles/heroTechGlows.css';

// 20 distinct anchor coordinates (in percentages of the hero section, with safe boundary margins)
const ANCHOR_POINTS = [
  { xPercent: 10, yPercent: 16 },  // Top-left
  { xPercent: 28, yPercent: 12 },  // Top-left-center
  { xPercent: 48, yPercent: 14 },  // Top-center
  { xPercent: 68, yPercent: 13 },  // Top-right-center
  { xPercent: 88, yPercent: 16 },  // Top-right
  { xPercent: 8,  yPercent: 36 },  // Far left upper-mid
  { xPercent: 26, yPercent: 38 },  // Left-mid behind text
  { xPercent: 46, yPercent: 34 },  // Center upper-mid
  { xPercent: 66, yPercent: 38 },  // Mid-gap right
  { xPercent: 88, yPercent: 35 },  // Far right upper-mid
  { xPercent: 10, yPercent: 60 },  // Far left lower-mid
  { xPercent: 30, yPercent: 64 },  // Left-mid below bio
  { xPercent: 50, yPercent: 58 },  // Center lower-mid
  { xPercent: 70, yPercent: 62 },  // Right-mid below portrait
  { xPercent: 89, yPercent: 57 },  // Far right lower-mid
  { xPercent: 9,  yPercent: 84 },  // Bottom left below buttons
  { xPercent: 28, yPercent: 86 },  // Bottom left-center
  { xPercent: 48, yPercent: 82 },  // Bottom center
  { xPercent: 68, yPercent: 85 },  // Bottom right-center
  { xPercent: 87, yPercent: 80 },  // Bottom right corner
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
      // Varied rotation duration for organic turntable feel (14s to 22s)
      const spinDuration = 14 + (i % 5) * 2;

      const variation: 'var-1' | 'var-2' = i % 2 === 0 ? 'var-1' : 'var-2';

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

    // Safety margins to ensure discs and tooltip badges never clip
    const PADDING_X = 64;
    const PADDING_TOP = 48;
    const PADDING_BOTTOM = 64;

    const loop = (time: number) => {
      const particles = particlesRef.current;
      const hovered = hoveredIdxRef.current;

      const minX = PADDING_X;
      const maxX = Math.max(minX, width - PADDING_X);
      const minY = PADDING_TOP;
      const maxY = Math.max(minY, height - PADDING_BOTTOM);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const nodeEl = nodeRefs.current[i];
        if (!nodeEl) continue;

        // Smooth harmonic floating drift (gentle, organic zero-gravity float)
        const floatX = Math.sin(time * 0.0009 + p.phase) * 11 + Math.cos(time * 0.0005 + p.phase * 1.5) * 5;
        const floatY = Math.cos(time * 0.0007 + p.phase) * 9 + Math.sin(time * 0.0006 + p.phase * 1.2) * 4;

        const targetX = p.baseX + floatX;
        const targetY = p.baseY + floatY;

        // Smooth spring interpolation
        p.x += (targetX - p.x) * 0.06;
        p.y += (targetY - p.y) * 0.06;

        // Boundary containment
        p.x = Math.max(minX, Math.min(maxX, p.x));
        p.y = Math.max(minY, Math.min(maxY, p.y));

        const isHovered = i === hovered;
        const scale = isHovered ? 1.25 : 1.0;

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

  const handleMouseEnter = (idx: number) => {
    hoveredIdxRef.current = idx;
    setHoveredIdx(idx);
  };

  const handleMouseLeave = () => {
    hoveredIdxRef.current = null;
    setHoveredIdx(null);
  };

  return (
    <div className="hero-tech-glows-canvas" ref={containerRef} aria-hidden="true">
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
              <div className="vinyl-grooves-ring" />
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

            {/* Hover Tooltip Badge showing Tech Name */}
            <div className="hero-vinyl-label">
              {logo.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};
