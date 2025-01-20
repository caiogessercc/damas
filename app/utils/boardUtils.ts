import type { Grid, HighlightedMove } from "~/utils/types";

export const initializeBoard = (): Grid => {
  const size = 8;
  return Array.from({ length: size }, (_, row) => // Cria um array de 8 linhas
    Array.from({ length: size }, (_, col) => { // Para cada linha, cria 8 colunas
      // Determina se o quadrado é preto com base na posição da linha e coluna
      if ((row + col) % 2 !== 0) {
        // Adiciona peças pretas nas 3 primeiras linhas
        if (row < 3) {
          return {
            row,
            col,
            color: "black",
            isQueen: false,
            highlightedMoves: [],
          };
        } 
        // Adiciona peças brancas nas 3 últimas linhas
        else if (row > 4) {
          return {
            row,
            col,
            color: "white",
            isQueen: false,
            highlightedMoves: [],
          };
        }
      }
      // Retorna null para os quadrados que não possuem peças
      return null;
    })
  );
};

// Função para obter os movimentos destacados de uma peça
export const getHighlightedMoves = (grid: Grid, row: number, col: number): HighlightedMove[] => {
  // Obtém a peça na posição especificada no tabuleiro (se existir)
  const piece = grid[row]?.[col];
  
  // Se a peça existir, retorna os movimentos destacados, caso contrário, retorna um array vazio
  return piece?.highlightedMoves || [];
};
