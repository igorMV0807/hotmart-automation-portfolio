# Hotmart Recovery Dashboard — Synthetic Portfolio Demo

This Next.js dashboard is the public companion to the sanitized n8n workflow. It starts in a synthetic, disconnected mode and does not require Supabase, Gmail, Hotmart, or any other external account.

## Safe default

`PORTFOLIO_DEMO_MODE=true` is the default in `.env.example`.

In this mode:

- authentication is bypassed with a fictional `example.com` identity;
- all journeys, events, emails, transaction IDs, and values come from `lib/demo-data.ts`;
- no Supabase client is called;
- no external request is required for application data;
- a visible banner identifies the demo as synthetic.

## Run locally

```powershell
Copy-Item .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`.

## Screens

- overview metrics and charts;
- purchase/recovery journeys;
- journey timeline;
- email-delivery analytics;
- event-processing visibility.

## Verified calculation behavior

The original read-only adapter:

- paginates Supabase reads in batches of 1,000;
- calculates recovered revenue and sales from recovered journeys;
- calculates recovery rate as recovered emailed journeys divided by distinct emailed journeys;
- groups recovery by day and stage;
- infers recovery flow from the latest `SENT` log before approval when needed;
- excludes open, click, and CTR because the reviewed backend does not record them.

## External-data adapter

The original Supabase adapter remains for code/architecture inspection. Do not enable it in a public deployment. If it is ever tested, use only an isolated Supabase project containing synthetic data and complete a separate security review first.

Never place production values in `.env.local` for this repository.

## Commands

```powershell
npm run dev
npm run typecheck
npm run build
npm start
```

