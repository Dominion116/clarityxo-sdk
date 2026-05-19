import chalk from 'chalk';

export function debug(message: string, ...args: unknown[]) {
  if (process.env.DEBUG && process.env.DEBUG !== '0') {
    // Prefix with a short tag so logs from this SDK are identifiable
    // Keep output minimal and use chalk for mild coloring
    // eslint-disable-next-line no-console
    console.debug(chalk.gray('[clarityxo]'), message, ...args);
  }
}

export default { debug };
