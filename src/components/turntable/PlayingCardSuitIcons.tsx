import React from 'react';
import type { PlayingCardSuit } from '../../types/portfolio';

interface SuitIconProps {
  className?: string;
}

export const SpadeIcon: React.FC<SuitIconProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1em"
    height="1em"
    aria-hidden="true"
  >
    <path d="M12 2.5 C16 8 20.5 12 20.5 15.5 C20.5 18.5 17.5 20.5 14.5 19.5 C13.5 19.1 12.8 18.3 12.4 17.5 C12.8 19 13.8 20.5 15.5 22 L8.5 22 C10.2 20.5 11.2 19 11.6 17.5 C11.2 18.3 10.5 19.1 9.5 19.5 C6.5 20.5 3.5 18.5 3.5 15.5 C3.5 12 8 8 12 2.5 Z" />
  </svg>
);

export const HeartIcon: React.FC<SuitIconProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1em"
    height="1em"
    aria-hidden="true"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export const DiamondIcon: React.FC<SuitIconProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1em"
    height="1em"
    aria-hidden="true"
  >
    <path d="M12 2.5 L20 12 L12 21.5 L4 12 Z" />
  </svg>
);

export const ClubIcon: React.FC<SuitIconProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    width="1em"
    height="1em"
    aria-hidden="true"
  >
    <path d="M12 2.5 A 3.8 3.8 0 0 0 8.2 6.3 C 8.2 6.9 8.35 7.5 8.6 8 A 4.2 4.2 0 0 0 4.5 12.2 A 4.2 4.2 0 0 0 8.7 16.4 C 9.6 16.4 10.4 16.1 11 15.6 C 10.7 16.9 9.9 19.2 8.5 22 L 15.5 22 C 14.1 19.2 13.3 16.9 13 15.6 C 13.6 16.1 14.4 16.4 15.3 16.4 A 4.2 4.2 0 0 0 19.5 12.2 A 4.2 4.2 0 0 0 15.4 8 C 15.65 7.5 15.8 6.9 15.8 6.3 A 3.8 3.8 0 0 0 12 2.5 Z" />
  </svg>
);

export const PlayingCardSuitIcon: React.FC<{
  suit?: PlayingCardSuit;
  className?: string;
}> = ({ suit = 'spades', className }) => {
  switch (suit) {
    case 'hearts':
      return <HeartIcon className={className} />;
    case 'diamonds':
      return <DiamondIcon className={className} />;
    case 'clubs':
      return <ClubIcon className={className} />;
    case 'spades':
    default:
      return <SpadeIcon className={className} />;
  }
};

