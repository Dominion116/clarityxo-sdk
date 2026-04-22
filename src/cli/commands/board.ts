import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { createClient } from '../../client';
import type { ClarityXOConfig } from '../../types';

const command = new Command('board');

command
  .description('Display the current game board')
  .option('--contract <address>', 'Contract address (required)')
  .option('--network <network>', 'Network (mainnet or testnet)', 'testnet')
  .option('--api <url>', 'Leaderboard API URL')
  .action(async (options) => {
    if (!options.contract) {
      console.error(chalk.red('Error: --contract is required'));
      process.exit(1);
    }

    const config: ClarityXOConfig = {
      network: options.network,
      contractAddress: options.contract,
      leaderboardApiUrl: options.api,
    };

    const spinner = ora('Fetching game state...').start();
    try {
      const client = createClient(config);
      const gameState = await client.getFullGameState();

      spinner.stop();

      const { board, status, winner, currentTurn } = gameState;

      const renderCell = (cell: string | null) => {
        if (cell === 'X') return chalk.blue.bold('X');
        if (cell === 'O') return chalk.red.bold('O');
        return chalk.gray('·');
      };

      const renderBoard = (board: any) => {
        const lines = [];
        for (let i = 0; i < 3; i++) {
          const row = board[i].map(renderCell).join(' │ ');
          lines.push(row);
          if (i < 2) {
            lines.push('───┼───┼───');
          }
        }
        return lines.join('\n');
      };

      console.log(chalk.cyan.bold('ClarityXO — ' + (config.network === 'mainnet' ? 'Mainnet' : 'Testnet')));
      console.log(chalk.gray(`Contract: ${config.contractAddress}`));
      console.log();
      console.log(renderBoard(board));
      console.log();
      console.log(`Turn: ${currentTurn === 'player' ? 'Player' : 'AI'}    Status: ${status}    Winner: ${winner || '—'}`);
    } catch (error) {
      spinner.stop();
      console.error(chalk.red(`Error: ${(error as Error).message}`));
      process.exit(1);
    }
  });

export default command;