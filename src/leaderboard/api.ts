import type { ClarityXOConfig, LeaderboardMonth, GameResult } from '../types';
import { DEFAULT_LEADERBOARD_API } from '../constants';

function getBaseUrl(config: ClarityXOConfig): string {
  return config.leaderboardApiUrl || DEFAULT_LEADERBOARD_API;
}

export async function getLeaderboard(config: ClarityXOConfig, month: string): Promise<LeaderboardMonth> {
  const baseUrl = getBaseUrl(config);
  const response = await fetch(`${baseUrl}/api/leaderboard?month=${month}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch leaderboard: ${response.statusText}`);
  }
  return response.json();
}

export async function submitResult(config: ClarityXOConfig, result: GameResult): Promise<void> {
  const baseUrl = getBaseUrl(config);
  const response = await fetch(`${baseUrl}/api/leaderboard/result`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result),
  });
  if (!response.ok) {
    throw new Error(`Failed to submit result: ${response.statusText}`);
  }
}

export async function syncLeaderboard(config: ClarityXOConfig): Promise<void> {
  const baseUrl = getBaseUrl(config);
  const response = await fetch(`${baseUrl}/api/sync`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error(`Failed to sync leaderboard: ${response.statusText}`);
  }
}

export async function healthCheck(config: ClarityXOConfig): Promise<boolean> {
  const baseUrl = getBaseUrl(config);
  try {
    const response = await fetch(`${baseUrl}/health`);
    return response.ok;
  } catch {
    return false;
  }
}