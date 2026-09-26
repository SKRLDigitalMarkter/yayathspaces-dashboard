# YAYATHSPACES Lead Desk

A Next.js App Router dashboard that centralizes website, Meta Lead Ads, and Google Ads leads in one Google Sheet. The browser only calls this app's normalized API; service-account, ad-platform, and OAuth credentials stay server-side.

## Run locally

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Google Sheet setup

1. In Google Cloud Console, enable Google Sheets API and create a service account.
2. Create a JSON key for that service account. Put it in `GOOGLE_SERVICE_ACCOUNT_JSON` as shown in `.env.example`.
3. Create a Google Sheet and share it with the service account `client_email` as an Editor. Set its ID in `GOOGLE_SHEET_ID`.
4. Add tabs named exactly `WebsiteLeads`, `MetaAdsLeads`, `GoogleAdsLeads`, and `_meta`. The first three need columns `id`, `name`, `email`, `phone`, `message`, `createdAt`, `campaign`, `status`; `_meta` needs `source`, `lastSuccess`, `error`, `cursor`.
5. Initialize headers once:

```bash
curl -H "Authorization: Bearer YOUR_CRON_SECRET" http://localhost:3000/api/sync/setup
```

The website form writes `{ name, email, phone, message }` to `POST /api/leads/website`.

## Ad credentials

For Meta, create a System User access token with `leads_retrieval` and `ads_read`, then provide `META_ACCESS_TOKEN`, `META_AD_ACCOUNT_ID`, and optionally comma-separated `META_LEAD_FORM_IDS`.

For Google Ads, provide `GOOGLE_ADS_CLIENT_ID`, `GOOGLE_ADS_CLIENT_SECRET`, `GOOGLE_ADS_REFRESH_TOKEN`, `GOOGLE_ADS_DEVELOPER_TOKEN`, and `GOOGLE_ADS_CUSTOMER_ID`. Set `GOOGLE_ADS_LOGIN_CUSTOMER_ID` when using an MCC. The sync uses the Google Ads lead form submission resource.

All variables and where to obtain them are listed in `.env.example`. Never commit `.env.local` or real credentials.

## Sync and deployment

`GET /api/sync/meta-ads` and `GET /api/sync/google-ads` accept `Authorization: Bearer $CRON_SECRET` and are scheduled daily by `vercel.json`, which is compatible with Vercel Hobby. The endpoints remain manually runnable, and an external free scheduler can call them more frequently when needed. The `_meta` tab stores the last successful sync and cursor, preventing repeat imports and exposing source-specific errors in the dashboard.

1. Import this folder into Vercel.
2. Add every variable from `.env.example` in Vercel Project Settings.
3. Deploy. Vercel reads `vercel.json` and creates the two cron jobs.
4. Submit a test website lead and confirm it appears in `WebsiteLeads`.

## API routes

- `POST /api/leads/website`: validates and appends a website enquiry.
- `GET /api/dashboard-data`: returns normalized leads and per-source sync status.
- `GET /api/sync/meta-ads`: imports Meta Lead Ads submissions after the stored cursor.
- `GET /api/sync/google-ads`: imports Google Ads lead form submissions after the stored cursor.
- `GET /api/sync/setup`: writes required headers to the configured tabs.

## Checks

```bash
npm run lint
npm run build
```
