import { describe, it, expect, vi } from 'vitest';
import { getLeaderboard, submitResult, healthCheck } from '../src/leaderboard/api';
import type { ClarityXOConfig, GameResult } from '../src/types';

// Mock fetch
global.fetch = vi.fn();

describe('getLeaderboard', () => {
  it('should fetch leaderboard correctly', async () => {
    const config: ClarityXOConfig = {
      network: 'testnet',
      contractAddress: 'ST123',
      leaderboardApiUrl: 'https://api.example.com',
    };

    const mockData = {
      month: '2023-10',
      entries: [],
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await getLeaderboard(config, '2023-10');
    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/api/leaderboard?month=2023-10');
  });
});

describe('submitResult', () => {
  it('should submit result correctly', async () => {
    const config: ClarityXOConfig = {
      network: 'testnet',
      contractAddress: 'ST123',
      leaderboardApiUrl: 'https://api.example.com',
    };

    const result: GameResult = {
      player: 'ST123',
      outcome: 'win',
      month: '2023-10',
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
    });

    await expect(submitResult(config, result)).resolves.toBeUndefined();
    expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/api/leaderboard/result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    });
  });
});

describe('healthCheck', () => {
  it('should return true on 200', async () => {
    const config: ClarityXOConfig = {
      network: 'testnet',
      contractAddress: 'ST123',
      leaderboardApiUrl: 'https://api.example.com',
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
    });

    const result = await healthCheck(config);
    expect(result).toBe(true);
  });

  it('should return false on non-200', async () => {
    const config: ClarityXOConfig = {
      network: 'testnet',
      contractAddress: 'ST123',
      leaderboardApiUrl: 'https://api.example.com',
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
    });

    const result = await healthCheck(config);
    expect(result).toBe(false);
  });

  it('should return false on error', async () => {
    const config: ClarityXOConfig = {
      network: 'testnet',
      contractAddress: 'ST123',
      leaderboardApiUrl: 'https://api.example.com',
    };

    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    const result = await healthCheck(config);
    expect(result).toBe(false);
  });
});