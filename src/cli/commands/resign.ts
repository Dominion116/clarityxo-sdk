import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { createClient } from '../../client';
import type { ClarityXOConfig } from '../../types';

const command = new Command('resign');

command
  .description('Resign the current game')
  .option('--contract [address]', 'Contract address')
  .option('--network <network>', 'Network (mainnet or testnet)', 'testnet')
  .option('--api <url>', 'Leaderboard API URL')
  .option('--key <key>', 'Sender private key (required)')
  .option('--address <address>', 'Sender address (required)')
  .action(async (options) => {
    if (!options.key || !options.address) {
      console.error(chalk.red('Error: --key and --address are required for resigning games'));
      process.exit(1);
    }

    const config: ClarityXOConfig = {
      network: options.network,
      contractAddress: options.contract,
      leaderboardApiUrl: options.api,
      senderKey: options.key,
      senderAddress: options.address,
    };

    const spinner = ora('Resigning game...').start();
    try {
      const client = createClient(config);
      const tx = await client.resignGame();

      spinner.stop();

      console.log(chalk.green(`Game resigned! Transaction ID: ${tx.txId}`));
    } catch (error) {
      spinner.stop();
      console.error(chalk.red(`Error: ${(error as Error).message}`));
      process.exit(1);
    }
  });

export default command;