import { cn } from "~/utils/cn";

export default function Square({ isBlack, isHighlighted, children, onClick, }: { isBlack: boolean; isHighlighted: boolean; children?: React.ReactNode; onClick: () => void; }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative flex items-center justify-center aspect-square",
        isBlack ? "bg-gray-800" : "bg-gray-200",
        isHighlighted && "border-4 border-yellow-500"
      )}
    >
      {children}
    </div>
  );
}