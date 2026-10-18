import React, { useState, useRef, useEffect, useCallback } from 'react';

type SuitType = 'spades' | 'hearts' | 'clubs' | 'diamonds';

const SUIT_CYCLE: SuitType[] = ['spades', 'hearts', 'clubs', 'diamonds'];

const SUIT_GLYPHS: Record<SuitType, string> = {
  spades: '♠',
  hearts: '♥',
  clubs: '♣',
  diamonds: '♦',
};

interface FlipCardLetterProps {
  char: string;
  suit: SuitType;
}

const FlipCardLetter: React.FC<FlipCardLetterProps> = ({ char, suit }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Desktop mouse enter: flip immediately and cancel any pending flip-back timer
  const handleMouseEnter = () => {
    clearTimer();
    setIsFlipped(true);
  };

  // Desktop mouse leave: pause for about two seconds before flipping back
  const handleMouseLeave = () => {
    clearTimer();
    timerRef.current = window.setTimeout(() => {
      setIsFlipped(false);
      timerRef.current = null;
    }, 500);
  };

  // Phone / Tablet tap (or click): flips to card, pauses for 2 seconds, then automatically flips back
  const handleInteraction = (e?: React.SyntheticEvent) => {
    if (e) {
      e.stopPropagation();
    }
    clearTimer();
    setIsFlipped(true);
    timerRef.current = window.setTimeout(() => {
      setIsFlipped(false);
      timerRef.current = null;
    }, 2000);
  };

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  const isRed = suit === 'hearts' || suit === 'diamonds';
  const suitGlyph = SUIT_GLYPHS[suit];

  return (
    <span
      className={`card-letter-slot ${isFlipped ? 'is-flipped' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleInteraction}
      role="button"
      tabIndex={0}
      aria-label={`Letter ${char}, flip to ${suit} card`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleInteraction(e);
        }
      }}
    >
      {/* Front Face: Natural Letter in Text Flow (Bold Instrument Serif) */}
      <span className="card-letter-front" aria-hidden="true">
        {char}
      </span>

      {/* Back Face: Sleek & Nifty Miniature Casino Playing Card */}
      <span
        className={`card-letter-back ${isRed ? 'card-suit-red' : 'card-suit-black'}`}
        aria-hidden="true"
      >
        {/* Miniature Gold Hairline Inner Frame */}
        <span className="mini-card-frame" />

        {/* Top-Left Corner Pip */}
        <span className="mini-pip pip-tl">
          <span className="mini-pip-letter">{char}</span>
          <span className="mini-pip-suit">{suitGlyph}</span>
        </span>

        {/* Center: Prominent Letter with Watermark Suit */}
        <span className="mini-card-center">
          <span className="mini-card-watermark">{suitGlyph}</span>
          <span className="mini-card-letter">{char}</span>
        </span>

        {/* Bottom-Right Inverted Corner Pip */}
        <span className="mini-pip pip-br">
          <span className="mini-pip-letter">{char}</span>
          <span className="mini-pip-suit">{suitGlyph}</span>
        </span>
      </span>
    </span>
  );
};

interface FlipCardNameProps {
  name: string;
  suffix?: string;
}

export const FlipCardName: React.FC<FlipCardNameProps> = ({ name, suffix }) => {
  const words = name.split(' ');
  let letterCounter = 0;

  return (
    <span className="flip-card-name-root" aria-label={`${name}${suffix || ''}`}>
      {words.map((word, wordIdx) => {
        const letters = Array.from(word);
        const isLastWord = wordIdx === words.length - 1;

        return (
          <React.Fragment key={`word-${wordIdx}`}>
            {wordIdx > 0 && <span className="flip-card-word-space"> </span>}
            <span className="flip-card-word">
              {letters.map((char) => {
                const suitIndex = letterCounter % SUIT_CYCLE.length;
                const suit = SUIT_CYCLE[suitIndex];
                const key = `letter-${letterCounter}-${char}`;
                letterCounter++;

                return <FlipCardLetter key={key} char={char} suit={suit} />;
              })}
              {isLastWord && suffix && <span className="flip-card-suffix">{suffix}</span>}
            </span>
          </React.Fragment>
        );
      })}
    </span>
  );
};
