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
  subtitle?: string;
  badge?: string;
  suit?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  suit,
}) => {
  const glyph = suit ? SUIT_GLYPHS[suit] : undefined;
  const isRed = suit ? RED_SUITS.has(suit) : false;
  let letterIndex = 0;

  return (
    <header className="section-header">
      {glyph && (
        <span
          className={`section-suit-stamp ${isRed ? 'stamp-red' : 'stamp-black'}`}
          aria-hidden="true"
        >
          {glyph}
        </span>
      )}
      <h1 className="section-title" aria-label={title.replace(/\s+/g, ' ')}>
        {glyph && (
          <span
            className="section-title-suit"
            aria-hidden="true"
            style={{ color: isRed ? 'var(--accent-color)' : 'var(--text-primary)' }}
          >
            {glyph}
          </span>
        )}
        {title.split('\n').map((line, lineIndex) => (
          <React.Fragment key={`${line}-${lineIndex}`}>
            {lineIndex > 0 && <br />}
            <span className="section-title-line" aria-hidden="true">
              {line.split(/(\s+)/).map((word, wordIndex) => {
                if (/^\s+$/.test(word)) return word;
                if (!word) return null;

                return (
                  <span className="section-title-word" key={`${word}-${wordIndex}`}>
                    {Array.from(word).map((letter) => {
                      const index = letterIndex++;
                      const x = ((index * 67) % 220) - 110;
                      const y = ((index * 41) % 150) - 75;
                      const rotation = ((index * 29) % 80) - 40;
                      const style: React.CSSProperties & {
                        '--deal-x': string;
                        '--deal-y': string;
                        '--deal-rotation': string;
                        '--letter-delay': string;
                      } = {
                        '--deal-x': `${x}px`,
                        '--deal-y': `${y}px`,
                        '--deal-rotation': `${rotation}deg`,
                        '--letter-delay': `${index * 22}ms`,
                      };

                      return (
                        <span
                          className="section-title-card-letter"
                          data-suit={glyph ?? '♦'}
                          key={`${letter}-${index}`}
                          style={style}
                        >
                          {letter}
                        </span>
                      );
                    })}
                  </span>
                );
              })}
            </span>
          </React.Fragment>
        ))}
      </h1>
    </header>
  );
};
