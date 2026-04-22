#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'fs';
import boardCommand from './commands/board';
import statusCommand from './commands/status';
import winnerCommand from './commands/winner';
import leaderboardCommand from './commands/leaderboard';

const packageJson = JSON.parse(readFileSync(new URL('../../package.json', import.meta.url), 'utf8'));

const program = new Command();

program
  .name('clarityxo')
  .description('CLI for ClarityXO Tic-Tac-Toe on Stacks blockchain')
  .version(packageJson.version);

program
  .option('--contract <address>', 'Contract address')
  .option('--network <network>', 'Network (mainnet or testnet)', 'testnet')
  .option('--api <url>', 'Leaderboard API URL');

program.addCommand(boardCommand);
program.addCommand(statusCommand);
program.addCommand(winnerCommand);
program.addCommand(leaderboardCommand);

program.parse();