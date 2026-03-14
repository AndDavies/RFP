# RFP Intelligence

Production-ready SaaS scaffold for an AI-powered government procurement platform.

## Tech Stack

- Next.js 16.1.6 (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS + ShadCN-style UI components
- Supabase Auth + PostgreSQL
- Vercel deployment target

## Project Structure

```text
app/
  layout.tsx
  page.tsx
  auth-actions.ts
  globals.css
  login/page.tsx
  signup/page.tsx
  admin/
    layout.tsx
    ingestion/
      loading.tsx
      page.tsx
  api/
    ingest/
      rfp/
        route.ts
  dashboard/
    layout.tsx
    loading.tsx
    page.tsx
    opportunities/page.tsx
    analysis/page.tsx
    proposals/page.tsx
    company-profile/page.tsx
    settings/page.tsx

components/
  admin/
    RawPayloadViewer.tsx
  ui/
    button.tsx
    card.tsx
    input.tsx
    label.tsx
    table.tsx
  layout/
    auth-card.tsx
    site-nav.tsx
  dashboard/
    header.tsx
    sidebar.tsx
    opportunities-table.tsx
    placeholder-section.tsx

lib/
  utils.ts
  security/
    validateIngestionToken.ts
  supabase/
    client.ts
    server.ts
    middleware.ts

services/
  company/
    getProfile.ts
  ingestion/
    approveRecord.ts
    getRawRecords.ts
    rejectRecord.ts
    storeRawRFP.ts
  proposals/
    getProposals.ts
  rfp/
    getAnalysis.ts
    getOpportunities.ts

types/
  company.ts
  ingestion.ts
  proposal.ts
  rfp.ts

hooks/
  use-auth-user.ts

supabase/
  config.toml
  seed.sql
  migrations/
    20260313195900_init_rfp_intelligence_schema.sql

docs/
  PRD.md
  13032026.md

proxy.ts
```

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

3. Start the development server:

```bash
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

## Supabase Configuration

1. Create a project in Supabase.
2. In **Authentication > Providers**, enable Email auth.
3. In **Authentication > URL Configuration**, set:
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/**`
4. Copy Project URL + Anon key into `.env.local`.

## Auth Flow

- `/login` and `/signup` use Supabase server actions.
- Successful authentication redirects users to `/dashboard`.
- `/dashboard/*` routes are protected by middleware + server checks.

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Import the project into Vercel.
3. Add environment variables in Vercel Project Settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy.

Vercel auto-detects Next.js and builds with:

```bash
npm run build
```
