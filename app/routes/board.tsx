import { useState } from "react";
import Pieces from "./pieces";
import type { Board, Grid, HighlightedMove } from "~/utils/types";
import { initializeBoard } from "~/utils/boardUtils";
import { movePiece, selectPiece } from "~/utils/rules";

export default function Board() {
  // Guarda a matrix e usa o initializeBoard pra fazer um tabuleiro 8x8
  const [grid, setGrid] = useState(initializeBoard());
  // Guarda os movimentos destacados. Array de array onde cada objeto representa a posição (row, col) de um movimento válido
  const [highlightedMoves, setHighlightedMoves] = useState<HighlightedMove[]>([]);
  // Pega a peça selecionada e guarda a posição { row, col } da peça selecionada ou `null` caso não tenha.
  // Exemplo { 0, 1 } é uma posição valida (tem uma peça preta).
  const [selectedPiece, setSelectedPiece] = useState<{ row: number; col: number } | null>(null);
  // Controla o turno atual
  const [currentTurn, setCurrentTurn] = useState<"white" | "black">("white");
  // Quantidade de peças
  const [pieceCounts, setPieceCounts] = useState({ white: 12, black: 12 });

  const onPieceClick = (row: number, col: number) => {
    // Obtém a peça na posição clicada
    const piece = grid[row]?.[col];
    const board: Board = {
      grid,
      size: grid.length,
      currentTurn,
      selectedPiece: null,
    };

    // Verifica se há uma peça selecionada
    if (selectedPiece) {
      // Obtém a peça selecionada no grid
      const isSelected = grid[selectedPiece.row]?.[selectedPiece.col];
      // Confirma que a peça selecionada existe
      if (isSelected) {
        // Tenta realizar o movimento
        const moved = movePiece(board, isSelected, row, col);
        // Se o movimento for válido
        if (moved) {
          setGrid([...board.grid]); // Atualiza o estado do tabuleiro
          setSelectedPiece(null); // Limpa a seleção da peça
          setHighlightedMoves([]); // Limpa os movimentos destacados
          if (!updateGameState()) setCurrentTurn(currentTurn === "white" ? "black" : "white"); // Atualiza o turno
          return;
        }
      }
    }

    if (piece && piece.color === currentTurn) {
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

  const updateGameState = () => {
    const whitePieces = grid.flat().filter((piece) => piece?.color === "white").length;
    const blackPieces = grid.flat().filter((piece) => piece?.color === "black").length;

    // Atualiza os contadores de peças
    setPieceCounts({ white: whitePieces, black: blackPieces });

    // Verifica condições de vitória
    if (whitePieces === 0 || blackPieces === 0) {
      alert(whitePieces === 0 ? "Vitória das pretas!" : "Vitória das brancas!");
      resetGame();
      return true;
    }
    return false;
  };

  const resetGame = () => {
    setGrid(initializeBoard());
    setSelectedPiece(null);
    setHighlightedMoves([]);
    setCurrentTurn("white");
    setPieceCounts({ white: 12, black: 12 });
  };

  return (
    <section id="game-board" className="w-full max-w-4xl mx-auto text-center">
      <div className="mb-4 text-gray-800">
        <p>Turno atual: {currentTurn === "white" ? "Brancas" : "Pretas"}</p>
        <p>Peças Brancas: {pieceCounts.white} | Peças Pretas: {pieceCounts.black}</p>
      </div>
      <div className="grid grid-cols-8 w-full max-w-2xl mx-auto aspect-square border-2 border-gray-800 rounded-lg overflow-hidden bg-gray-200">
        <Pieces
          grid={grid}
          highlightedMoves={highlightedMoves}
          onPieceClick={onPieceClick}
          selectedPiece={selectedPiece}
        />
      </div>
      <button
        onClick={resetGame}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Reiniciar Jogo
      </button>
    </section>
  );
}