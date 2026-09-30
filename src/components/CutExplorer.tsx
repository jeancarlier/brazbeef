"use client";

import { useMemo, useState } from "react";
import type { CutDTO } from "@/lib/cuts";
import { SearchBox } from "./SearchBox";
import { CutInfoPanel } from "./CutInfoPanel";
import { CowDiagram } from "./diagram/CowDiagram";

type CutExplorerProps = {
  cuts: CutDTO[];
};

export function CutExplorer({ cuts }: CutExplorerProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const selectedCut = useMemo(
    () => cuts.find((cut) => cut.slug === selectedSlug) ?? null,
    [cuts, selectedSlug],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-4">
        <SearchBox cuts={cuts} onSelect={setSelectedSlug} />
        <CowDiagram cuts={cuts} selectedSlug={selectedSlug} onSelect={setSelectedSlug} />
      </div>
      <CutInfoPanel cut={selectedCut} />
    </div>
  );
}
