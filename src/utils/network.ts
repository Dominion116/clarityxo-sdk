import { StacksMainnet, StacksTestnet } from '@stacks/network';
import { MAINNET_API, TESTNET_API } from '../constants';
import type { Network } from '../types';

export function getStacksNetwork(network: Network) {
  return network === 'mainnet' ? new StacksMainnet() : new StacksTestnet();
}

export function getApiUrl(network: Network): string {
  return network === 'mainnet' ? MAINNET_API : TESTNET_API;
}