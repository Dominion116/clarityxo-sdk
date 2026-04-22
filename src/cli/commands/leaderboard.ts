import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { createClient } from '../../client';
import type { ClarityXOConfig } from '../../types';

const command = new Command('leaderboard');

command
  .description('Display the leaderboard for a given month')
  .option('--month <yyyy-mm>', 'Month (YYYY-MM)', new Date().toISOString().slice(0, 7))
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

    const spinner = ora('Fetching leaderboard...').start();
    try {
      const client = createClient(config);
      const leaderboard = await client.getLeaderboard(options.month);

      spinner.stop();

      console.log(chalk.cyan.bold(`Leaderboard for ${leaderboard.month}`));
      console.log();

      const header = chalk.bold('Rank  Address                   Wins  Losses  Draws  Points');
      console.log(header);

      leaderboard.entries.forEach((entry) => {
        const addr = entry.player.slice(0, 12) + '...';
        const line = `${entry.rank.toString().padStart(4)}  ${addr.padEnd(25)} ${entry.wins.toString().padStart(5)} ${entry.losses.toString().padStart(7)} ${entry.draws.toString().padStart(6)} ${entry.points.toString().padStart(7)}`;
        console.log(line);
      });
    } catch (error) {
      spinner.stop();
      console.error(chalk.red(`Error: ${(error as Error).message}`));
      process.exit(1);
    }
  });

export default command;