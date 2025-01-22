import type { PiecesProps } from "~/utils/types";

export default function Pieces({ grid, highlightedMoves, onPieceClick, selectedPiece }: PiecesProps) {
  console.log("Arquivo pieces.tsx ~ Movimentos calculados:", highlightedMoves);
  return (
    <>
      {/* Itera o grid (tabuleiro), que é uma matriz bidimensional. Cada elemento na matriz é identificado por duas coordenadas, a linha e a coluna */}
      {grid.map((row, rowIndex) =>
        row.map((piece, colIndex) => {
          const isBlackSquare = (rowIndex + colIndex) % 2 === 1;

          // Verifica se o quadrado está na lista de movimentos destacados
          const isHighlighted = highlightedMoves.some(
            (move) => move.row === rowIndex && move.col === colIndex
          );

          // Verifica se o quadrado contém a peça selecionada
          const isSelected =
            selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex;

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`relative flex items-center justify-center ${isBlackSquare ? "bg-gray-800" : "bg-gray-200"
                } ${isHighlighted ? "bg-blue-500 border-4 border-yellow-500" : ""} aspect-square`}
              onClick={() => onPieceClick(rowIndex, colIndex)}
            >
              {/* Se a peça existir no quadrado */}
              {piece && (
                <div
                  className={`w-3/4 h-3/4 rounded-full ${piece.color === "white" ? "bg-white" : "bg-black"
                    } ${isSelected ? "ring-4 ring-yellow-500" : ""
                    }`}
                >
                  {/* Coloca o ícone de coroa para peças que são damas */}
                  {piece.isQueen && (
                    <span
                      className={`absolute inset-0 flex items-center justify-center text-lg ${piece.color === "white" ? "text-gray-800" : "text-gray-200"
                        }`}
                    >
                      👑
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })
      )}
    </>
  );
}