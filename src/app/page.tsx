import { getAllCuts } from "@/lib/cuts";
import { CutExplorer } from "@/components/CutExplorer";

export default async function Home() {
  const cuts = await getAllCuts();

  return (
    <main className="flex-1 mx-auto w-full max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-bold mb-1">BrazBeef</h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-6">
        Encontre o nome em inglês dos cortes de carne bovina brasileiros.
      </p>
      <CutExplorer cuts={cuts} />
    </main>
  );
}
