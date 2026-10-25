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
  
  introFlipped?: boolean;
}

const FlipCardLetter: React.FC<FlipCardLetterProps> = ({ char, suit, introFlipped = false }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleMouseEnter = () => {
    clearTimer();
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    clearTimer();
    timerRef.current = window.setTimeout(() => {
      setIsFlipped(false);
      timerRef.current = null;
    }, 500);
  };

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

  const flipped = introFlipped || isFlipped;

  return (
    <span
      className={`card-letter-slot ${flipped ? 'is-flipped' : ''}`}
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
      <span className="card-letter-front" aria-hidden="true">
        {char}
      </span>

      <span
        className={`card-letter-back ${isRed ? 'card-suit-red' : 'card-suit-black'}`}
        aria-hidden="true"
      >
        <span className="mini-card-frame" />

        <span className="mini-pip pip-tl">
          <span className="mini-pip-letter">{char}</span>
          <span className="mini-pip-suit">{suitGlyph}</span>
        </span>

        <span className="mini-card-center">
          <span className="mini-card-watermark">{suitGlyph}</span>
          <span className="mini-card-letter">{char}</span>
        </span>

        <span className="mini-pip pip-br">
          <span className="mini-pip-letter">{char}</span>
          <span className="mini-pip-suit">{suitGlyph}</span>
        </span>
      </span>
    </span>
  );
};

const INTRO_FLIP_HOLD_MS = 500;
const INTRO_STAGGER_MS = 90;

interface FlipCardNameProps {
  name: string;
  suffix?: string;
}

export const FlipCardName: React.FC<FlipCardNameProps> = ({ name, suffix }) => {
  const totalLetters = Array.from(name.replace(/ /g, '')).length;

  const [introFlippedSet, setIntroFlippedSet] = useState<ReadonlySet<number>>(new Set());

  useEffect(() => {
    const timers: number[] = [];

    for (let i = 0; i < totalLetters; i++) {
      timers.push(
        window.setTimeout(() => {
          setIntroFlippedSet((prev) => new Set([...prev, i]));
        }, i * INTRO_STAGGER_MS)
      );

      timers.push(
        window.setTimeout(() => {
          setIntroFlippedSet((prev) => {
            const next = new Set(prev);
            next.delete(i);
            return next;
          });
        }, i * INTRO_STAGGER_MS + INTRO_FLIP_HOLD_MS)
      );
    }

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                const thisIndex = letterCounter;
                letterCounter++;

                return (
                  <FlipCardLetter
                    key={key}
                    char={char}
                    suit={suit}
                    introFlipped={introFlippedSet.has(thisIndex)}
                  />
                );
              })}
              {isLastWord && suffix && <span className="flip-card-suffix">{suffix}</span>}
            </span>
          </React.Fragment>
        );
      })}
    </span>
  );
};
