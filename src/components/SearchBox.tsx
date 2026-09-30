"use client";

import { useMemo, useState } from "react";
import type { CutDTO } from "@/lib/cuts";
import { normalizeForSearch } from "@/lib/normalize";

type SearchBoxProps = {
  cuts: CutDTO[];
  onSelect: (slug: string) => void;
};

export function SearchBox({ cuts, onSelect }: SearchBoxProps) {
  const [query, setQuery] = useState("");

  const matches = useMemo(() => {
    const normalized = normalizeForSearch(query);
    if (!normalized) return [];
    return cuts.filter((cut) => {
      const ptMatches = normalizeForSearch(cut.names.pt.name).includes(normalized);
      const enMatches = normalizeForSearch(cut.names.en.name).includes(normalized);
      const descriptionMatches = cut.description ? normalizeForSearch(cut.description).includes(normalized) : false;
      return ptMatches || enMatches || descriptionMatches;
    });
  }, [cuts, query]);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Buscar em português ou inglês (ex: picanha, brisket, churrasco)"
        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-base"
      />
      {matches.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg max-h-72 overflow-auto">
          {matches.map((cut) => (
            <li key={cut.slug}>
              <button
                type="button"
                className="w-full text-left px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                onClick={() => {
                  onSelect(cut.slug);
                  setQuery(cut.names.pt.name);
                }}
              >
                <div>
                  {cut.names.pt.name} <span className="text-zinc-500 dark:text-zinc-400">({cut.names.en.name})</span>
                </div>
                {cut.description && (
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{cut.description}</div>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
