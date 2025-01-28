export type Grid = (Piece | null)[][];

// enum Color = { white = "white", black = "black"}
type ColorType = "white" |"black"

export interface HighlightedMove { row: number; col: number; capture?: Piece; }

export interface Board {
  size: number;
  grid: Grid;
  currentTurn: ColorType;
  selectedPiece: Piece | null;
}

export interface Piece {
  row: number;
  col: number;
  color: ColorType;
  isQueen: boolean;
  highlightedMoves: HighlightedMove[];
}

export interface PiecesProps {
  grid: Grid;
  highlightedMoves: HighlightedMove[];
  onPieceClick: (row: number, col: number) => void;
  selectedPiece?: { row: number; col: number } | null;
}