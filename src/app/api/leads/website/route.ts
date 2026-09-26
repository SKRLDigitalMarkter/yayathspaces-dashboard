import { NextResponse } from "next/server";
import { appendLead } from "@/lib/sheets";
import type { Lead } from "@/lib/types";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    if (!name || !emailPattern.test(email) || !phone || !message) {
      return NextResponse.json({ success: false, error: "Name, valid email, phone, and message are required." }, { status: 400 });
    }

    const lead: Lead = { id: `website_${crypto.randomUUID()}`, source: "website", name, email, phone, message, createdAt: new Date().toISOString(), status: "New" };
    await appendLead(lead);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save lead.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
