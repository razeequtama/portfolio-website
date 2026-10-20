import React, { useEffect, useRef, useState, useMemo } from 'react';
import { TECH_LOGOS, type TechLogo } from '../../data/techLogos';
import '../../styles/heroTechGlows.css';

// 20 distinct anchor coordinates (in percentages of the hero section)
// Placed so vinyls float across the canvas and naturally glide partially or fully off screen
const ANCHOR_POINTS = [
  // Top perimeter (float in and out of the top edge & corners)
  { xPercent: 2,   yPercent: 4  }, // Top-left corner / glides partially off-screen
  { xPercent: 25,  yPercent: 7  }, // Top-left-center
  { xPercent: 49,  yPercent: 3  }, // Top-center / glides past top
  { xPercent: 73,  yPercent: 6  }, // Top-right-center
  { xPercent: 98,  yPercent: 2  }, // Top-right corner / glides partially off-screen

  // Upper-mid perimeter & backdrop
  { xPercent: -1,  yPercent: 28 }, // Left edge / glides off left
  { xPercent: 22,  yPercent: 33 }, // Left-mid behind text
  { xPercent: 45,  yPercent: 26 }, // Center upper-mid gap
  { xPercent: 68,  yPercent: 32 }, // Mid-gap right
  { xPercent: 101, yPercent: 27 }, // Right edge / glides off right

  // Lower-mid perimeter & backdrop
  { xPercent: 1,   yPercent: 56 }, // Left edge mid / glides off left
  { xPercent: 20,  yPercent: 60 }, // Left-mid below bio
  { xPercent: 46,  yPercent: 54 }, // Center lower-mid
  { xPercent: 67,  yPercent: 59 }, // Right-mid below portrait
  { xPercent: 101, yPercent: 57 }, // Right edge mid / glides off right

  // Bottom perimeter (float in and out of the bottom edge & corners)
  { xPercent: 3,   yPercent: 88 }, // Bottom-left corner / glides partially off-screen
  { xPercent: 26,  yPercent: 93 }, // Bottom-left-center
  { xPercent: 49,  yPercent: 97 }, // Bottom-center / glides past bottom
  { xPercent: 73,  yPercent: 91 }, // Bottom-right-center
  { xPercent: 98,  yPercent: 86 }, // Bottom-right corner / glides partially off-screen
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

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const nodeEl = nodeRefs.current[i];
        if (!nodeEl) continue;

        // Smooth harmonic floating drift (gentle, organic zero-gravity float)
        const floatX = Math.sin(time * p.freqX + p.phase) * p.ampX + Math.cos(time * (p.freqX * 0.55) + p.phase * 1.4) * (p.ampX * 0.4);
        const floatY = Math.cos(time * p.freqY + p.phase * 1.1) * p.ampY + Math.sin(time * (p.freqY * 0.6) + p.phase * 0.8) * (p.ampY * 0.35);

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

        if (isHovered) {
          // If hovered near screen edges, shift tooltip horizontally to keep it cleanly in view
          let shiftX = 0;
          if (p.x < 70) shiftX = Math.round(70 - p.x);
          else if (p.x > width - 70) shiftX = Math.round((width - 70) - p.x);
          nodeEl.style.setProperty('--label-shift-x', `${shiftX}px`);

          // If hovered near bottom of container, flip tooltip above the vinyl
          if (p.y > height - 130) {
            nodeEl.classList.add('tooltip-top');
          } else {
            nodeEl.classList.remove('tooltip-top');
          }
        }
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
