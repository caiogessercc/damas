import Board from "~/routes/board";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <header className="w-full max-w-4xl text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">
          <span className="text-gray-800">Damas</span>
          <span>.js</span>
        </h1>
      </header>
      <main className="w-full max-w-4xl">
        <Board />
      </main>
    </div>
  );
}
