import React, { useState, useRef, useEffect, useCallback } from 'react';
import '../../styles/heroPortrait.css';

interface HeroPortraitProps {
  imageSrc: string;
  alt: string;
}

const HERO_PORTRAIT_QUOTES = [
  "Pretty handsome guy, ain't he?",
  "Always doing my best.",
  "Delivering goods, all the time.",
  "Learning and improving by the second.",
  "I can be fun too!",
];

export const HeroPortrait: React.FC<HeroPortraitProps> = ({ imageSrc, alt }) => {
  const [isActive, setIsActive] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const typewriterTimerRef = useRef<number | null>(null);
  const autoCloseTimerRef = useRef<number | null>(null);

  const startTyping = useCallback((fullQuote: string) => {
    if (typewriterTimerRef.current) {
      clearInterval(typewriterTimerRef.current);
      typewriterTimerRef.current = null;
    }

    setDisplayedText('');
    setIsTyping(true);

    let charIdx = 0;
    // ~36ms per letter gives an elegant, vintage typewriter pace
    typewriterTimerRef.current = window.setInterval(() => {
      charIdx++;
      setDisplayedText(fullQuote.slice(0, charIdx));

      if (charIdx >= fullQuote.length) {
        if (typewriterTimerRef.current) {
          clearInterval(typewriterTimerRef.current);
          typewriterTimerRef.current = null;
        }
        setIsTyping(false);
      }
    }, 36);
  }, []);

  const closeBubble = useCallback(() => {
    setIsActive(false);
    if (typewriterTimerRef.current) {
      clearInterval(typewriterTimerRef.current);
      typewriterTimerRef.current = null;
    }
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = null;
    }
    setIsTyping(false);
    // Cycle sequentially to the next quote for the next interaction
    setQuoteIndex((prev) => (prev + 1) % HERO_PORTRAIT_QUOTES.length);
  }, []);

  // Desktop hover interactions
  const handleMouseEnter = () => {
    const isDesktop =
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (!isDesktop) return;

    setIsActive(true);
    startTyping(HERO_PORTRAIT_QUOTES[quoteIndex]);
  };

  const handleMouseLeave = () => {
    const isDesktop =
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (!isDesktop) return;

    closeBubble();
  };

  // Mobile / tablet click/tap interaction (and keyboard trigger)
  const handleInteraction = (e?: React.SyntheticEvent) => {
    if (e) {
      e.stopPropagation();
    }

    if (isActive) {
      // If already open, advance immediately to next quote
      if (typewriterTimerRef.current) clearInterval(typewriterTimerRef.current);
      if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);

      const nextIdx = (quoteIndex + 1) % HERO_PORTRAIT_QUOTES.length;
      setQuoteIndex(nextIdx);
      startTyping(HERO_PORTRAIT_QUOTES[nextIdx]);

      autoCloseTimerRef.current = window.setTimeout(() => {
        closeBubble();
      }, 4200);
      return;
    }

    // Open and begin typing
    setIsActive(true);
    startTyping(HERO_PORTRAIT_QUOTES[quoteIndex]);

    autoCloseTimerRef.current = window.setTimeout(() => {
      closeBubble();
    }, 4200);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleInteraction(e);
    } else if (e.key === 'Escape' && isActive) {
      closeBubble();
    }
  };

  // Click outside listener for mobile/tablet
  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (!wrapperRef.current?.contains(target)) {
        closeBubble();
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [isActive, closeBubble]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (typewriterTimerRef.current) clearInterval(typewriterTimerRef.current);
      if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`welcome-hero-image-wrapper ${isActive ? 'is-active' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleInteraction}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-haspopup="dialog"
      aria-expanded={isActive}
      aria-label={`${alt}. Click or hover to reveal quote.`}
    >
      <div className="hero-image-glow" aria-hidden="true" />

      {/* Vintage Speech Bubble pointing to the portrait head */}
      <div
        className={`hero-speech-bubble ${isActive ? 'is-visible' : ''}`}
        aria-live="polite"
        role="status"
      >
        <span className="hero-speech-quote-mark left">“</span>
        <span className="hero-speech-text">{displayedText}</span>
        {isTyping && <span className="hero-speech-cursor" aria-hidden="true">|</span>}
        <span className="hero-speech-quote-mark right">”</span>
      </div>

      <img
        src={imageSrc}
        alt={alt}
        className="welcome-hero-image"
        loading="eager"
      />
    </div>
  );
};
