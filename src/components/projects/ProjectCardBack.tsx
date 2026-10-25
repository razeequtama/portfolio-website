import React from 'react';
import type { PlayingCardSuit, ProjectItem } from '../../types/portfolio';
import type { ProjectCardBackMeta } from '../../utils/cardUtils';
import { PlayingCardSuitIcon } from '../turntable/PlayingCardSuitIcons';

interface ProjectCardBackProps {
  project: ProjectItem;
  meta: ProjectCardBackMeta;
  onReveal?: () => void;
}

const SUIT_PATHS: Record<PlayingCardSuit, string> = {
  spades:
    'M12 2.5 C16 8 20.5 12 20.5 15.5 C20.5 18.5 17.5 20.5 14.5 19.5 C13.5 19.1 12.8 18.3 12.4 17.5 C12.8 19 13.8 20.5 15.5 22 L8.5 22 C10.2 20.5 11.2 19 11.6 17.5 C11.2 18.3 10.5 19.1 9.5 19.5 C6.5 20.5 3.5 18.5 3.5 15.5 C3.5 12 8 8 12 2.5 Z',
  hearts:
    'M12 21.35 L10.55 20.03 C5.4 15.36 2 12.28 2 8.5 C2 5.42 4.42 3 7.5 3 C9.24 3 10.91 3.81 12 5.09 C13.09 3.81 14.76 3 16.5 3 C19.58 3 22 5.42 22 8.5 C22 12.28 18.6 15.36 13.45 20.04 L12 21.35 Z',
  diamonds:
    'M12 2.5 L20 12 L12 21.5 L4 12 Z',
  clubs:
    'M12 2.5 A 3.8 3.8 0 0 0 8.2 6.3 C 8.2 6.9 8.35 7.5 8.6 8 A 4.2 4.2 0 0 0 4.5 12.2 A 4.2 4.2 0 0 0 8.7 16.4 C 9.6 16.4 10.4 16.1 11 15.6 C 10.7 16.9 9.9 19.2 8.5 22 L 15.5 22 C 14.1 19.2 13.3 16.9 13 15.6 C 13.6 16.1 14.4 16.4 15.3 16.4 A 4.2 4.2 0 0 0 19.5 12.2 A 4.2 4.2 0 0 0 15.4 8 C 15.65 7.5 15.8 6.9 15.8 6.3 A 3.8 3.8 0 0 0 12 2.5 Z',
};

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
      <div className="card-back-foil-sweep" aria-hidden="true" />

      <svg
        className="card-back-guilloche-svg"
        viewBox="0 0 340 540"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={goldGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5d77f" />
            <stop offset="35%" stopColor="#d4af37" />
            <stop offset="70%" stopColor="#aa820a" />
            <stop offset="100%" stopColor="#e8c252" />
          </linearGradient>

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

          <mask id={maskId}>
            <rect width="340" height="540" fill="#ffffff" />
            <circle cx="170" cy="216" r="72" fill="#000000" />
          </mask>

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

        <rect
          x="24"
          y="24"
          width="292"
          height="492"
          rx="6"
          fill={`url(#${patternId})`}
          mask={`url(#${maskId})`}
        />

        <g className="corner-flourish">
          <path
            d="M12 38 C12 24 24 12 38 12 M12 26 C20 26 26 20 26 12"
            stroke={`url(#${goldGradId})`}
            strokeWidth="1"
          />
          <circle cx="28" cy="28" r="2.2" fill={`url(#${goldGradId})`} />
        </g>
        <g className="corner-flourish">
          <path
            d="M328 38 C328 24 316 12 302 12 M328 26 C320 26 314 20 314 12"
            stroke={`url(#${goldGradId})`}
            strokeWidth="1"
          />
          <circle cx="312" cy="28" r="2.2" fill={`url(#${goldGradId})`} />
        </g>
        <g className="corner-flourish">
          <path
            d="M12 502 C12 516 24 528 38 528 M12 514 C20 514 26 520 26 528"
            stroke={`url(#${goldGradId})`}
            strokeWidth="1"
          />
          <circle cx="28" cy="512" r="2.2" fill={`url(#${goldGradId})`} />
        </g>
        <g className="corner-flourish">
          <path
            d="M328 502 C328 516 316 528 302 528 M328 514 C320 514 314 520 314 528"
            stroke={`url(#${goldGradId})`}
            strokeWidth="1"
          />
          <circle cx="312" cy="512" r="2.2" fill={`url(#${goldGradId})`} />
        </g>

        <g className="central-medallion-group">
          <circle
            cx="170"
            cy="216"
            r="70"
            className="medallion-base"
            stroke={`url(#${goldGradId})`}
            strokeWidth="1.5"
          />

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

          <circle
            cx="170"
            cy="216"
            r="38"
            className="medallion-core-circle"
          />
        </g>
        <g className="card-back-svg-pip card-back-svg-pip-tl">
          <rect
            x="26"
            y="26"
            width="28"
            height="50"
            rx="6"
            className="svg-pip-backdrop"
          />
          <text
            x="40"
            y="47"
            textAnchor="middle"
            className="svg-pip-rank"
          >
            {meta.rank}
          </text>
          <g transform="translate(33, 53) scale(0.58)">
            <path
              d={SUIT_PATHS[meta.suit]}
              className="svg-pip-suit"
            />
          </g>
        </g>

        <g
          className="card-back-svg-pip card-back-svg-pip-br"
          transform="rotate(180 170 270)"
        >
          <rect
            x="26"
            y="26"
            width="28"
            height="50"
            rx="6"
            className="svg-pip-backdrop"
          />
          <text
            x="40"
            y="47"
            textAnchor="middle"
            className="svg-pip-rank"
          >
            {meta.rank}
          </text>
          <g transform="translate(33, 53) scale(0.58)">
            <path
              d={SUIT_PATHS[meta.suit]}
              className="svg-pip-suit"
            />
          </g>
        </g>
      </svg>

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

      <div className="card-back-title-section" aria-hidden="true">
        <div className="card-back-title-divider">
          <span className="divider-flourish" />
          <span className="divider-star">✦</span>
          <span className="divider-flourish" />
        </div>

        <h3 className="card-back-project-title">{project.title}</h3>

      </div>

      </div>
  );
};
