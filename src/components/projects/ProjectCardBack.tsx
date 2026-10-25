import React from 'react';
import type { ProjectItem } from '../../types/portfolio';
import type { ProjectCardBackMeta } from '../../utils/cardUtils';
import { PlayingCardSuitIcon } from '../turntable/PlayingCardSuitIcons';

interface ProjectCardBackProps {
  project: ProjectItem;
  meta: ProjectCardBackMeta;
  onReveal?: () => void;
}

export const ProjectCardBack: React.FC<ProjectCardBackProps> = ({
  project,
  meta,
  onReveal,
}) => {
  const maskId = `medallion-mask-${project.id}`;
  const patternId = `guilloche-pat-${project.id}`;
  const goldGradId = `gold-foil-${project.id}`;
  const pathTopId = `medallion-text-top-${project.id}`;
  const pathBottomId = `medallion-text-bottom-${project.id}`;

  return (
    <div
      className={`project-card-back card-collector-back ${meta.isRed ? 'is-red-suit' : 'is-black-suit'}`}
      onClick={onReveal}
      role="button"
      tabIndex={0}
      aria-label={`Playing card back for ${project.title}.`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onReveal?.();
        }
      }}
    >
      {/* Dynamic Foil Sheen Sweep across Card Face */}
      <div className="card-back-foil-sweep" aria-hidden="true" />

      {/* SVG Vector Guilloché & Gilded Engraving Framework */}
      <svg
        className="card-back-guilloche-svg"
        viewBox="0 0 340 540"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Metallic Gold Foil Linear Gradient */}
          <linearGradient id={goldGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5d77f" />
            <stop offset="35%" stopColor="#d4af37" />
            <stop offset="70%" stopColor="#aa820a" />
            <stop offset="100%" stopColor="#e8c252" />
          </linearGradient>

          {/* Micro-Diamond Guilloché Pattern */}
          <pattern
            id={patternId}
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M10 0 L20 10 L10 20 L0 10 Z"
              stroke="currentColor"
              strokeWidth="0.65"
              className="guilloche-stroke-primary"
            />
            <circle
              cx="10"
              cy="10"
              r="0.9"
              fill="currentColor"
              className="guilloche-dot"
            />
            <path
              d="M0 0 L20 20 M20 0 L0 20"
              stroke="currentColor"
              strokeWidth="0.35"
              className="guilloche-stroke-secondary"
            />
          </pattern>

          {/* Mask to keep center medallion clean of background grid */}
          <mask id={maskId}>
            <rect width="340" height="540" fill="#ffffff" />
            <circle cx="170" cy="216" r="72" fill="#000000" />
          </mask>

          {/* Circular Text Paths for the Central Seal */}
          <path
            id={pathTopId}
            d="M 102,216 A 68,68 0 1,1 238,216"
            fill="none"
          />
          <path
            id={pathBottomId}
            d="M 242,216 A 68,68 0 0,1 102,216"
            fill="none"
          />
        </defs>

        {/* Outer Gilded Hairline Border */}
        <rect
          x="12"
          y="12"
          width="316"
          height="516"
          rx="12"
          stroke={`url(#${goldGradId})`}
          strokeWidth="1.2"
          className="card-border-outer"
        />

        {/* Secondary Delicate Beaded Frame */}
        <rect
          x="18"
          y="18"
          width="304"
          height="504"
          rx="9"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="4 3"
          className="card-border-dashed"
        />

        {/* Third Inner Solid Hairline Frame */}
        <rect
          x="23"
          y="23"
          width="294"
          height="494"
          rx="7"
          stroke={`url(#${goldGradId})`}
          strokeWidth="0.65"
          className="card-border-inner"
        />

        {/* Guilloché Lattice Background Field (masked around medallion) */}
        <rect
          x="24"
          y="24"
          width="292"
          height="492"
          rx="6"
          fill={`url(#${patternId})`}
          mask={`url(#${maskId})`}
        />

        {/* Four Ornate Victorian / Casino Corner Flourishes */}
        {/* Top-Left */}
        <g className="corner-flourish">
          <path
            d="M12 38 C12 24 24 12 38 12 M12 26 C20 26 26 20 26 12"
            stroke={`url(#${goldGradId})`}
            strokeWidth="1"
          />
          <circle cx="28" cy="28" r="2.2" fill={`url(#${goldGradId})`} />
        </g>
        {/* Top-Right */}
        <g className="corner-flourish">
          <path
            d="M328 38 C328 24 316 12 302 12 M328 26 C320 26 314 20 314 12"
            stroke={`url(#${goldGradId})`}
            strokeWidth="1"
          />
          <circle cx="312" cy="28" r="2.2" fill={`url(#${goldGradId})`} />
        </g>
        {/* Bottom-Left */}
        <g className="corner-flourish">
          <path
            d="M12 502 C12 516 24 528 38 528 M12 514 C20 514 26 520 26 528"
            stroke={`url(#${goldGradId})`}
            strokeWidth="1"
          />
          <circle cx="28" cy="512" r="2.2" fill={`url(#${goldGradId})`} />
        </g>
        {/* Bottom-Right */}
        <g className="corner-flourish">
          <path
            d="M328 502 C328 516 316 528 302 528 M328 514 C320 514 314 520 314 528"
            stroke={`url(#${goldGradId})`}
            strokeWidth="1"
          />
          <circle cx="312" cy="512" r="2.2" fill={`url(#${goldGradId})`} />
        </g>

        {/* Central Medallion Architecture (Center: 170, 216) */}
        <g className="central-medallion-group">
          {/* Outer Plaque Base */}
          <circle
            cx="170"
            cy="216"
            r="70"
            className="medallion-base"
            stroke={`url(#${goldGradId})`}
            strokeWidth="1.5"
          />

          {/* Beaded Ring */}
          <circle
            cx="170"
            cy="216"
            r="66"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="2 3.5"
            className="medallion-bead-ring"
          />

          {/* Engraved Circular Typography: Top Path */}
          <text
            className="medallion-text"
            fontSize="6.5"
            fontFamily="var(--font-mono)"
            fontWeight="600"
            letterSpacing="2.2"
            fill={`url(#${goldGradId})`}
          >
            <textPath href={`#${pathTopId}`} startOffset="50%" textAnchor="middle">
              THE CARD COLLECTOR ARCHIVE
            </textPath>
          </text>

          {/* Engraved Circular Typography: Bottom Path */}
          <text
            className="medallion-text"
            fontSize="6.5"
            fontFamily="var(--font-mono)"
            fontWeight="600"
            letterSpacing="2.2"
            fill={`url(#${goldGradId})`}
          >
            <textPath href={`#${pathBottomId}`} startOffset="50%" textAnchor="middle">
              RAZIQ UTAMA • SPEC 2024
            </textPath>
          </text>

          {/* Inner Medallion Border */}
          <circle
            cx="170"
            cy="216"
            r="46"
            fill="none"
            stroke={`url(#${goldGradId})`}
            strokeWidth="1"
            className="medallion-inner-rim"
          />
          <circle
            cx="170"
            cy="216"
            r="42"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="1.5 2.5"
            className="medallion-inner-beads"
          />

          {/* Radiating Compass / Sunburst Rays */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="170"
              y1="172"
              x2="170"
              y2="177"
              transform={`rotate(${deg} 170 216)`}
              stroke={`url(#${goldGradId})`}
              strokeWidth="0.75"
              strokeOpacity="0.45"
            />
          ))}

          {/* Inner Medallion Center Shield Fill */}
          <circle
            cx="170"
            cy="216"
            r="38"
            className="medallion-core-circle"
          />
        </g>
      </svg>

      {/* Top-Left Corner Pip */}
      <div className="card-back-pip card-back-pip-tl" aria-hidden="true">
        <span className="pip-rank">{meta.rank}</span>
        <span className="pip-suit">
          <PlayingCardSuitIcon suit={meta.suit} />
        </span>
      </div>

      {/* Center Seal Core: Large Emblem & Roman Numeral */}
      <div className="medallion-html-core" aria-hidden="true">
        <div className={`medallion-suit-glyph suit-${meta.suit}`}>
          <PlayingCardSuitIcon suit={meta.suit} />
        </div>
        <div className="medallion-roman-numeral">
          <span className="roman-star">✦</span>
          <span className="roman-text">{meta.roman}</span>
          <span className="roman-star">✦</span>
        </div>
      </div>

      {/* Prominent, Grand Project Title Display */}
      <div className="card-back-title-section" aria-hidden="true">
        <div className="card-back-title-divider">
          <span className="divider-flourish" />
          <span className="divider-star">✦</span>
          <span className="divider-flourish" />
        </div>

        <h3 className="card-back-project-title">{project.title}</h3>

        <div className="card-back-project-subtitle">
          {project.category.toUpperCase()} • EDITION {meta.number}
        </div>
      </div>

      {/* Bottom-Right Inverted Corner Pip */}
      <div className="card-back-pip card-back-pip-br" aria-hidden="true">
        <span className="pip-rank">{meta.rank}</span>
        <span className="pip-suit">
          <PlayingCardSuitIcon suit={meta.suit} />
        </span>
      </div>
    </div>
  );
};
