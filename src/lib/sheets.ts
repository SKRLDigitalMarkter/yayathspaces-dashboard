import { google } from "googleapis";
import type { Lead, LeadSource, SyncStatus } from "./types";

const TAB_NAMES = ["WebsiteLeads", "MetaAdsLeads", "GoogleAdsLeads"] as const;
const META_TAB = "_meta";
const HEADERS = ["id", "name", "email", "phone", "message", "createdAt", "campaign", "status"];

type SheetRow = Record<string, string>;

function getConfig() {
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!credentials || !spreadsheetId) {
    throw new Error("Google Sheets is not configured. Set GOOGLE_SERVICE_ACCOUNT_JSON and GOOGLE_SHEET_ID.");
  }

  let parsedCredentials: { client_email: string; private_key: string };
  try {
    parsedCredentials = JSON.parse(credentials) as { client_email: string; private_key: string };
  } catch {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON must be valid JSON.");
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: parsedCredentials.client_email,
      private_key: parsedCredentials.private_key.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return { sheets: google.sheets({ version: "v4", auth }), spreadsheetId };
}

export function sourceToTab(source: LeadSource) {
  return source === "website" ? "WebsiteLeads" : source === "meta_ads" ? "MetaAdsLeads" : "GoogleAdsLeads";
}

function rowsToObjects(rows: string[][] | null | undefined): SheetRow[] {
  if (!rows?.length) return [];
  const [headers, ...data] = rows;
  return data.map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ""])));
}

export async function appendLead(lead: Lead) {
  const { sheets, spreadsheetId } = getConfig();
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sourceToTab(lead.source)}!A:H`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [[lead.id, lead.name, lead.email, lead.phone, lead.message, lead.createdAt, lead.campaign ?? "", lead.status ?? "New"]] },
  });
}

export async function readLeads(source: LeadSource): Promise<Lead[]> {
  const { sheets, spreadsheetId } = getConfig();
  const response = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${sourceToTab(source)}!A:H` });
  return rowsToObjects(response.data.values).map((row) => ({
    id: row.id,
    source,
    name: row.name,
    email: row.email,
    phone: row.phone,
    message: row.message,
    createdAt: row.createdAt,
    campaign: row.campaign,
    status: row.status,
  }));
}

export async function readSyncStatuses(): Promise<SyncStatus[]> {
  const { sheets, spreadsheetId } = getConfig();
  const response = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${META_TAB}!A:C` });
  const rows = rowsToObjects(response.data.values);
  return (["website", "meta_ads", "google_ads"] as LeadSource[]).map((source) => {
    const row = rows.find((item) => item.source === source);
    return {
      source,
      label: source === "website" ? "Website" : source === "meta_ads" ? "Meta Ads" : "Google Ads",
      lastSuccess: row?.lastSuccess || null,
      error: row?.error || null,
    };
  });
}

export async function getSyncCursor(source: LeadSource) {
  const { sheets, spreadsheetId } = getConfig();
  const response = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${META_TAB}!A:D` });
  const row = rowsToObjects(response.data.values).find((item) => item.source === source);
  return row?.cursor || null;
}

export async function setSyncState(source: LeadSource, state: { cursor?: string; lastSuccess?: string; error?: string }) {
  const { sheets, spreadsheetId } = getConfig();
  const response = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${META_TAB}!A:D` });
  const rows = response.data.values ?? [["source", "lastSuccess", "error", "cursor"]];
  const index = rows.findIndex((row) => row[0] === source);
  const next = [source, state.lastSuccess ?? rows[index]?.[1] ?? "", state.error ?? "", state.cursor ?? rows[index]?.[3] ?? ""];
  if (index === -1) {
    await sheets.spreadsheets.values.append({ spreadsheetId, range: `${META_TAB}!A:D`, valueInputOption: "USER_ENTERED", requestBody: { values: [next] } });
  } else {
    await sheets.spreadsheets.values.update({ spreadsheetId, range: `${META_TAB}!A${index + 2}:D${index + 2}`, valueInputOption: "USER_ENTERED", requestBody: { values: [next] } });
  }
}

export async function ensureSheetHeaders() {
  const { sheets, spreadsheetId } = getConfig();
  for (const tab of TAB_NAMES) {
    await sheets.spreadsheets.values.update({ spreadsheetId, range: `${tab}!A1:H1`, valueInputOption: "RAW", requestBody: { values: [HEADERS] } });
  }
  await sheets.spreadsheets.values.update({ spreadsheetId, range: `${META_TAB}!A1:D1`, valueInputOption: "RAW", requestBody: { values: [["source", "lastSuccess", "error", "cursor"]] } });
}
