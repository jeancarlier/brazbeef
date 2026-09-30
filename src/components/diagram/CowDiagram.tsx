import type { CutDTO } from "@/lib/cuts";
import { CutHotspot } from "./CutHotspot";

type CowDiagramProps = {
  cuts: CutDTO[];
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
};

export function CowDiagram({ cuts, selectedSlug, onSelect }: CowDiagramProps) {
  return (
    <div className="relative w-full rounded-lg bg-[#f4f1ea]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/beefCuts.svg" alt="Diagrama de cortes bovinos" className="block w-full h-auto" />
      <svg
        viewBox="0 0 450.56 245.76"
        role="img"
        aria-label="Áreas clicáveis dos cortes"
        className="absolute inset-0 w-full h-full"
      >
        {cuts.flatMap((cut) =>
          cut.hotspots.map((hotspot, index) => (
            <CutHotspot
              key={`${cut.slug}-${index}`}
              slug={cut.slug}
              x={hotspot.x}
              y={hotspot.y}
              width={hotspot.width}
              height={hotspot.height}
              isSelected={cut.slug === selectedSlug}
              onSelect={onSelect}
            />
          )),
        )}
      </svg>
    </div>
  );
}
