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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Lint: `npm run lint`
6. Format: `npm run format`
7. Submit a PR

## License

MIT
