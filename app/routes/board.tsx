import { useState } from "react";
import Pieces from "./pieces";
import type { Board, Grid, HighlightedMove } from "~/utils/types";
import { getHighlightedMoves, initializeBoard } from "~/utils/boardUtils";
import { selectPiece } from "~/utils/rules";

export default function Board() {
  // Guarda a matrix e usa o initializeBoard pra fazer um tabuleiro 8x8
  const [grid, setGrid] = useState(initializeBoard());
  // Guarda os movimentos destacados. Array de array onde cada objeto representa a posição (row, col) de um movimento válido
  const [highlightedMoves, setHighlightedMoves] = useState<HighlightedMove[]>([]);
  // Pega a peça selecionada e guarda a posição { row, col } da peça selecionada ou `null` caso não tenha.
  // Exemplo { 0, 1 } é uma posição valida (tem uma peça preta).
  const [selectedPiece, setSelectedPiece] = useState<{ row: number; col: number } | null>(null);

  const onPieceClick = (row: number, col: number) => {
    // Obtém a peça na posição clicada
    const piece = grid[row]?.[col];
    const board: Board = {
      grid,
      size: grid.length,
      currentTurn: "white",
      selectedPiece: null,
    };

    if (piece) {
      console.log("Arquivo board.tsx ~ Peça selecionada no estado:", board.selectedPiece);
      console.log(`Arquivo board.tsx ~ Você clicou em uma peça na posição: (${row}, ${col})`);
      // Seleciona a peça e calcula os movimentos válidos
      selectPiece(board, row, col);
      // Define a peça clicada como a peça selecionada no estado
      setSelectedPiece({ row, col });
      // Atualiza os movimentos válidos para a peça selecionada
      setHighlightedMoves(board.selectedPiece?.highlightedMoves || []);
    } else {
      console.log(`Arquivo board.tsx ~ Você clicou em uma célula vazia na posição: (${row}, ${col})`);
      setSelectedPiece(null);
      setHighlightedMoves([]);
    }
  };

  return (
    <section id="game-board" className="w-full max-w-4xl mx-auto text-center">
      <div className="grid grid-cols-8 w-full max-w-2xl mx-auto aspect-square border-2 border-gray-800 rounded-lg overflow-hidden bg-gray-200">
        <Pieces
          grid={grid}
          highlightedMoves={highlightedMoves}
          onPieceClick={onPieceClick}
          selectedPiece={selectedPiece}
        />
      </div>
    </section>
  );
}
