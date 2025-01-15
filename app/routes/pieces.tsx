export default function Pieces() {
  const rowsToFill = 3; // Quantidade de linhas preenchidas por cada cor
  const boardSize = 8; // Tamanho do tabuleiro (8x8)

  return (
    <>
      {Array.from({ length: boardSize }, (_, rowIndex) => (
        Array.from({ length: boardSize }, (_, colIndex) => {
          const isBlackCell = (rowIndex + colIndex) % 2 !== 0; // Casas pretas apenas
          let piece;

          // Adicionar peças pretas no topo
          if (rowIndex < rowsToFill && isBlackCell) {
            piece = (
              <div className="w-3/4 h-3/4 rounded-full bg-black border-2 border-gray-600"></div>
            );
          }

          // Adicionar peças brancas na base
          if (rowIndex >= boardSize - rowsToFill && isBlackCell) {
            piece = (
              <div className="w-3/4 h-3/4 rounded-full bg-white border-2 border-gray-600"></div>
            );
          }

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`relative flex items-center justify-center ${ isBlackCell ? "bg-gray-800" : "bg-gray-200" } aspect-square`}
            >
              {piece}
            </div>
          );
        })
      ))}
    </>
  );
}
