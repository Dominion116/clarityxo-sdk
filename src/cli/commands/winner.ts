import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { createClient } from '../../client';
import type { ClarityXOConfig } from '../../types';

const command = new Command('winner');

command
  .description('Display the game winner')
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

    const spinner = ora('Fetching winner...').start();
    try {
      const client = createClient(config);
      const winner = await client.getWinner();

      spinner.stop();

      if (winner) {
        const color = winner === 'player' ? chalk.green : winner === 'ai' ? chalk.red : chalk.yellow;
        console.log(color(`Winner: ${winner}`));
      } else {
        console.log(chalk.gray('No winner yet'));
      }
    } catch (error) {
      spinner.stop();
      console.error(chalk.red(`Error: ${(error as Error).message}`));
      process.exit(1);
    }
  });

export default command;