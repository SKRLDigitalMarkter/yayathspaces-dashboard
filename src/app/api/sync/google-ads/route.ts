import { NextResponse } from "next/server";
import { appendLead, getSyncCursor, setSyncState } from "@/lib/sheets";

function authorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  return !secret || request.headers.get("authorization") === `Bearer ${secret}`;
}

async function getAccessToken() {
  const response = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ client_id: process.env.GOOGLE_ADS_CLIENT_ID ?? "", client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET ?? "", refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN ?? "", grant_type: "refresh_token" }) });
  if (!response.ok) throw new Error(`Google OAuth returned ${response.status}.`);
  return (await response.json() as { access_token: string }).access_token;
}

export async function GET(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const required = ["GOOGLE_ADS_CLIENT_ID", "GOOGLE_ADS_CLIENT_SECRET", "GOOGLE_ADS_REFRESH_TOKEN", "GOOGLE_ADS_DEVELOPER_TOKEN", "GOOGLE_ADS_CUSTOMER_ID"];
  if (required.some((key) => !process.env[key])) return NextResponse.json({ error: "Google Ads is not configured." }, { status: 503 });

  try {
    const accessToken = await getAccessToken();
    const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID!.replace(/-/g, "");
    const query = `SELECT lead_form_submission_data.lead_form_submission, lead_form_submission_data.submission_date_time, lead_form_submission_data.asset, lead_form_submission_data.gclid FROM lead_form_submission_data WHERE lead_form_submission_data.submission_date_time DURING LAST_30_DAYS`;
    const response = await fetch(`https://googleads.googleapis.com/v20/customers/${customerId}/googleAds:searchStream`, { method: "POST", headers: { Authorization: `Bearer ${accessToken}`, "developer-token": process.env.GOOGLE_ADS_DEVELOPER_TOKEN!, ...(process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID ? { "login-customer-id": process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID.replace(/-/g, "") } : {}), "content-type": "application/json" }, body: JSON.stringify({ query }) });
    if (!response.ok) throw new Error(`Google Ads API returned ${response.status}.`);
    const batches = await response.json() as Array<{ results?: Array<{ leadFormSubmissionData?: { leadFormSubmission?: { resourceName?: string; leadFormFields?: Array<{ fieldType?: string; userInput?: string }> }; submissionDateTime?: string } }> }>;
    const cursor = await getSyncCursor("google_ads");
    let imported = 0;
    let newest = cursor ?? "";
    for (const result of batches.flatMap((batch) => batch.results ?? [])) {
      const submission = result.leadFormSubmissionData?.leadFormSubmission;
      const id = submission?.resourceName ?? "";
      if (!id || (cursor && id <= cursor)) continue;
      const fields = Object.fromEntries((submission?.leadFormFields ?? []).map((field) => [field.fieldType?.toLowerCase() ?? "", field.userInput ?? ""]));
      await appendLead({ id, source: "google_ads", name: fields.full_name || fields.name || "Google lead", email: fields.email || "", phone: fields.phone_number || fields.phone || "", message: fields.message || "Lead form submission", createdAt: result.leadFormSubmissionData?.submissionDateTime ?? new Date().toISOString(), status: "New" });
      imported += 1;
      newest = id;
    }
    await setSyncState("google_ads", { cursor: newest, lastSuccess: new Date().toISOString(), error: "" });
    return NextResponse.json({ success: true, imported });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Google Ads sync failed.";
    await setSyncState("google_ads", { error: message });
    return NextResponse.json({ success: false, error: message }, { status: 502 });
  }
}
