import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { createClient } from '../../client';
import type { ClarityXOConfig } from '../../types';
import { validateNetwork, validateWriteConfig } from '../../utils/validation';

const command = new Command('start');

command
  .description('Start a new game')
  .option('--contract [address]', 'Contract address')
  .option('--network <network>', 'Network (mainnet or testnet)', 'testnet')
  .option('--api <url>', 'Leaderboard API URL')
  .option('--key <key>', 'Sender private key (required)')
  .option('--address <address>', 'Sender address (required)')
  .action(async (options) => {
    try {
      validateNetwork(options.network);
      validateWriteConfig(options.key, options.address);
    } catch (error) {
      console.error(chalk.red(`Error: ${(error as Error).message}`));
      process.exit(1);
    }

    const config: ClarityXOConfig = {
      network: options.network,
      contractAddress: options.contract,
      leaderboardApiUrl: options.api,
      senderKey: options.key,
      senderAddress: options.address,
    };

    const spinner = ora('Starting new game...').start();
    try {
      const client = createClient(config);
      const tx = await client.startNewGame();

      spinner.stop();

      console.log(chalk.green(`New game started! Transaction ID: ${tx.txId}`));
    } catch (error) {
      spinner.stop();
      console.error(chalk.red(`Error: ${(error as Error).message}`));
      process.exit(1);
    }
  });

export default command;