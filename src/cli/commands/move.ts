import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { createClient } from '../../client';
import type { ClarityXOConfig } from '../../types';
import { validateContractAddress, validateNetwork, validateWriteConfig } from '../../utils/validation';

const command = new Command('move');

command
  .description('Make a move on the board')
  .argument('<row>', 'Row (0-2)')
  .argument('<col>', 'Column (0-2)')
  .option('--contract [address]', 'Contract address')
  .option('--network <network>', 'Network (mainnet or testnet)', 'testnet')
  .option('--api <url>', 'Leaderboard API URL')
  .option('--key <key>', 'Sender private key (required)')
  .option('--address <address>', 'Sender address (required)')
  .action(async (row, col, options) => {
    try {
      validateNetwork(options.network);

      const rowNum = parseInt(row, 10);
      const colNum = parseInt(col, 10);

      if (isNaN(rowNum) || isNaN(colNum) || rowNum < 0 || rowNum > 2 || colNum < 0 || colNum > 2) {
        throw new Error('Row and column must be integers between 0 and 2');
      }

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

    const spinner = ora('Making move...').start();
    try {
      const client = createClient(config);
      const tx = await client.makeMove(rowNum as 0 | 1 | 2, colNum as 0 | 1 | 2);

      spinner.stop();

      console.log(chalk.green(`Move successful! Transaction ID: ${tx.txId}`));
    } catch (error) {
      spinner.stop();
      console.error(chalk.red(`Error: ${(error as Error).message}`));
      process.exit(1);
    }
  });

export default command;