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

// Adjust colors for light mode so yellows, cyans, and whites have high contrast on light backgrounds
function getEffectiveColor(color: string, isLight: boolean): string {
  const upper = color.toUpperCase();
  if (isLight) {
    if (upper === '#FFFFFF') return '#1e293b';
    if (upper === '#F7DF1E' || upper === '#FCC624') return '#b45309'; // rich amber gold for clear contrast on light
    if (upper === '#61DAFB') return '#0284c7'; // deeper sky-blue for clear contrast on light
  }
  return color;
}

interface ParticleState {
  logo: TechLogo;
  xPercent: number;
  yPercent: number;
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
}

export const HeroTechGlows: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconWrapRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Randomize what logo each glow has JUST ONCE on mount
  const randomizedLogos = useMemo(() => shuffleArray(TECH_LOGOS), []);

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  });

  // Track theme changes for white logo adaptation
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      setTheme(current);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  // Persistent physics particles
  const particlesRef = useRef<ParticleState[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });

  // Initialize particles once
  if (particlesRef.current.length === 0) {
    particlesRef.current = ANCHOR_POINTS.map((pt, i) => {
      const logo = randomizedLogos[i % randomizedLogos.length];
      return {
        logo,
        xPercent: pt.xPercent,
        yPercent: pt.yPercent,
        baseX: 0,
        baseY: 0,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        phase: Math.random() * Math.PI * 2,
      };
    });
  }

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
    const REPEL_RADIUS = 205; // Balanced radius of mouse influence

    // Boundary margins to ensure neither circular glows nor text labels ever get cropped
    const PADDING_X = 62;
    const PADDING_TOP = 38;
    const PADDING_BOTTOM = 48;

    const loop = (time: number) => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const particles = particlesRef.current;

      const minX = PADDING_X;
      const maxX = Math.max(minX, width - PADDING_X);
      const minY = PADDING_TOP;
      const maxY = Math.max(minY, height - PADDING_BOTTOM);

      // 1. Calculate distances and determine the single closest node to cursor
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

      // If closest node is outside the influence radius, no node is active as closest
      if (minDistance > REPEL_RADIUS || mx < -500) {
        closestIdx = -1;
      }

      // 2. Physics & DOM updates for all 20 nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const nodeEl = nodeRefs.current[i];
        const iconWrapEl = iconWrapRefs.current[i];
        if (!nodeEl) continue;

        // Ambient gentle floating drift
        const ambX = Math.sin(time * 0.0012 + p.phase) * 6;
        const ambY = Math.cos(time * 0.001 + p.phase) * 6;

        // Mouse repulsion - toned down aggression for smooth, controlled gliding
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        let repelX = 0;
        let repelY = 0;

        if (dist < REPEL_RADIUS && mx > -500) {
          // Smooth progressive force (toned down from 48 to 26)
          const pushForce = Math.pow(1 - dist / REPEL_RADIUS, 1.6) * 26;
          repelX = (dx / dist) * pushForce;
          repelY = (dy / dist) * pushForce;
        }

        // Spring pulling back toward base anchor with smooth damping
        const springX = (p.baseX + ambX - p.x) * 0.07;
        const springY = (p.baseY + ambY - p.y) * 0.07;

        p.vx = (p.vx + springX + repelX) * 0.85;
        p.vy = (p.vy + springY + repelY) * 0.85;

        // Speed cap to prevent any erratic or aggressive jumps
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const MAX_SPEED = 9;
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Boundary safety constraint: keeps nodes completely inside view bounds
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

        // Visual states: Closest vs Nearby within radius vs Ambient
        const isClosest = i === closestIdx;
        const isWithinRadius = dist < REPEL_RADIUS && mx > -500;
        const proximity = isWithinRadius ? Math.max(0, 1 - dist / REPEL_RADIUS) : 0;

        const isLight = theme === 'light';
        const effectiveColor = getEffectiveColor(p.logo.color, isLight);

        // Scale & translation
        let scale = 1.0;
        let logoOpacity = isLight ? 0.32 : 0.18; // Idle visibility: 0.32 in light mode, 0.18 in dark mode

        if (isClosest) {
          scale = 1.25;
          logoOpacity = 1.0; // prominent & fully visible
          nodeEl.classList.add('is-closest');
          if (isLight) {
            nodeEl.style.boxShadow = `0 4px 18px rgba(0, 0, 0, 0.12), 0 0 28px ${effectiveColor}70, inset 0 0 10px ${effectiveColor}18`;
            nodeEl.style.borderColor = `${effectiveColor}aa`;
            nodeEl.style.background = `#ffffff`;
          } else {
            nodeEl.style.boxShadow = `0 0 32px ${effectiveColor}99, 0 0 65px ${effectiveColor}44, inset 0 0 16px ${effectiveColor}33`;
            nodeEl.style.borderColor = `${effectiveColor}bb`;
            nodeEl.style.background = `radial-gradient(circle, ${effectiveColor}40 0%, ${effectiveColor}14 60%, transparent 75%)`;
          }
        } else if (isWithinRadius) {
          // Around the closest one within radius: softer, but distinctly "there"
          scale = 1.0 + proximity * 0.12;
          nodeEl.classList.remove('is-closest');
          if (isLight) {
            logoOpacity = 0.40 + proximity * 0.44; // 0.40 to 0.84
            const alphaHex = Math.round((0.25 + proximity * 0.4) * 255).toString(16).padStart(2, '0');
            nodeEl.style.boxShadow = `0 2px 10px rgba(0, 0, 0, 0.08), 0 0 ${14 + proximity * 14}px ${effectiveColor}${alphaHex}`;
            nodeEl.style.borderColor = `${effectiveColor}${Math.round((0.35 + proximity * 0.4) * 255).toString(16).padStart(2, '0')}`;
            nodeEl.style.background = `radial-gradient(circle, rgba(255, 255, 255, 0.95) 45%, ${effectiveColor}22 80%, transparent 100%)`;
          } else {
            logoOpacity = 0.28 + proximity * 0.50; // 0.28 to 0.78
            const alphaHex = Math.round((0.2 + proximity * 0.45) * 255).toString(16).padStart(2, '0');
            nodeEl.style.boxShadow = `0 0 ${16 + proximity * 18}px ${effectiveColor}${alphaHex}`;
            nodeEl.style.borderColor = `${effectiveColor}${Math.round((0.25 + proximity * 0.4) * 255).toString(16).padStart(2, '0')}`;
            nodeEl.style.background = `radial-gradient(circle, ${effectiveColor}${Math.round((0.16 + proximity * 0.22) * 255).toString(16).padStart(2, '0')} 0%, transparent 70%)`;
          }
        } else {
          // Ambient resting state
          scale = 1.0;
          nodeEl.classList.remove('is-closest');
          if (isLight) {
            // Light mode idle: frosted circular glass disc with subtle color halo and crisp logo
            logoOpacity = 0.32;
            nodeEl.style.boxShadow = `0 2px 10px rgba(0, 0, 0, 0.06), 0 0 16px ${effectiveColor}36`;
            nodeEl.style.borderColor = `${effectiveColor}48`;
            nodeEl.style.background = `radial-gradient(circle, rgba(255, 255, 255, 0.92) 42%, ${effectiveColor}24 78%, transparent 100%)`;
          } else {
            // Dark mode idle: noticeably more visible (0.18 vs previous 0.04), but NOT SO MUCH to distract
            logoOpacity = 0.18;
            nodeEl.style.boxShadow = `0 0 18px ${effectiveColor}30`;
            nodeEl.style.borderColor = `${effectiveColor}30`;
            nodeEl.style.background = `radial-gradient(circle, ${effectiveColor}28 0%, ${effectiveColor}0e 60%, transparent 72%)`;
          }
        }

        nodeEl.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
        if (iconWrapEl) {
          iconWrapEl.style.opacity = logoOpacity.toFixed(2);
          iconWrapEl.style.color = effectiveColor;
          iconWrapEl.style.transform = isClosest ? 'scale(1.1)' : 'scale(1)';
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
      {particlesRef.current.map((particle, idx) => {
        const { logo } = particle;
        const effectiveColor = getEffectiveColor(logo.color, theme === 'light');

        return (
          <div
            key={logo.id}
            ref={(el) => { nodeRefs.current[idx] = el; }}
            className="hero-glow-node"
          >
            <div
              ref={(el) => { iconWrapRefs.current[idx] = el; }}
              className="hero-glow-icon-wrap"
              style={{ color: effectiveColor }}
            >
              <svg
                viewBox={logo.viewBox || '0 0 24 24'}
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={logo.path} />
              </svg>
            </div>
            <div className="hero-glow-label">
              {logo.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};
