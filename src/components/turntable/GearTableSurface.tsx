import React from 'react';

interface GearTableSurfaceProps {
  rotation: number;
  transition: string;
}

// Procedural 28-Tooth Spur Gear Geometry
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
    const t1 = alpha - 0.22 * delta;
    const t2 = alpha - 0.12 * delta;
    const t3 = alpha + 0.12 * delta;
    const t4 = alpha + 0.22 * delta;

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

    // Left flank: root up to tooth tip
    d += `L ${x2} ${y2} `;
    // Tooth top crest: arc across outer radius
    d += `A ${rOuter} ${rOuter} 0 0 1 ${x3} ${y3} `;
    // Right flank: tooth tip down to root
    d += `L ${x4} ${y4} `;
  }

  // Close arc back to initial root point
  const firstT1 = -Math.PI / 2 - 0.22 * delta;
  const firstX1 = (cx + rRoot * Math.cos(firstT1)).toFixed(2);
  const firstY1 = (cy + rRoot * Math.sin(firstT1)).toFixed(2);
  d += `A ${rRoot} ${rRoot} 0 0 1 ${firstX1} ${firstY1} Z`;

  return d;
}

const NUM_TEETH = 28;
const GEAR_PATH = generateGearPath(500, 500, NUM_TEETH, 492, 448);

// 8 Spoke Lightening Holes (Weight Reduction Cutouts)
const LIGHTENING_HOLES = Array.from({ length: 8 }, (_, i) => {
  const angle = (i * Math.PI) / 4;
  return {
    cx: Number((500 + 305 * Math.cos(angle)).toFixed(2)),
    cy: Number((500 + 305 * Math.sin(angle)).toFixed(2)),
  };
});

// 12 Hub Bolt Studs (Rivets)
const BOLT_STUDS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i * Math.PI) / 6;
  return {
    cx: Number((500 + 155 * Math.cos(angle)).toFixed(2)),
    cy: Number((500 + 155 * Math.sin(angle)).toFixed(2)),
  };
});

