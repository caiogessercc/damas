import { cn } from "~/utils/cn";

export default function Piece({ color, isQueen, isSelected, }: { color: "white" | "black"; isQueen: boolean; isSelected: boolean; }) {
  return (
    <div
      className={cn(
        "w-3/4 h-3/4 rounded-full",
        color === "white" ? "bg-white" : "bg-black",
        isSelected && "ring-4 ring-yellow-500"
      )}
    >
      {isQueen && (
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center text-lg",
            color === "white" ? "text-gray-800" : "text-gray-200"
          )}
        >
          👑
        </span>
      )}
    </div>
  );
}
