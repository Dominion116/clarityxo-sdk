import type { ClarityValue } from '@stacks/transactions';
import type { Board, GameStatus, Turn, GameState } from '../types';

export function parseBoardCV(cv: ClarityValue): Board {
  // Assuming cv is a ListType of ListType of optional string
  const rows = cv as any; // Type assertion for simplicity, in real code handle properly
  const board: Board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  for (let i = 0; i < 3; i++) {
    const row = rows.list[i].list;
    for (let j = 0; j < 3; j++) {
      const cell = row[j];
      if (cell.type === 'some') {
        board[i][j] = cell.value.value as 'X' | 'O';
      } else {
        board[i][j] = null;
      }
    }
  }
  return board;
}

export function parseGameStatusCV(cv: ClarityValue): GameStatus {
  const value = (cv as any).value;
  if (value === 'active') return 'active';
  if (value === 'finished') return 'finished';
  if (value === 'not-started') return 'not-started';
  throw new Error(`Invalid game status: ${value}`);
}

export function parseWinnerCV(cv: ClarityValue): GameState['winner'] {
  const value = (cv as any).value;
  if (value === 'player') return 'player';
  if (value === 'ai') return 'ai';
  if (value === 'draw') return 'draw';
  return null; // for none
}

export function parseTurnCV(cv: ClarityValue): Turn {
  const value = (cv as any).value;
  if (value === 'player') return 'player';
  if (value === 'ai') return 'ai';
  throw new Error(`Invalid turn: ${value}`);
}