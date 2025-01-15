import Pieces from "./pieces";

export default function Board() {
  return (
    <section
      id="game-board"
      className="w-full max-w-4xl mx-auto text-center"
    >
      <div
        className="grid grid-cols-8 w-full max-w-2xl mx-auto aspect-square border-2 border-gray-800 rounded-lg overflow-hidden bg-gray-200"
      >
        <Pieces />
      </div>
    </section>
  );
}
