import React from 'react';

interface GearTableSurfaceProps {
  rotation: number;
  transition: string;
}

// Procedural 20-Tooth Bold Cogwheel Geometry (Clean, Industrial, Not overly detailed)
function generateGearPath(
  cx: number,
  cy: number,
  numTeeth: number,
  rOuter: number,
  rRoot: number
): string {
  const delta = (2 * Math.PI) / numTeeth;
  let d = '';

  for (let i = 0; i < numTeeth; i++) {
    const alpha = i * delta - Math.PI / 2;
    const t1 = alpha - 0.23 * delta;
    const t2 = alpha - 0.125 * delta;
    const t3 = alpha + 0.125 * delta;
    const t4 = alpha + 0.23 * delta;

    const x1 = (cx + rRoot * Math.cos(t1)).toFixed(2);
    const y1 = (cy + rRoot * Math.sin(t1)).toFixed(2);
    const x2 = (cx + rOuter * Math.cos(t2)).toFixed(2);
    const y2 = (cy + rOuter * Math.sin(t2)).toFixed(2);
    const x3 = (cx + rOuter * Math.cos(t3)).toFixed(2);
    const y3 = (cy + rOuter * Math.sin(t3)).toFixed(2);
    const x4 = (cx + rRoot * Math.cos(t4)).toFixed(2);
    const y4 = (cy + rRoot * Math.sin(t4)).toFixed(2);

    if (i === 0) {
      d += `M ${x1} ${y1} `;
    } else {
      d += `A ${rRoot} ${rRoot} 0 0 1 ${x1} ${y1} `;
    }

    // Left flank: root up to tooth crest
    d += `L ${x2} ${y2} `;
    // Tooth top land: arc across outer radius
    d += `A ${rOuter} ${rOuter} 0 0 1 ${x3} ${y3} `;
    // Right flank: tooth crest down to root
    d += `L ${x4} ${y4} `;
  }

  // Close arc back to initial root point
  const firstT1 = -Math.PI / 2 - 0.23 * delta;
  const firstX1 = (cx + rRoot * Math.cos(firstT1)).toFixed(2);
  const firstY1 = (cy + rRoot * Math.sin(firstT1)).toFixed(2);
  d += `A ${rRoot} ${rRoot} 0 0 1 ${firstX1} ${firstY1} Z`;

  return d;
}

const NUM_TEETH = 20;
const GEAR_PATH = generateGearPath(500, 500, NUM_TEETH, 492, 442);

// 6 Clean Spoke Openings (Evenly spaced at 60°)
const SPOKE_HOLES = Array.from({ length: 6 }, (_, i) => {
  const angle = (i * Math.PI) / 3;
  return {
    cx: Number((500 + 275 * Math.cos(angle)).toFixed(2)),
    cy: Number((500 + 275 * Math.sin(angle)).toFixed(2)),
  };
});

export const GearTableSurface: React.FC<GearTableSurfaceProps> = ({
  rotation,
  transition,
}) => {
  return (
    <div
      className="gear-table-surface"
      style={{
        transform: `rotate(${rotation}deg)`,
        transition,
      }}
      aria-hidden="true"
    >
      <svg
        className="gear-svg"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle Convex Metal Shading: tactile depth without visual clutter */}
          <radialGradient id="gear-surface-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--bg-elevated)" />
            <stop offset="48%" stopColor="var(--turntable-disc-bg)" />
            <stop offset="82%" stopColor="var(--bg-surface)" />
            <stop offset="93%" stopColor="var(--turntable-disc-bg)" />
            <stop offset="100%" stopColor="var(--bg-surface-hover)" />
          </radialGradient>
        </defs>

        {/* 1. Main 20-Tooth Cogwheel Body */}
        <path
          d={GEAR_PATH}
          fill="url(#gear-surface-grad)"
          stroke="var(--turntable-disc-border)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* 2. Outer Bevel Rim (Defines the teeth rim) */}
        <circle
          cx="500"
          cy="500"
          r="410"
          fill="none"
          stroke="var(--border-strong)"
          strokeWidth="2.5"
          opacity="0.8"
        />

        {/* 3. 6 Clean Spoke Lightening Holes */}
        {SPOKE_HOLES.map((hole, idx) => (
          <g key={`hole-${idx}`}>
            <circle
              cx={hole.cx}
              cy={hole.cy}
              r="46"
              fill="var(--bg-primary)"
              stroke="var(--border-strong)"
              strokeWidth="2.5"
            />
            {/* Subtle inner depth shadow */}
            <circle
              cx={hole.cx}
              cy={hole.cy}
              r="43"
              fill="none"
              stroke="var(--turntable-groove)"
              strokeWidth="1.5"
            />
          </g>
        ))}

        {/* 4. Inner Hub Structural Ring */}
        <circle
          cx="500"
          cy="500"
          r="170"
          fill="none"
          stroke="var(--border-strong)"
          strokeWidth="2.5"
          opacity="0.85"
        />

        {/* 5. Solid Central Hub */}
        <circle
          cx="500"
          cy="500"
          r="92"
          fill="var(--bg-surface)"
          stroke="var(--border-strong)"
          strokeWidth="3"
        />

        {/* 6. Axle Center Collar & Accent Jewel Core */}
        <circle
          cx="500"
          cy="500"
          r="38"
          fill="var(--bg-elevated)"
          stroke="var(--color-gold, var(--accent-color))"
          strokeWidth="2.5"
        />
        <circle
          cx="500"
          cy="500"
          r="14"
          fill="var(--accent-color)"
        />
      </svg>
    </div>
  );
};

