import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { createClient } from '../../client';
import type { ClarityXOConfig } from '../../types';

const command = new Command('status');

command
  .description('Display the current game status and turn')
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

    const spinner = ora('Fetching game status...').start();
    try {
      const client = createClient(config);
      const [status, currentTurn] = await Promise.all([
        client.getGameStatus(),
        client.getCurrentTurn(),
      ]);

      spinner.stop();

      console.log(`Status: ${status}`);
      console.log(`Current Turn: ${currentTurn === 'player' ? 'Player' : 'AI'}`);
    } catch (error) {
      spinner.stop();
      console.error(chalk.red(`Error: ${(error as Error).message}`));
      process.exit(1);
    }
  });

export default command;