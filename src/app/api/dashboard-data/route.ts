import { NextResponse } from "next/server";
import { readLeads, readSyncStatuses } from "@/lib/sheets";
import type { LeadSource } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sources: LeadSource[] = ["website", "meta_ads", "google_ads"];
    const [leadGroups, syncStatus] = await Promise.all([Promise.all(sources.map(readLeads)), readSyncStatuses()]);
    const leads = leadGroups.flat().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return NextResponse.json({ leads, syncStatus, generatedAt: new Date().toISOString() });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to read dashboard data.";
    return NextResponse.json({ leads: [], syncStatus: [], error: message, generatedAt: new Date().toISOString() }, { status: 503 });
  }
}
