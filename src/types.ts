export type Network = 'mainnet' | 'testnet';

export type CellValue = 'X' | 'O' | null;

export type Board = [
  [CellValue, CellValue, CellValue],
  [CellValue, CellValue, CellValue],
  [CellValue, CellValue, CellValue]
];

export type GameStatus = 'active' | 'finished' | 'not-started';

export type Turn = 'player' | 'ai';

export interface GameState {
  board: Board;
  status: GameStatus;
  winner: 'player' | 'ai' | 'draw' | null;
  currentTurn: Turn;
}

export interface LeaderboardEntry {
  player: string;  // Stacks address
  wins: number;
  losses: number;
  draws: number;
  points: number;
  rank: number;
}

export interface LeaderboardMonth {
  month: string;  // YYYY-MM
  entries: LeaderboardEntry[];
}

export interface GameResult {
  player: string;
  outcome: 'win' | 'loss' | 'draw';
  month: string;
}

export interface ClarityXOConfig {
  network: Network;
  contractAddress?: string;     // defaults to deployed contract
  contractName?: string;        // defaults to 'tictactoe'
  leaderboardApiUrl?: string;   // defaults based on network
  senderAddress?: string;       // required for write operations
  senderKey?: string;           // required for write operations
}