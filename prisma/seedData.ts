export type CutSeed = {
  slug: string;
  pt: { name: string };
  en: { name: string; approximate?: boolean; notes?: string };
  description?: string;
  hotspot?: { x: number; y: number; width: number; height: number };
};

// Hotspot coordinates are measured directly against the labels drawn into
// public/beefCuts.svg (viewBox 0 0 450.56 245.76), by clicking each label in
// the running app and logging the exact viewBox-space cursor position. The
// artwork bakes the PT label into the image itself, so hotspots here are
// just invisible clickable/highlightable areas over each printed label — no
// separate text is rendered by the app. Cuts with no `hotspot` (e.g. ground
// beef) aren't part of the diagram and are only reachable via search.
//
// EN names are a hand-curated data-entry task, not a mechanical translation:
// Brazilian and American butchery don't map 1:1 (see `approximate`/`notes`).
// Cuts still marked TODO_EN_NAME are awaiting curation.
//
// `description` is a short PT usage/recipe note (also searchable, so e.g.
// "churrasco" surfaces grill-friendly cuts) — written from general culinary
// knowledge, not user-verified, so treat it like the other curated fields.
export const cutSeeds: CutSeed[] = [
  {
    slug: "pescoco",
    pt: { name: "Pescoço" },
    en: { name: "TODO_EN_NAME" },
    description: "Corte fibroso, ótimo para caldos, cozidos longos e carne moída.",
    hotspot: { x: 110, y: 51, width: 16, height: 18 },
  },
  {
    slug: "cupim",
    pt: { name: "Cupim" },
    en: { name: "Zebu Hump", approximate: true, notes: "Zebu-specific cut; no equivalent in American butchery." },
    description: "Muito usado no churrasco, assado lentamente; corte típico de zebuínos.",
    hotspot: { x: 154, y: 17, width: 30, height: 9 },
  },
  {
    slug: "acem",
    pt: { name: "Acém" },
    en: { name: "Chuck" },
    description: "Ótimo para cozidos, ensopados e carne moída.",
    hotspot: { x: 142, y: 50, width: 24, height: 9 },
  },
  {
    slug: "peito",
    pt: { name: "Peito" },
    en: { name: "Brisket" },
    description: "Ideal para cozidos longos e defumados (brisket).",
    hotspot: { x: 114, y: 119, width: 22, height: 9 },
  },
  {
    slug: "paleta",
    pt: { name: "Paleta" },
    en: { name: "TODO_EN_NAME" },
    description: "Boa para cozidos e carne desfiada.",
    hotspot: { x: 147, y: 103, width: 24, height: 9 },
  },
  {
    slug: "contrafile",
    pt: { name: "Contrafilé" },
    en: { name: "Striploin (New York Strip)" },
    description: "Conhecido pelo bom marmoreio; ótimo para bifes grelhados.",
    hotspot: { x: 219, y: 44, width: 50, height: 9 },
  },
  {
    slug: "costela",
    pt: { name: "Costela" },
    en: { name: "Rib / Short Ribs" },
    description: "Ideal para churrasco lento, assada inteira ou em tiras/pedaços.",
    hotspot: { x: 191, y: 80, width: 28, height: 9 },
  },
  {
    slug: "file-mignon",
    pt: { name: "Filé Mignon" },
    en: { name: "Tenderloin" },
    description: "Corte muito macio e valorizado; ótimo para grelhados rápidos e medalhões.",
    hotspot: { x: 255, y: 59, width: 42, height: 8 },
  },
  {
    slug: "fraldinha",
    pt: { name: "Fraldinha" },
    en: { name: "Flank (Flank Steak)" },
    description: "Boa para churrasco em tiras ou grelhada.",
    hotspot: { x: 246, y: 119, width: 38, height: 9 },
  },
  {
    slug: "vazio",
    pt: { name: "Vazio" },
    en: { name: "TODO_EN_NAME" },
    description: "Corte magro, bom para grelhar em tiras finas.",
    hotspot: { x: 198, y: 121, width: 24, height: 9 },
  },
  {
    slug: "picanha",
    pt: { name: "Picanha" },
    en: { name: "Top Sirloin Cap" },
    description:
      "Clássica do churrasco, assada inteira ou em bifes grossos. Pode ser necessário procurar em açougues especializados ou latinos, pois não é um corte padrão de prateleira nos supermercados canadenses.",
    hotspot: { x: 331, y: 35, width: 30, height: 13 },
  },
  {
    slug: "alcatra",
    pt: { name: "Alcatra" },
    en: { name: "Top Sirloin" },
    description: "Versátil: geralmente fatiada em bifes ou assados; boa também na churrasqueira.",
    hotspot: { x: 310, y: 57, width: 28, height: 9 },
  },
  {
    slug: "maminha",
    pt: { name: "Maminha" },
    en: { name: "Bottom Sirloin (Tri-Tip)" },
    description: "Ótima assada inteira na churrasqueira.",
    hotspot: { x: 339, y: 71, width: 28, height: 8 },
  },
  {
    slug: "coxao-mole",
    pt: { name: "Coxão Mole" },
    en: { name: "Topside (Inside Round)" },
    description: "Bom para bifes grelhados e carne de panela.",
    hotspot: { x: 303, y: 83, width: 28, height: 15 },
  },
  {
    slug: "coxao-duro",
    pt: { name: "Coxão Duro" },
    en: { name: "Outside Round" },
    description: "Corte mais rígido; melhor para cozidos e carne desfiada.",
    hotspot: { x: 332, y: 81, width: 28, height: 15 },
  },
  {
    slug: "patinho",
    pt: { name: "Patinho" },
    en: { name: "Beef Knuckle (Sirloin Tip)" },
    description: "Bom para bifes à milanesa, ensopados ou carne moída.",
    hotspot: { x: 333, y: 107, width: 26, height: 8 },
  },
  {
    slug: "lagarto",
    pt: { name: "Lagarto" },
    en: { name: "TODO_EN_NAME" },
    description: "Ótimo para rosbife e cozidos.",
    hotspot: { x: 328, y: 122, width: 27, height: 8 },
  },
  {
    slug: "musculo",
    pt: { name: "Músculo" },
    en: { name: "Shank" },
    description: "Ideal para caldos, sopas e cozidos longos.",
    hotspot: { x: 329, y: 134, width: 33, height: 15 },
  },
  {
    slug: "carne-moida",
    pt: { name: "Carne Moída" },
    en: { name: "Ground Beef" },
    description: "Usada em hambúrgueres, molhos e recheios.",
  },
];
