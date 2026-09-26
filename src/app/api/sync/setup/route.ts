import { NextResponse } from "next/server";
import { ensureSheetHeaders } from "@/lib/sheets";

export async function GET(request: Request) {
  if (process.env.CRON_SECRET && request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await ensureSheetHeaders();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to initialize Sheet tabs." }, { status: 500 });
  }
}
