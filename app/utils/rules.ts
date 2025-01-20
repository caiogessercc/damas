import type { Board, Piece } from "./types";

// Função para selecionar uma peça no tabuleiro
export function selectPiece(board: Board, row: number, col: number) {
  const piece = getPiece(board, row, col);

  if (piece && piece.color === board.currentTurn) {
    board.selectedPiece = piece;
  } else {
    board.selectedPiece = null;
  }
}

// Função para obter uma peça de uma posição no tabuleiro
function getPiece(board: Board, row: number, col: number): Piece | null {
  return board.grid[row]?.[col];
}
