import { NextResponse } from "next/server";
import { appendLead, getSyncCursor, setSyncState } from "@/lib/sheets";
import type { Lead } from "@/lib/types";

function authorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  return !secret || request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const token = process.env.META_ACCESS_TOKEN;
  const accountId = process.env.META_AD_ACCOUNT_ID;
  if (!token || !accountId) return NextResponse.json({ error: "Meta Ads is not configured." }, { status: 503 });

  try {
    const cursor = await getSyncCursor("meta_ads");
    const configuredForms = (process.env.META_LEAD_FORM_IDS ?? "").split(",").map((id) => id.trim()).filter(Boolean);
    const formUrl = configuredForms.length ? null : `https://graph.facebook.com/v21.0/${accountId}/leadgen_forms?fields=id&limit=100&access_token=${encodeURIComponent(token)}`;
    const formResponse = formUrl ? await fetch(formUrl, { cache: "no-store" }) : null;
    const forms = configuredForms.length ? configuredForms : ((await formResponse?.json())?.data ?? []).map((form: { id: string }) => form.id);
    let imported = 0;
    let newest = cursor ?? "";
    for (const formId of forms) {
      const url = `https://graph.facebook.com/v21.0/${formId}/leads?fields=id,created_time,field_data,campaign_name&limit=100&access_token=${encodeURIComponent(token)}`;
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) throw new Error(`Meta API returned ${response.status}.`);
      const payload = await response.json() as { data?: Array<{ id: string; created_time: string; field_data?: Array<{ name: string; values?: string[] }>; campaign_name?: string }> };
      for (const item of (payload.data ?? []).filter((lead) => !cursor || lead.id > cursor)) {
        const fields = Object.fromEntries((item.field_data ?? []).map((field) => [field.name.toLowerCase(), field.values?.[0] ?? ""]));
        const lead: Lead = { id: item.id, source: "meta_ads", name: fields.full_name || fields.name || "Meta lead", email: fields.email || "", phone: fields.phone_number || fields.phone || "", message: fields.message || "Lead Ads form submission", createdAt: item.created_time, campaign: item.campaign_name || formId, status: "New" };
        await appendLead(lead);
        imported += 1;
        newest = item.id;
      }
    }
    await setSyncState("meta_ads", { cursor: newest, lastSuccess: new Date().toISOString(), error: "" });
    return NextResponse.json({ success: true, imported });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Meta sync failed.";
    await setSyncState("meta_ads", { error: message });
    return NextResponse.json({ success: false, error: message }, { status: 502 });
  }
}
