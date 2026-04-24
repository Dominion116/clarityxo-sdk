export const CONTRACT_NAME = 'tictactoe';
export const CONTRACT_ADDRESS = 'SP30VGN68PSGVWGNMD0HH2WQMM5T486EK3YGP7Z3Y.clarity-xo-game';

export const MAINNET_API = 'https://api.mainnet.hiro.so';
export const TESTNET_API = 'https://api.testnet.hiro.so';

export const DEFAULT_LEADERBOARD_API = 'https://clarityxo.onrender.com';

export const CONTRACT_FUNCTIONS = {
  START_NEW_GAME: 'start-new-game',
  MAKE_MOVE: 'make-move',
  RESIGN_GAME: 'resign-game',
  GET_BOARD_STATE: 'get-board-state',
  GET_GAME_STATUS: 'get-game-status',
  GET_WINNER: 'get-winner',
  GET_CURRENT_TURN: 'get-current-turn',
  IS_VALID_MOVE: 'is-valid-move',
} as const;