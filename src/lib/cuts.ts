import { prisma } from "@/lib/prisma";
import { normalizeForSearch } from "@/lib/normalize";

export type CutDTO = {
  slug: string;
  description: string | null;
  names: {
    pt: { name: string; approximate: boolean; notes: string | null };
    en: { name: string; approximate: boolean; notes: string | null };
  };
  hotspots: { x: number; y: number; width: number; height: number; shape: string }[];
};

function fetchCutsWithRelations() {
  return prisma.cut.findMany({
    include: { names: true, hotspots: true },
    orderBy: { slug: "asc" },
  });
}

function toDTO(cut: Awaited<ReturnType<typeof fetchCutsWithRelations>>[number]): CutDTO | null {
  const pt = cut.names.find((n) => n.languageCode === "pt-BR" && !n.regionCode);
  const en = cut.names.find((n) => n.languageCode === "en-US" && !n.regionCode);
  if (!pt || !en) return null;

  return {
    slug: cut.slug,
    description: pt.description ?? en.description ?? null,
    names: {
      pt: { name: pt.name, approximate: pt.approximate, notes: pt.notes },
      en: { name: en.name, approximate: en.approximate, notes: en.notes },
    },
    hotspots: cut.hotspots.map((h) => ({ x: h.x, y: h.y, width: h.width, height: h.height, shape: h.shape })),
  };
}

export async function getAllCuts(): Promise<CutDTO[]> {
  const cuts = await fetchCutsWithRelations();
  return cuts.map(toDTO).filter((cut): cut is CutDTO => cut !== null);
}

export async function searchCuts(query: string): Promise<CutDTO[]> {
  const normalized = normalizeForSearch(query);
  if (!normalized) return [];

  const cuts = await prisma.cut.findMany({
    where: {
      names: {
        some: {
          OR: [{ normalizedName: { contains: normalized } }, { normalizedDescription: { contains: normalized } }],
        },
      },
    },
    include: { names: true, hotspots: true },
    orderBy: { slug: "asc" },
  });

  return cuts.map(toDTO).filter((cut): cut is CutDTO => cut !== null);
}
