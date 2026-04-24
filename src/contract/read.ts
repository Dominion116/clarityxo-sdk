import { callReadOnlyFunction, uintCV } from '@stacks/transactions';
import type { ClarityXOConfig, Board, GameStatus, GameState, Turn } from '../types';
import { CONTRACT_NAME, CONTRACT_ADDRESS, CONTRACT_FUNCTIONS } from '../constants';
import { getStacksNetwork } from '../utils/network';
import { parseBoardCV, parseGameStatusCV, parseWinnerCV, parseTurnCV } from '../utils/cv';

export async function getBoardState(config: ClarityXOConfig): Promise<Board> {
  const network = getStacksNetwork(config.network);
  const contractName = config.contractName || CONTRACT_NAME;
  const contractAddress = config.contractAddress || CONTRACT_ADDRESS;
  const cv = await callReadOnlyFunction({
    network,
    contractAddress,
    contractName,
    functionName: CONTRACT_FUNCTIONS.GET_BOARD_STATE,
    functionArgs: [],
    senderAddress: contractAddress, // arbitrary
  });
  return parseBoardCV(cv);
}

export async function getGameStatus(config: ClarityXOConfig): Promise<GameStatus> {
  const network = getStacksNetwork(config.network);
  const contractName = config.contractName || CONTRACT_NAME;
  const contractAddress = config.contractAddress || CONTRACT_ADDRESS;
  const cv = await callReadOnlyFunction({
    network,
    contractAddress,
    contractName,
    functionName: CONTRACT_FUNCTIONS.GET_GAME_STATUS,
    functionArgs: [],
    senderAddress: contractAddress,
  });
  return parseGameStatusCV(cv);
}

export async function getWinner(config: ClarityXOConfig): Promise<GameState['winner']> {
  const network = getStacksNetwork(config.network);
  const contractName = config.contractName || CONTRACT_NAME;
  const contractAddress = config.contractAddress || CONTRACT_ADDRESS;
  const cv = await callReadOnlyFunction({
    network,
    contractAddress,
    contractName,
    functionName: CONTRACT_FUNCTIONS.GET_WINNER,
    functionArgs: [],
    senderAddress: contractAddress,
  });
  return parseWinnerCV(cv);
}

export async function getCurrentTurn(config: ClarityXOConfig): Promise<Turn> {
  const network = getStacksNetwork(config.network);
  const contractName = config.contractName || CONTRACT_NAME;
  const contractAddress = config.contractAddress || CONTRACT_ADDRESS;
  const cv = await callReadOnlyFunction({
    network,
    contractAddress,
    contractName,
    functionName: CONTRACT_FUNCTIONS.GET_CURRENT_TURN,
    functionArgs: [],
    senderAddress: contractAddress,
  });
  return parseTurnCV(cv);
}

export async function isValidMove(
  config: ClarityXOConfig,
  row: 0 | 1 | 2,
  col: 0 | 1 | 2
): Promise<boolean> {
  const network = getStacksNetwork(config.network);
  const contractName = config.contractName || CONTRACT_NAME;
  const contractAddress = config.contractAddress || CONTRACT_ADDRESS;
  const cv = await callReadOnlyFunction({
    network,
    contractAddress,
    contractName,
    functionName: CONTRACT_FUNCTIONS.IS_VALID_MOVE,
    functionArgs: [uintCV(row), uintCV(col)],
    senderAddress: contractAddress,
  });
  return (cv as any).value; // boolean value
}

export async function getFullGameState(config: ClarityXOConfig): Promise<GameState> {
  const [board, status, winner, currentTurn] = await Promise.all([
    getBoardState(config),
    getGameStatus(config),
    getWinner(config),
    getCurrentTurn(config),
  ]);
  return { board, status, winner, currentTurn };
}
