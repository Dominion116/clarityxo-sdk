import type { Board, CellValue } from '../types';

export function checkWin(board: Board, player: CellValue): boolean {
  if (player === null) return false;

  // Check rows
  for (let row = 0; row < 3; row++) {
    if (board[row][0] === player && board[row][1] === player && board[row][2] === player) {
      return true;
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
    if (board[0][col] === player && board[1][col] === player && board[2][col] === player) {
      return true;
    }
  }

  // Check diagonals
  if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
    return true;
  }
  if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
    return true;
  }

  return false;
}

export function isBoardFull(board: Board): boolean {
  return board.every(row => row.every(cell => cell !== null));
}

export function isDraw(board: Board): boolean {
  return isBoardFull(board) && !checkWin(board, 'X') && !checkWin(board, 'O');
}

export function getAvailableMoves(board: Board): Array<[number, number]> {
  const moves: Array<[number, number]> = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === null) {
        moves.push([row, col]);
      }
    }
  }
  return moves;
}

export function getBoardString(board: Board): string {
  return board.map(row => row.map(cell => cell || ' ').join('')).join('\n');
}

export function cloneBoard(board: Board): Board {
  return board.map(row => [...row]) as Board;
}

export function makeMoveOnBoard(board: Board, row: number, col: number, player: CellValue): Board {
  if (board[row][col] !== null) {
    throw new Error('Cell is already occupied');
  }
  const newBoard = cloneBoard(board);
  newBoard[row][col] = player;
  return newBoard as Board;
}