// 24 Inner Gauge Radial Ticks
const GAUGE_TICKS = Array.from({ length: 24 }, (_, i) => {
  const angle = (i * Math.PI) / 12;
  return {
    x1: Number((500 + 208 * Math.cos(angle)).toFixed(2)),
    y1: Number((500 + 208 * Math.sin(angle)).toFixed(2)),
    x2: Number((500 + 218 * Math.cos(angle)).toFixed(2)),
    y2: Number((500 + 218 * Math.sin(angle)).toFixed(2)),
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
          {/* Subtle Industrial Machined Metal Radial Gradient */}
          <radialGradient id="gear-surface-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--bg-elevated)" />
            <stop offset="42%" stopColor="var(--turntable-disc-bg)" />
            <stop offset="76%" stopColor="var(--bg-surface)" />
            <stop offset="90%" stopColor="var(--turntable-disc-bg)" />
            <stop offset="100%" stopColor="var(--bg-surface-hover)" />
          </radialGradient>

          {/* Deep Recessed Cutout Shadow Gradient */}
          <radialGradient id="gear-hole-grad" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="rgba(0, 0, 0, 0.55)" />
            <stop offset="100%" stopColor="var(--bg-primary)" />
          </radialGradient>
        </defs>

        {/* 1. Main Outer Cogwheel Gear Body (28 Teeth) */}
        <path
          d={GEAR_PATH}
          fill="url(#gear-surface-grad)"
          stroke="var(--turntable-disc-border)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* 2. Tooth Root Groove Circle */}
        <circle
          cx="500"
          cy="500"
          r="448"
          fill="none"
          stroke="var(--border-subtle)"
          strokeWidth="1.5"
          opacity="0.7"
        />

        {/* 3. Pitch Circle (Engineering Dashed Guide Ring) */}
        <circle
          cx="500"
          cy="500"
          r="426"
          fill="none"
          stroke="var(--accent-color)"
          strokeWidth="1.2"
          strokeDasharray="8 6"
          opacity="0.38"
        />

        {/* 4. Outer Web Rim & Bevel Grooves */}
        <circle
          cx="500"
          cy="500"
          r="388"
          fill="none"
          stroke="var(--border-strong)"
          strokeWidth="2.5"
        />
        <circle
          cx="500"
          cy="500"
          r="374"
          fill="none"
          stroke="var(--turntable-groove)"
          strokeWidth="1.5"
        />

        {/* 5. 8 Spoke Lightening Holes (Mechanical Weight Reduction Cutouts) */}
        {LIGHTENING_HOLES.map((hole, idx) => (
          <g key={`hole-${idx}`}>
            {/* Outer Bevel Ring */}
            <circle
              cx={hole.cx}
              cy={hole.cy}
              r="44"
              fill="none"
              stroke="var(--border-strong)"
              strokeWidth="2.5"
            />
            {/* Dark Recessed Interior */}
            <circle
              cx={hole.cx}
              cy={hole.cy}
              r="40"
              fill="url(#gear-hole-grad)"
            />
            {/* Inner Inset Rim Highlight */}
            <circle
              cx={hole.cx}
              cy={hole.cy}
              r="36"
              fill="none"
              stroke="var(--turntable-groove)"
              strokeWidth="1.5"
            />
            {/* Center Accent Pin */}
            <circle
              cx={hole.cx}
              cy={hole.cy}
              r="3.5"
              fill="var(--accent-color)"
              opacity="0.45"
            />
          </g>
        ))}

        {/* 6. Inner Web Reinforcement Ring */}
        <circle
          cx="500"
          cy="500"
          r="236"
          fill="none"
          stroke="var(--turntable-groove)"
          strokeWidth="1.5"
        />
        <circle
          cx="500"
          cy="500"
          r="222"
          fill="none"
          stroke="var(--border-strong)"
          strokeWidth="2.5"
        />

        {/* 7. Inner Gauge Radial Ticks */}
        {GAUGE_TICKS.map((tick, idx) => (
          <line
            key={`tick-${idx}`}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            stroke="var(--accent-color)"
            strokeWidth="1"
            opacity="0.4"
          />
        ))}

        {/* 8. 12 Hub Bolt Studs (Hex Rivets) */}
        {BOLT_STUDS.map((stud, idx) => (
          <circle
            key={`stud-${idx}`}
            cx={stud.cx}
            cy={stud.cy}
            r="4.5"
            fill="var(--border-strong)"
            stroke="var(--bg-surface)"
            strokeWidth="1"
          />
        ))}

        {/* 9. Heavy Central Axle Hub & Bearing Flange */}
        <circle
          cx="500"
          cy="500"
          r="105"
          fill="var(--bg-surface)"
          stroke="var(--border-strong)"
          strokeWidth="3"
        />
        <circle
          cx="500"
          cy="500"
          r="92"
          fill="var(--bg-elevated)"
          stroke="var(--turntable-groove)"
          strokeWidth="1.5"
        />
        <circle
          cx="500"
          cy="500"
          r="72"
          fill="none"
          stroke="var(--border-strong)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <circle
          cx="500"
          cy="500"
          r="50"
          fill="var(--bg-surface)"
          stroke="var(--accent-color)"
          strokeWidth="2"
        />

        {/* Axle Keyway Slot */}
        <rect
          x="496"
          y="452"
          width="8"
          height="12"
          rx="1.5"
          fill="var(--accent-color)"
          opacity="0.85"
        />

        {/* Center Axle Cap & Glowing Core */}
        <circle
          cx="500"
          cy="500"
          r="24"
          fill="var(--bg-primary)"
          stroke="var(--border-strong)"
          strokeWidth="2"
        />
        <circle
          cx="500"
          cy="500"
          r="8"
          fill="var(--accent-color)"
        />
      </svg>
    </div>
  );
};

