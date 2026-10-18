import React, { useEffect, useRef, useState, useMemo } from 'react';
import { TECH_LOGOS, type TechLogo } from '../../data/techLogos';
import '../../styles/heroTechGlows.css';

type SuitType = 'spades' | 'hearts' | 'clubs' | 'diamonds';

const SUIT_CYCLE: SuitType[] = ['spades', 'hearts', 'clubs', 'diamonds'];

const SUIT_GLYPHS: Record<SuitType, string> = {
  spades: '♠',
  hearts: '♥',
  clubs: '♣',
  diamonds: '♦',
};

// Natural deterministic resting rotations (degrees) to simulate cards suspended in zero-gravity
const BASE_ROTATIONS = [
  -8, 11, -5, 9, -12, 6, -14, 10, -7, 12,
  -9, 7, -6, 11, -11, 8, -10, 13, -8, 5,
];

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

interface ParticleState {
  logo: TechLogo;
  suit: SuitType;
  rank: string;
  xPercent: number;
  yPercent: number;
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  baseRot: number;
  currentRot: number;
}

export const HeroTechGlows: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconWrapRefs = useRef<(HTMLElement | null)[]>([]);

  // Randomize logo distribution once on mount
  const randomizedLogos = useMemo(() => shuffleArray(TECH_LOGOS), []);

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  });

  // Track theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      setTheme(current);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  // Persistent micro-card particles initialized deterministically once
  const [initialParticles] = useState<ParticleState[]>(() =>
    ANCHOR_POINTS.map((pt, i) => {
      const logo = randomizedLogos[i % randomizedLogos.length];
      const suit = SUIT_CYCLE[i % SUIT_CYCLE.length];
      const baseRot = BASE_ROTATIONS[i % BASE_ROTATIONS.length];
      const rank = logo.name.charAt(0).toUpperCase();

      return {
        logo,
        suit,
        rank,
        xPercent: pt.xPercent,
        yPercent: pt.yPercent,
        baseX: 0,
        baseY: 0,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        phase: (i * 1.61803398875) % (Math.PI * 2),
        baseRot,
        currentRot: baseRot,
      };
    })
  );

  const particlesRef = useRef<ParticleState[]>(initialParticles);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });

  // Animation and physics loop
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

    // Mouse listener on parent hero
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    let animationFrameId: number;
    const REPEL_RADIUS = 210;

    // Boundary margins to ensure micro-cards and labels never clip
    const PADDING_X = 52;
    const PADDING_TOP = 40;
    const PADDING_BOTTOM = 52;

    const loop = (time: number) => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const particles = particlesRef.current;

      const minX = PADDING_X;
      const maxX = Math.max(minX, width - PADDING_X);
      const minY = PADDING_TOP;
      const maxY = Math.max(minY, height - PADDING_BOTTOM);

      // 1. Calculate distances and determine the single closest card to cursor
      let closestIdx = -1;
      let minDistance = Infinity;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = i;
        }
      }

      if (minDistance > REPEL_RADIUS || mx < -500) {
        closestIdx = -1;
      }

      // 2. Physics & DOM updates for all 20 micro-cards
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const nodeEl = nodeRefs.current[i];
        const iconWrapEl = iconWrapRefs.current[i];
        if (!nodeEl) continue;

        // Ambient gentle floating drift
        const ambX = Math.sin(time * 0.0012 + p.phase) * 6;
        const ambY = Math.cos(time * 0.001 + p.phase) * 6;

        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        let repelX = 0;
        let repelY = 0;

        if (dist < REPEL_RADIUS && mx > -500) {
          const pushForce = Math.pow(1 - dist / REPEL_RADIUS, 1.6) * 26;
          repelX = (dx / dist) * pushForce;
          repelY = (dy / dist) * pushForce;
        }

        // Spring pulling back toward base anchor
        const springX = (p.baseX + ambX - p.x) * 0.07;
        const springY = (p.baseY + ambY - p.y) * 0.07;

        p.vx = (p.vx + springX + repelX) * 0.85;
        p.vy = (p.vy + springY + repelY) * 0.85;

        // Speed cap
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const MAX_SPEED = 9;
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Boundary safety constraint
        if (p.x < minX) {
          p.x = minX;
          p.vx = Math.abs(p.vx) * 0.25;
        } else if (p.x > maxX) {
          p.x = maxX;
          p.vx = -Math.abs(p.vx) * 0.25;
        }

        if (p.y < minY) {
          p.y = minY;
          p.vy = Math.abs(p.vy) * 0.25;
        } else if (p.y > maxY) {
          p.y = maxY;
          p.vy = -Math.abs(p.vy) * 0.25;
        }

        // Dynamic rotation: tilts with horizontal velocity; straightens up when closest
        const isClosest = i === closestIdx;
        const isWithinRadius = dist < REPEL_RADIUS && mx > -500;
        const proximity = isWithinRadius ? Math.max(0, 1 - dist / REPEL_RADIUS) : 0;

        const targetRot = isClosest ? p.baseRot * 0.25 : p.baseRot + p.vx * 1.3;
        p.currentRot += (targetRot - p.currentRot) * 0.12;

        // Scale & opacity
        let scale: number;
        let iconOpacity: number;

        if (isClosest) {
          scale = 1.28;
          iconOpacity = 1.0;
          nodeEl.classList.add('is-closest');
        } else if (isWithinRadius) {
          scale = 1.0 + proximity * 0.15;
          iconOpacity = 0.38 + proximity * 0.52;
          nodeEl.classList.remove('is-closest');
        } else {
          scale = 1.0;
          iconOpacity = theme === 'light' ? 0.42 : 0.28;
          nodeEl.classList.remove('is-closest');
        }

        nodeEl.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) rotate(${p.currentRot.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
        if (iconWrapEl) {
          iconWrapEl.style.opacity = iconOpacity.toFixed(2);
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme]);

  return (
    <div className="hero-tech-glows-canvas" ref={containerRef} aria-hidden="true">
      {initialParticles.map((particle, idx) => {
        const { logo, suit, rank } = particle;
        const isRed = suit === 'hearts' || suit === 'diamonds';
        const suitGlyph = SUIT_GLYPHS[suit];

        return (
          <div
            key={`micro-card-${logo.id}-${idx}`}
            ref={(el) => { nodeRefs.current[idx] = el; }}
            className={`hero-card-node ${isRed ? 'card-suit-red' : 'card-suit-black'}`}
          >
            {/* Gilded Gold Foil Hairline Inner Frame */}
            <span className="micro-card-frame" />

            {/* Top-Left Pip: Rank Initial + Suit */}
            <span className="micro-card-pip pip-tl">
              <span className="micro-pip-rank">{rank}</span>
              <span className="micro-pip-suit">{suitGlyph}</span>
            </span>

            {/* Center Area: Translucent Watermark Suit + SVG Tech Logo */}
            <span className="micro-card-center">
              <span className="micro-card-watermark">{suitGlyph}</span>
              <span
                ref={(el) => { iconWrapRefs.current[idx] = el; }}
                className="micro-card-icon-wrap"
              >
                <svg
                  viewBox={logo.viewBox || '0 0 24 24'}
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d={logo.path} />
                </svg>
              </span>
            </span>

            {/* Bottom-Right Inverted Pip */}
            <span className="micro-card-pip pip-br">
              <span className="micro-pip-rank">{rank}</span>
              <span className="micro-pip-suit">{suitGlyph}</span>
            </span>

            {/* Tooltip Label on Hover / Closest */}
            <div className="hero-glow-label">
              {logo.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};
