import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { normalizeForSearch } from "../src/lib/normalize";
import { cutSeeds } from "./seedData";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.language.upsert({
    where: { code: "pt-BR" },
    update: {},
    create: { code: "pt-BR", name: "Portuguese (Brazil)" },
  });
  await prisma.language.upsert({
    where: { code: "en-US" },
    update: {},
    create: { code: "en-US", name: "English (US)" },
  });

  for (const seed of cutSeeds) {
    const cut = await prisma.cut.upsert({
      where: { slug: seed.slug },
      update: {},
      create: { slug: seed.slug },
    });

    for (const [languageCode, entry] of [
      ["pt-BR", seed.pt] as const,
      ["en-US", seed.en] as const,
    ]) {
      // Prisma's compound-unique upsert doesn't accept `null` for a nullable
      // field (regionCode), so the standard (non-regional) name is upserted
      // manually via findFirst + update/create instead. Look up by
      // cutId+languageCode+regionCode only (not `name`) so a changed
      // translation updates the existing row instead of creating a duplicate.
      const data = {
        name: entry.name,
        normalizedName: normalizeForSearch(entry.name),
        approximate: "approximate" in entry ? Boolean(entry.approximate) : false,
        notes: "notes" in entry ? (entry.notes ?? null) : null,
        description: seed.description ?? null,
        normalizedDescription: seed.description ? normalizeForSearch(seed.description) : null,
      };
      const existing = await prisma.cutName.findFirst({
        where: { cutId: cut.id, languageCode, regionCode: null },
      });
      if (existing) {
        await prisma.cutName.update({ where: { id: existing.id }, data });
      } else {
        await prisma.cutName.create({
          data: { cutId: cut.id, languageCode, ...data },
        });
      }
    }

    await prisma.hotspot.deleteMany({ where: { cutId: cut.id } });
    if (seed.hotspot) {
      await prisma.hotspot.create({
        data: {
          cutId: cut.id,
          x: seed.hotspot.x,
          y: seed.hotspot.y,
          width: seed.hotspot.width,
          height: seed.hotspot.height,
        },
      });
    }
  }

  console.log(`Seeded ${cutSeeds.length} cuts.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
