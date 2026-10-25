import React from 'react';
import type { SectionMeta } from '../../types/portfolio';
import { TurntableCardGraphic } from './TurntableCardGraphic';
import { PlayingCardSuitIcon } from './PlayingCardSuitIcons';
import { isRedSuit, getSuitName } from '../../utils/cardUtils';

interface TurntableCardProps {
  section: SectionMeta;
  netAngle: number;
  radius: number;
  scale: number;
  opacity: number;
  zIndex: number;
  isActive: boolean;
  transition?: string;
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
  transition,
  onClick,
}) => {
  const anchorStyle: React.CSSProperties = {
    transform: `rotate(${netAngle}deg) translateY(-${radius}px) scale(${scale})`,
    opacity,
    zIndex,
    pointerEvents: opacity < 0.1 ? 'none' : 'auto',
    transition: transition || 'transform 0.45s cubic-bezier(0.2, 0.9, 0.2, 1.05), opacity 0.35s ease',
  };

  const suit = section.cardSuit || 'spades';
  const rank = section.cardRank || section.number.replace(/^0/, '');
  const isRed = isRedSuit(suit);
  const suitName = getSuitName(suit);

  return (
    <div className="turntable-card-anchor" style={anchorStyle}>
      <article
        className={`turntable-card playing-card ${isRed ? 'suit-red' : 'suit-black'} ${isActive ? 'is-active' : ''}`}
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-selected={isActive}
        aria-label={`Select ${rank} of ${suitName}: ${section.title}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
      >
        <div className="card-inner-frame" aria-hidden="true" />

        <div className="card-center-watermark" aria-hidden="true">
          <PlayingCardSuitIcon suit={suit} />
        </div>

        <div className="card-corner-pip pip-top-left" aria-hidden="true">
          <span className="pip-rank">{rank}</span>
          <span className="pip-suit">
            <PlayingCardSuitIcon suit={suit} />
          </span>
        </div>

        <div className="turntable-card-body">
          <div className="card-title">{section.title}</div>
          <div className="card-subtitle">{section.subtitle}</div>
        </div>

        <TurntableCardGraphic sectionId={section.id} isActive={isActive} />

        <div className="turntable-card-footer" aria-hidden="true">
          <div className="card-corner-pip pip-bottom-right">
            <span className="pip-rank">{rank}</span>
            <span className="pip-suit">
              <PlayingCardSuitIcon suit={suit} />
            </span>
          </div>
        </div>
      </article>
    </div>
  );
};
