type CutHotspotProps = {
  slug: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isSelected: boolean;
  onSelect: (slug: string) => void;
};

export function CutHotspot({ slug, x, y, width, height, isSelected, onSelect }: CutHotspotProps) {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={2}
      ry={2}
      fill={isSelected ? "rgba(212,175,55,0.45)" : "transparent"}
      stroke={isSelected ? "#d4af37" : "transparent"}
      strokeWidth={isSelected ? 1.2 : 0}
      onClick={() => onSelect(slug)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onSelect(slug);
      }}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      className="cursor-pointer focus:outline-none"
      style={{ pointerEvents: "all" }}
    />
  );
}
