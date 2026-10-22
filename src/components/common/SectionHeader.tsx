import React from 'react';

const SUIT_GLYPHS: Record<string, string> = {
  spades: '♠',
  clubs: '♣',
  hearts: '♥',
  diamonds: '♦',
};

const RED_SUITS = new Set(['hearts', 'diamonds']);

interface SectionHeaderProps {
  number?: string;
  title: string;
  subtitle: string;
  badge?: string;
  suit?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  suit,
}) => {
  const glyph = suit ? SUIT_GLYPHS[suit] : undefined;
  const isRed = suit ? RED_SUITS.has(suit) : false;

  return (
    <header className="section-header">
      {/* Large suit glyph that stamps in and fades to a background watermark */}
      {glyph && (
        <span
          className={`section-suit-stamp ${isRed ? 'stamp-red' : 'stamp-black'}`}
          aria-hidden="true"
        >
          {glyph}
        </span>
      )}
      <h1 className="section-title">
        {glyph && (
          <span
            className="section-title-suit"
            aria-hidden="true"
            style={{ color: isRed ? 'var(--accent-color)' : 'var(--text-primary)' }}
          >
            {glyph}
          </span>
        )}
        {title}
      </h1>
      <p className="section-subtitle">{subtitle}</p>
    </header>
  );
};
