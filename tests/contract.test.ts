import { describe, it, expect, vi } from 'vitest';
import { callReadOnlyFunction } from '@stacks/transactions';
import {
  parseBoardCV,
  parseGameStatusCV,
  parseWinnerCV,
  parseTurnCV,
} from '../src/utils/cv';
import { getFullGameState } from '../src/contract/read';
import type { ClarityXOConfig } from '../src/types';

// Mock callReadOnlyFunction
vi.mock('@stacks/transactions', () => ({
  callReadOnlyFunction: vi.fn(),
}));

describe('parseBoardCV', () => {
  it('should parse board with X, O, and null', () => {
    const mockCV = {
      list: [
        { list: [{ type: 'some', value: { value: 'X' } }, { type: 'none' }, { type: 'some', value: { value: 'O' } }] },
        { list: [{ type: 'none' }, { type: 'some', value: { value: 'X' } }, { type: 'none' }] },
        { list: [{ type: 'some', value: { value: 'O' } }, { type: 'none' }, { type: 'some', value: { value: 'X' } }] },
      ],
    };
    const board = parseBoardCV(mockCV as any);
    expect(board).toEqual([
      ['X', null, 'O'],
      [null, 'X', null],
      ['O', null, 'X'],
    ]);
  });
});

describe('parseGameStatusCV', () => {
  it('should parse active status', () => {
    const cv = { value: 'active' };
    expect(parseGameStatusCV(cv as any)).toBe('active');
  });

  it('should parse finished status', () => {
    const cv = { value: 'finished' };
    expect(parseGameStatusCV(cv as any)).toBe('finished');
  });
});

describe('parseWinnerCV', () => {
  it('should parse player win', () => {
    const cv = { value: 'player' };
    expect(parseWinnerCV(cv as any)).toBe('player');
  });

  it('should parse ai win', () => {
    const cv = { value: 'ai' };
    expect(parseWinnerCV(cv as any)).toBe('ai');
  });

  it('should parse draw', () => {
    const cv = { value: 'draw' };
    expect(parseWinnerCV(cv as any)).toBe('draw');
  });

  it('should parse null for no winner', () => {
    const cv = { value: 'none' };
    expect(parseWinnerCV(cv as any)).toBe(null);
  });
});

describe('parseTurnCV', () => {
  it('should parse player turn', () => {
    const cv = { value: 'player' };
    expect(parseTurnCV(cv as any)).toBe('player');
  });

  it('should parse ai turn', () => {
    const cv = { value: 'ai' };
    expect(parseTurnCV(cv as any)).toBe('ai');
  });
});

describe('getFullGameState', () => {
  it('should return full game state', async () => {
    const config: ClarityXOConfig = {
      network: 'testnet',
      contractAddress: 'ST123',
    };

    // Mock the callReadOnlyFunction to return mock CVs
    (callReadOnlyFunction as any).mockResolvedValueOnce({ list: [] }); // board
    (callReadOnlyFunction as any).mockResolvedValueOnce({ value: 'active' }); // status
    (callReadOnlyFunction as any).mockResolvedValueOnce({ value: 'player' }); // winner
    (callReadOnlyFunction as any).mockResolvedValueOnce({ value: 'player' }); // turn

    const state = await getFullGameState(config);
    expect(state).toEqual({
      board: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      status: 'active',
      winner: 'player',
      currentTurn: 'player',
    });
  });
});