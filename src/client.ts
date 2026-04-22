import type {
  ClarityXOConfig,
  Board,
  GameStatus,
  GameState,
  Turn,
  LeaderboardMonth,
  GameResult,
} from './types';
import * as read from './contract/read';
import * as write from './contract/write';
import * as leaderboard from './leaderboard/api';

export class ClarityXOClient {
  constructor(private config: ClarityXOConfig) {}

  // Game state
  getBoardState(): Promise<Board> {
    return read.getBoardState(this.config);
  }

  getGameStatus(): Promise<GameStatus> {
    return read.getGameStatus(this.config);
  }

  getWinner(): Promise<GameState['winner']> {
    return read.getWinner(this.config);
  }

  getCurrentTurn(): Promise<Turn> {
    return read.getCurrentTurn(this.config);
  }

  isValidMove(row: 0 | 1 | 2, col: 0 | 1 | 2): Promise<boolean> {
    return read.isValidMove(this.config, row, col);
  }

  getFullGameState(): Promise<GameState> {
    return read.getFullGameState(this.config);
  }

  // Transactions
  startNewGame(): Promise<{ txId: string }> {
    return write.startNewGame(this.config);
  }

  makeMove(row: 0 | 1 | 2, col: 0 | 1 | 2): Promise<{ txId: string }> {
    return write.makeMove(this.config, row, col);
  }

  resignGame(): Promise<{ txId: string }> {
    return write.resignGame(this.config);
  }

  // Leaderboard
  getLeaderboard(month: string): Promise<LeaderboardMonth> {
    return leaderboard.getLeaderboard(this.config, month);
  }

  submitResult(result: GameResult): Promise<void> {
    return leaderboard.submitResult(this.config, result);
  }

  syncLeaderboard(): Promise<void> {
    return leaderboard.syncLeaderboard(this.config);
  }

  healthCheck(): Promise<boolean> {
    return leaderboard.healthCheck(this.config);
  }
}

export function createClient(config: ClarityXOConfig): ClarityXOClient {
  return new ClarityXOClient(config);
}