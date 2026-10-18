import type { PlayingCardSuit } from '../types/portfolio';

export const isRedSuit = (suit?: PlayingCardSuit): boolean => {
  return suit === 'hearts' || suit === 'diamonds';
};

export const getSuitSymbol = (suit?: PlayingCardSuit): string => {
  switch (suit) {
    case 'hearts':
      return '♥';
    case 'diamonds':
      return '♦';
    case 'clubs':
      return '♣';
    case 'spades':
    default:
      return '♠';
  }
};

export const getSuitName = (suit?: PlayingCardSuit): string => {
  switch (suit) {
    case 'hearts':
      return 'Hearts';
    case 'diamonds':
      return 'Diamonds';
    case 'clubs':
      return 'Clubs';
    case 'spades':
    default:
      return 'Spades';
  }
};

