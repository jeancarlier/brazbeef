import { NextRequest, NextResponse } from "next/server";
import { searchCuts } from "@/lib/cuts";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";
  const cuts = await searchCuts(query);
  return NextResponse.json(cuts);
}
