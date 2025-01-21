export type Grid = (Piece | null)[][];

export interface HighlightedMove { row: number; col: number; }

export interface Board {
  size: number;
  grid: Grid;
  currentTurn: "white" | "black";
  selectedPiece: Piece | null;
}

export interface Piece {
  row: number;
  col: number;
  color: "white" | "black";
  isQueen: boolean;
  highlightedMoves: HighlightedMove[];
}

export interface PiecesProps {
  grid: Grid;
  highlightedMoves: HighlightedMove[];
  onPieceClick: (row: number, col: number) => void;
  selectedPiece?: { row: number; col: number } | null;
}

export interface Move {
  row: number;
  col: number;
  capture?: Piece;
}