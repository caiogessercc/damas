import type { Board, HighlightedMove, Piece } from "./types";

// Função para selecionar uma peça no tabuleiro
export function selectPiece(board: Board, row: number, col: number): void {
  console.log("Arquivo rules.ts ~ Peça selecionada:", board.selectedPiece);
  console.log(
    "Arquivo rules.ts ~ Movimentos destacados:",
    board.selectedPiece?.highlightedMoves
  );
  const piece = getPiece(board, row, col);

  if (piece && piece.color === board.currentTurn) {
    console.log("Arquivo rules.ts ~ Peça válida selecionada:", piece);
    // Define a peça como selecionada
    board.selectedPiece = piece;

    // Calcula os movimentos possíveis e os adiciona à peça selecionada
    const moves = highlightMoves(piece, board);
    console.log("Arquivo rules.ts ~ Movimentos válidos para a peça:", moves);

    board.selectedPiece.highlightedMoves = moves;
  } else {
    // Remove a seleção caso a célula não contenha uma peça válida
    board.selectedPiece = null;
    console.log("Arquivo rules.ts ~ Nenhuma peça válida na posição:", {
      row,
      col,
    });
  }
}

// Função para calcular os movimentos válidos para uma peça
export function highlightMoves(piece: Piece, board: Board): HighlightedMove[] {
  console.log("Arquivo rules.ts ~ Calculando movimentos para a peça:", piece);
  const highlightedMoves: HighlightedMove[] = [];
  console.log("Arquivo rules.ts ~ Movimentos calculados:", highlightedMoves);

  const directions = piece.isQueen
    ? [
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
      ] // Dama: todas as diagonais
    : piece.color === "white"
    ? [
        [-1, 1],
        [-1, -1],
      ] // Branco: apenas para cima
    : [
        [1, 1],
        [1, -1],
      ]; // Preto: apenas para baixo

  // Lógica para movimentação da dama
  if (piece.isQueen) {
    for (let [rowDir, colDir] of directions) {
      let step = 1;
      while (true) {
        const targetRow = piece.row + step * rowDir;
        const targetCol = piece.col + step * colDir;

        if (!isWithinBounds(targetRow, targetCol)) break; // Para se sair do tabuleiro

        const targetCell = getPiece(board, targetRow, targetCol);

        if (!targetCell) {
          // Se o quadrado estiver vazio, adiciona como movimento válido
          highlightedMoves.push({ row: targetRow, col: targetCol });
        } else if (targetCell.color !== piece.color) {
          // Se for uma peça inimiga, verifica se pode capturar
          const jumpRow = targetRow + rowDir;
          const jumpCol = targetCol + colDir;

          if (
            isWithinBounds(jumpRow, jumpCol) &&
            !getPiece(board, jumpRow, jumpCol)
          ) {
            // Adiciona o movimento de captura
            highlightedMoves.push({
              row: jumpRow,
              col: jumpCol,
              capture: targetCell,
            });
          }
          break; // Para ao encontrar uma peça
        } else {
          break; // Para se encontrar uma peça do time
        }
        step++; // Continua na direção atual
      }
    }
  } else {
    // Lógica para movimentação do peão
    for (let [rowDir, colDir] of directions) {
      const targetRow = piece.row + rowDir;
      const targetCol = piece.col + colDir;

      if (!isWithinBounds(targetRow, targetCol)) continue; // Ignora movimentos fora do tabuleiro

      const targetCell = getPiece(board, targetRow, targetCol);

      if (!targetCell) {
        // Se o quadrado estiver vaxio, adiciona como movimento válido
        highlightedMoves.push({ row: targetRow, col: targetCol });
      } else if (targetCell.color !== piece.color) {
        // Se for uma peça inimiga, verifica se pode capturar
        const jumpRow = targetRow + rowDir;
        const jumpCol = targetCol + colDir;

        if (
          isWithinBounds(jumpRow, jumpCol) &&
          !getPiece(board, jumpRow, jumpCol)
        ) {
          // Adiciona o movimento de captura
          highlightedMoves.push({
            row: jumpRow,
            col: jumpCol,
            capture: targetCell,
          });
        }
      }
    }
  }

  return highlightedMoves;
}

export function movePiece(
  board: Board,
  piece: Piece,
  row: number,
  col: number
): boolean {
  const validMove = piece.highlightedMoves.find(
    (move) => move.row === row && move.col === col
    );

  if (!validMove) return false;

  // Remove a peça capturada, se houver
  if (validMove.capture) {
    removePiece(board, validMove.capture.row, validMove.capture.col);
  }

  // Atualiza o grid com a nova posição
  board.grid[piece.row][piece.col] = null; // Remove da posição atual
  board.grid[row][col] = piece; // Move para a nova posição
  // Atualiza os dados da peça
  piece.row = row;
  piece.col = col;

  if (!piece.isQueen && (row === 0 || row === board.size - 1)) {
    piece.isQueen = true;
  }

  board.currentTurn = board.currentTurn === "white" ? "black" : "white";
  board.selectedPiece = null;

  return true;
}

// Função pra obter uma peça de uma posição no tabuleiro
function getPiece(board: Board, row: number, col: number): Piece | null {
  const piece = board.grid[row]?.[col];
  console.log(`Arquivo rules.ts ~ Peça na posição (${row}, ${col}):`, piece);
  return board.grid[row]?.[col] || null;
}

function removePiece(board: Board, row: number, col: number): void {
  board.grid[row][col] = null;
}

// Função pra verificar se a posição está dentro dos limites do tabuleiro
function isWithinBounds(row: number, col: number): boolean {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}
