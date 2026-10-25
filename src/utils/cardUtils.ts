import type { PlayingCardSuit, ProjectItem } from '../types/portfolio';

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

export interface ProjectCardBackMeta {
  suit: PlayingCardSuit;
  suitGlyph: string;
  rank: string;
  roman: string;
  number: string;
  edition: string;
  isRed: boolean;
}

export const getProjectCardMeta = (project: ProjectItem, index: number): ProjectCardBackMeta => {
  const titleLower = project.title.toLowerCase();
  const idLower = project.id.toLowerCase();

  // 01. Mercury: Sovereign Ace of Spades
  if (titleLower.includes('mercury') || idLower.includes('mercury') || idLower.includes('omnitrack')) {
    return {
      suit: 'spades',
      suitGlyph: '♠',
      rank: 'A',
      roman: 'I',
      number: '01',
      edition: 'SOVEREIGN // DECK',
      isRed: false,
    };
  }

  // 02. Aegis: Sentinel King of Hearts
  if (titleLower.includes('aegis') || idLower.includes('aegis') || idLower.includes('fastapi')) {
    return {
      suit: 'hearts',
      suitGlyph: '♥',
      rank: 'K',
      roman: 'II',
      number: '02',
      edition: 'SENTINEL // DECK',
      isRed: true,
    };
  }

  // 03. Lux: High-Performance Engine (Jack of Clubs)
  if (titleLower.includes('lux') || idLower.includes('lux') || idLower.includes('corecraft')) {
    return {
      suit: 'clubs',
      suitGlyph: '♣',
      rank: 'J',
      roman: 'III',
      number: '03',
      edition: 'ENGINE // DECK',
      isRed: false,
    };
  }

  // Graceful fallback for any additional projects
  const suitList: PlayingCardSuit[] = ['diamonds', 'spades', 'hearts', 'clubs'];
  const suit = suitList[index % suitList.length];
  const glyphMap: Record<PlayingCardSuit, string> = {
    spades: '♠',
    hearts: '♥',
    clubs: '♣',
    diamonds: '♦',
  };
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

  return {
    suit,
    suitGlyph: glyphMap[suit],
    rank: `${index + 1}`,
    roman: romanNumerals[index] || `${index + 1}`,
    number: (index + 1).toString().padStart(2, '0'),
    edition: 'COLLECTOR // DECK',
    isRed: suit === 'hearts' || suit === 'diamonds',
  };
};
