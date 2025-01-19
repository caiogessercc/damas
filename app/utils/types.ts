export interface Piece {
  row: number;
  col: number;
  color: "white" | "black";
  isQueen: boolean;
  highlightedMoves: Move[];
}

export interface Board {
  size: number;
  grid: (Piece | null)[][];
  currentTurn: "white" | "black";
  selectedPiece: Piece | null;
}

export interface Move {
  row: number;
  col: number;
  capture?: Piece;
}
