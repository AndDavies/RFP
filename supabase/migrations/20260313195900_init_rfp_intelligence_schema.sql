-- RFP Intelligence core schema
-- Migration-only approach for Supabase/PostgreSQL

create extension if not exists pgcrypto with schema extensions;
create extension if not exists vector with schema extensions;

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  industry text,
  size text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'admin', 'member', 'viewer')),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.rfp_sources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  base_url text not null,
  scrape_method text not null check (scrape_method in ('api', 'rss', 'html', 'pdf', 'manual', 'other')),
  active boolean not null default true,
  last_scraped timestamptz,
  -- Optional config to support external scraping agent orchestration.
  scrape_config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.rfps (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references public.rfp_sources(id) on delete restrict,
  title text not null,
  agency text not null,
  description text,
  location text,
  budget numeric(14,2),
  deadline timestamptz,
  source_url text not null,
  -- Helps idempotent ingest from upstream source systems.
  source_external_id text,
  raw_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.rfp_documents (
  id uuid primary key default gen_random_uuid(),
  rfp_id uuid not null references public.rfps(id) on delete cascade,
  document_type text not null,
  file_url text not null,
  extracted_text text,
  raw_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.rfp_analysis (
  id uuid primary key default gen_random_uuid(),
  rfp_id uuid not null unique references public.rfps(id) on delete cascade,
  summary text,
  key_requirements jsonb not null default '[]'::jsonb,
  risk_level text check (risk_level in ('low', 'medium', 'high')),
  match_score numeric(5,2) check (match_score between 0 and 100),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.company_profiles (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null unique references public.organizations(id) on delete cascade,
  capabilities jsonb not null default '[]'::jsonb,
  certifications jsonb not null default '[]'::jsonb,
  past_performance jsonb not null default '[]'::jsonb,
  embedding extensions.vector(1536),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.proposals (
  id uuid primary key default gen_random_uuid(),
  rfp_id uuid not null references public.rfps(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  status text not null default 'draft' check (status in ('draft', 'in_review', 'submitted', 'won', 'lost', 'archived')),
  draft_content text,
  created_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists rfps_source_id_external_id_key
  on public.rfps (source_id, source_external_id)
  where source_external_id is not null;

create index if not exists users_organization_id_idx on public.users (organization_id);
create index if not exists rfp_sources_active_idx on public.rfp_sources (active);
create index if not exists rfp_sources_last_scraped_idx on public.rfp_sources (last_scraped desc);
create index if not exists rfps_source_id_idx on public.rfps (source_id);
create index if not exists rfps_deadline_idx on public.rfps (deadline);
create index if not exists rfps_created_at_idx on public.rfps (created_at desc);
create index if not exists rfps_agency_idx on public.rfps (agency);
create index if not exists rfps_title_description_fts_idx
  on public.rfps
  using gin (to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, '')));
create index if not exists rfp_documents_rfp_id_idx on public.rfp_documents (rfp_id);
create index if not exists rfp_documents_document_type_idx on public.rfp_documents (document_type);
create index if not exists rfp_analysis_risk_level_idx on public.rfp_analysis (risk_level);
create index if not exists company_profiles_organization_id_idx on public.company_profiles (organization_id);
create index if not exists proposals_rfp_id_idx on public.proposals (rfp_id);
create index if not exists proposals_organization_id_idx on public.proposals (organization_id);
create index if not exists proposals_status_idx on public.proposals (status);
create index if not exists proposals_created_at_idx on public.proposals (created_at desc);

-- Vector similarity search for profile-to-RFP matching.
create index if not exists company_profiles_embedding_idx
  on public.company_profiles
  using ivfflat (embedding extensions.vector_cosine_ops)
  with (lists = 100);

create or replace function public.current_organization_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select u.organization_id
  from public.users u
  where u.id = auth.uid()
  limit 1;
$$;

revoke all on function public.current_organization_id() from public;
grant execute on function public.current_organization_id() to authenticated;

alter table public.organizations enable row level security;
alter table public.users enable row level security;
alter table public.rfp_sources enable row level security;
alter table public.rfps enable row level security;
alter table public.rfp_documents enable row level security;
alter table public.rfp_analysis enable row level security;
alter table public.company_profiles enable row level security;
alter table public.proposals enable row level security;

create policy "organizations_select_own"
  on public.organizations
  for select
  to authenticated
  using (id = public.current_organization_id());

create policy "users_select_same_org"
  on public.users
  for select
  to authenticated
  using (organization_id = public.current_organization_id());

create policy "users_update_self"
  on public.users
  for update
  to authenticated
  using (id = auth.uid())
  with check (organization_id = public.current_organization_id());

create policy "rfp_sources_select_authenticated"
  on public.rfp_sources
  for select
  to authenticated
  using (true);

create policy "rfps_select_authenticated"
  on public.rfps
  for select
  to authenticated
  using (true);

create policy "rfp_documents_select_authenticated"
  on public.rfp_documents
  for select
  to authenticated
  using (true);

create policy "rfp_analysis_select_authenticated"
  on public.rfp_analysis
  for select
  to authenticated
  using (true);

create policy "company_profiles_select_same_org"
  on public.company_profiles
  for select
  to authenticated
  using (organization_id = public.current_organization_id());

create policy "company_profiles_insert_same_org"
  on public.company_profiles
  for insert
  to authenticated
  with check (organization_id = public.current_organization_id());

create policy "company_profiles_update_same_org"
  on public.company_profiles
  for update
  to authenticated
  using (organization_id = public.current_organization_id())
  with check (organization_id = public.current_organization_id());

create policy "proposals_select_same_org"
  on public.proposals
  for select
  to authenticated
  using (organization_id = public.current_organization_id());

create policy "proposals_insert_same_org"
  on public.proposals
  for insert
  to authenticated
  with check (organization_id = public.current_organization_id());

create policy "proposals_update_same_org"
  on public.proposals
  for update
  to authenticated
  using (organization_id = public.current_organization_id())
  with check (organization_id = public.current_organization_id());
