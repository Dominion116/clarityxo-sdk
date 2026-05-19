export function isValidStacksAddress(address: string): boolean {
  // Basic validation for Stacks addresses
  // Mainnet addresses start with SP, testnet with ST
  return /^S[TP][0-9A-Z]{38}$/.test(address);
}

export function validateContractAddress(address?: string): void {
  if (!address) {
    throw new Error('Contract address is required. Pass it via --contract <address> or set it in your config.');
  }
  if (!isValidStacksAddress(address)) {
    throw new Error('Invalid Stacks address format. Ensure the address starts with SP (mainnet) or ST (testnet).');
  }
}

export function validateNetwork(network: string): void {
  if (network !== 'mainnet' && network !== 'testnet') {
    throw new Error('Network must be either "mainnet" or "testnet"');
  }
}

export function validateWriteConfig(key?: string, address?: string): void {
  if (!key) {
    throw new Error('--key (sender private key) is required for write operations. Provide it via --key <private-key>.');
  }
  if (!address) {
    throw new Error('--address (sender address) is required for write operations. Provide it via --address <sender-address>.');
  }
  if (!isValidStacksAddress(address)) {
    throw new Error('Invalid sender address format. Ensure it is a valid Stacks address.');
  }
}