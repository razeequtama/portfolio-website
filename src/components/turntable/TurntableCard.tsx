import React from 'react';
import type { SectionMeta } from '../../types/portfolio';
import { TurntableCardGraphic } from './TurntableCardGraphic';

interface TurntableCardProps {
  section: SectionMeta;
  netAngle: number;
  radius: number;
  scale: number;
  opacity: number;
  zIndex: number;
  isActive: boolean;
  onClick: () => void;
}

export const TurntableCard: React.FC<TurntableCardProps> = ({
  section,
  netAngle,
  radius,
  scale,
  opacity,
  zIndex,
  isActive,
  onClick,
}) => {
  // Mounting formula: transform: rotate(netAngle) translateY(-radius) scale(scale)
  const anchorStyle: React.CSSProperties = {
    transform: `rotate(${netAngle}deg) translateY(-${radius}px) scale(${scale})`,
    opacity,
    zIndex,
    pointerEvents: opacity < 0.1 ? 'none' : 'auto',
    transition: 'transform 0.45s cubic-bezier(0.2, 0.9, 0.2, 1.05), opacity 0.35s ease',
  };

  return (
    <div className="turntable-card-anchor" style={anchorStyle}>
      <article
        className={`turntable-card ${isActive ? 'is-active' : ''}`}
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-selected={isActive}
        aria-label={`Select ${section.number} ${section.title}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
      >
        {/* Card Header: Number */}
        <div className="turntable-card-header">
          <span className="card-number">{section.number}</span>
        </div>

        {/* Card Body: Clean, Large Title & Expanded Subtitle */}
        <div className="turntable-card-body">
          <div className="card-title">{section.title}</div>
          <div className="card-subtitle">{section.subtitle}</div>
        </div>

        {/* Card Graphic: Section Blueprint Schematic & Visual Terminal */}
        <TurntableCardGraphic sectionId={section.id} isActive={isActive} />
      </article>
    </div>
  );
};
