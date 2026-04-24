import { makeContractCall, broadcastTransaction, uintCV } from '@stacks/transactions';
import type { ClarityXOConfig } from '../types';
import { CONTRACT_NAME, CONTRACT_ADDRESS, CONTRACT_FUNCTIONS } from '../constants';
import { getStacksNetwork } from '../utils/network';

export async function startNewGame(config: ClarityXOConfig): Promise<{ txId: string }> {
  if (!config.senderKey || !config.senderAddress) {
    throw new Error('senderKey and senderAddress are required for write operations');
  }
  const network = getStacksNetwork(config.network);
  const contractName = config.contractName || CONTRACT_NAME;
  const contractAddress = config.contractAddress || CONTRACT_ADDRESS;
  const tx = await makeContractCall({
    network,
    contractAddress,
    contractName,
    functionName: CONTRACT_FUNCTIONS.START_NEW_GAME,
    functionArgs: [],
    senderKey: config.senderKey,
    anchorMode: 'any',
  });
  const broadcastResponse = await broadcastTransaction(tx, network);
  return { txId: broadcastResponse.txid };
}

export async function makeMove(
  config: ClarityXOConfig,
  row: 0 | 1 | 2,
  col: 0 | 1 | 2
): Promise<{ txId: string }> {
  if (!config.senderKey || !config.senderAddress) {
    throw new Error('senderKey and senderAddress are required for write operations');
  }
  const network = getStacksNetwork(config.network);
  const contractName = config.contractName || CONTRACT_NAME;
  const contractAddress = config.contractAddress || CONTRACT_ADDRESS;
  const tx = await makeContractCall({
    network,
    contractAddress,
    contractName,
    functionName: CONTRACT_FUNCTIONS.MAKE_MOVE,
    functionArgs: [uintCV(row), uintCV(col)],
    senderKey: config.senderKey,
    anchorMode: 'any',
  });
  const broadcastResponse = await broadcastTransaction(tx, network);
  return { txId: broadcastResponse.txid };
}

export async function resignGame(config: ClarityXOConfig): Promise<{ txId: string }> {
  if (!config.senderKey || !config.senderAddress) {
    throw new Error('senderKey and senderAddress are required for write operations');
  }
  const network = getStacksNetwork(config.network);
  const contractName = config.contractName || CONTRACT_NAME;
  const contractAddress = config.contractAddress || CONTRACT_ADDRESS;
  const tx = await makeContractCall({
    network,
    contractAddress,
    contractName,
    functionName: CONTRACT_FUNCTIONS.RESIGN_GAME,
    functionArgs: [],
    senderKey: config.senderKey,
    anchorMode: 'any',
  });
  const broadcastResponse = await broadcastTransaction(tx, network);
  return { txId: broadcastResponse.txid };
}
