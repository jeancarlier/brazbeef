import type { CutDTO } from "@/lib/cuts";

type CutInfoPanelProps = {
  cut: CutDTO | null;
};

export function CutInfoPanel({ cut }: CutInfoPanelProps) {
  if (!cut) {
    return (
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 text-zinc-500 dark:text-zinc-400">
        Busque um corte em português ou clique em um ponto no diagrama.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 space-y-3">
      <div>
        <span className="text-xs uppercase tracking-wide text-zinc-500">Português</span>
        <p className="text-lg font-semibold">{cut.names.pt.name}</p>
      </div>
      <div>
        <span className="text-xs uppercase tracking-wide text-zinc-500">English</span>
        <p className="text-lg font-semibold">{cut.names.en.name}</p>
      </div>
      {cut.names.en.approximate && (
        <p className="text-sm text-amber-600 dark:text-amber-400">
          Tradução aproximada{cut.names.en.notes ? `: ${cut.names.en.notes}` : "."}
        </p>
      )}
      {cut.description && (
        <div>
          <span className="text-xs uppercase tracking-wide text-zinc-500">Uso culinário</span>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">{cut.description}</p>
        </div>
      )}
    </div>
  );
}
