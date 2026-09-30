import { NextResponse } from "next/server";
import { getAllCuts } from "@/lib/cuts";

export async function GET() {
  const cuts = await getAllCuts();
  return NextResponse.json(cuts);
}
