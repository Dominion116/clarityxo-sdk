# ClarityXO SDK

A TypeScript SDK and CLI for interacting with the ClarityXO decentralized Tic-Tac-Toe game on the Stacks blockchain.

## Installation

```bash
npm install clarityxo-sdk
```

## Quick Start

```typescript
import { createClient } from 'clarityxo-sdk';

const client = createClient({
  network: 'testnet',
  contractAddress: 'ST1PQHQKVVA1MGKKKSQCXDTEYXSGHCV66VR89BS1',
});

const gameState = await client.getFullGameState();
console.log(gameState.board);
```

## API Reference

### ClarityXOClient

The main client class for interacting with ClarityXO.

#### Constructor

```typescript
new ClarityXOClient(config: ClarityXOConfig)
```

#### Game State Methods

- `getBoardState(): Promise<Board>` - Get the current board state
- `getGameStatus(): Promise<GameStatus>` - Get the game status ('active', 'finished', 'not-started')
- `getWinner(): Promise<'player' | 'ai' | 'draw' | null>` - Get the winner
- `getCurrentTurn(): Promise<Turn>` - Get whose turn it is ('player' or 'ai')
- `isValidMove(row: 0|1|2, col: 0|1|2): Promise<boolean>` - Check if a move is valid
- `getFullGameState(): Promise<GameState>` - Get all game state at once

#### Transaction Methods

These require `senderKey` and `senderAddress` in config.

- `startNewGame(): Promise<{ txId: string }>` - Start a new game
- `makeMove(row: 0|1|2, col: 0|1|2): Promise<{ txId: string }>` - Make a move
- `resignGame(): Promise<{ txId: string }>` - Resign the current game

#### Leaderboard Methods

- `getLeaderboard(month: string): Promise<LeaderboardMonth>` - Get leaderboard for a month
- `submitResult(result: GameResult): Promise<void>` - Submit a game result
- `syncLeaderboard(): Promise<void>` - Sync leaderboard data
- `healthCheck(): Promise<boolean>` - Check if leaderboard API is healthy
- `getPlayerStats(playerAddress: string, month?: string): Promise<PlayerStats | null>` - Get statistics for a specific player

### Types

- `Network`: 'mainnet' | 'testnet'
- `Board`: 3x3 array of CellValue
- `CellValue`: 'X' | 'O' | null
- `GameStatus`: 'active' | 'finished' | 'not-started'
- `Turn`: 'player' | 'ai'
- `GameState`: { board, status, winner, currentTurn }
- `LeaderboardEntry`: { player, wins, losses, draws, points, rank }
- `LeaderboardMonth`: { month, entries }
- `GameResult`: { player, outcome, month }
- `PlayerStats`: { player, wins, losses, draws, points, rank, totalGames, winRate }

## CLI

The package includes a CLI tool called `clarityxo`.

### Global Options

- `--contract <address>`: Contract address (required for most commands)
- `--network <mainnet|testnet>`: Network (default: testnet)
- `--api <url>`: Leaderboard API URL

### Commands

#### `board`

Display the current game board.

```bash
clarityxo board --contract ST1PQHQKVVA1MGKKKSQCXDTEYXSGHCV66VR89BS1
```

Example output:

```
ClarityXO — Testnet
Contract: ST1PQHQKVVA1MGKKKSQCXDTEYXSGHCV66VR89BS1

X │ · │ O
───┼───┼───
· │ X │ ·
───┼───┼───
O │ · │ X

Turn: AI    Status: active    Winner: —
```

#### `status`

Display game status and current turn.

```bash
clarityxo status --contract ST1PQHQKVVA1MGKKKSQCXDTEYXSGHCV66VR89BS1
```

#### `winner`

Display the winner.

```bash
clarityxo winner --contract ST1PQHQKVVA1MGKKKSQCXDTEYXSGHCV66VR89BS1
```

#### `leaderboard`

Display the leaderboard for a month.

```bash
clarityxo leaderboard --month 2023-10 --contract ST1PQHQKVVA1MGKKKSQCXDTEYXSGHCV66VR89BS1
```

#### `move <row> <col>`

Make a move on the board. Requires sender key and address.

```bash
clarityxo move 1 2 --contract ST1PQHQKVVA1MGKKKSQCXDTEYXSGHCV66VR89BS1 --key <private-key> --address <address>
```

#### `start`

Start a new game. Requires sender key and address.

```bash
clarityxo start --contract ST1PQHQKVVA1MGKKKSQCXDTEYXSGHCV66VR89BS1 --key <private-key> --address <address>
```

#### `resign`

Resign the current game. Requires sender key and address.

```bash
clarityxo resign --contract ST1PQHQKVVA1MGKKKSQCXDTEYXSGHCV66VR89BS1 --key <private-key> --address <address>
```

## Network Configuration

- **Mainnet**: Use 'mainnet' network, mainnet contract addresses
- **Testnet**: Use 'testnet' network, testnet contract addresses

Default leaderboard API is `https://clarityxo.onrender.com`, but can be overridden.

## Error Handling

All methods throw descriptive errors. Handle them appropriately:

```typescript
try {
  const tx = await client.startNewGame();
  console.log('Transaction ID:', tx.txId);
} catch (error) {
  console.error('Failed to start game:', error.message);
}
```

## Utility Functions

The SDK includes utility functions for board analysis:

- `checkWin(board, player)` - Check if a player has won
- `isBoardFull(board)` - Check if the board is full
- `isDraw(board)` - Check if the game is a draw
- `getAvailableMoves(board)` - Get list of available moves
- `getBoardString(board)` - Convert board to string representation
- `cloneBoard(board)` - Create a deep copy of the board
- `makeMoveOnBoard(board, row, col, player)` - Make a move and return new board

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Lint: `npm run lint`
6. Format: `npm run format`
7. Submit a PR

If you'd like to contribute a bugfix or small improvement, open an issue first with a short description of the change. For larger features, open a discussion or draft PR so we can coordinate before significant design work.

## License

MIT
