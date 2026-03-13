-- Seed data for local development
-- Includes: one organization, one company profile, two RFP opportunities.

insert into public.organizations (id, name, industry, size)
values
  ('11111111-1111-1111-1111-111111111111', 'Maple Federal Solutions Inc.', 'Canadian Government Contracting', '51-200');

insert into public.company_profiles (
  id,
  organization_id,
  capabilities,
  certifications,
  past_performance,
  embedding
)
values (
  '22222222-2222-2222-2222-222222222222',
  '11111111-1111-1111-1111-111111111111',
  '["cloud modernization", "cybersecurity operations", "bilingual proposal management", "GCdocs integration"]'::jsonb,
  '["ISO 27001", "SOC 2 Type II", "Controlled Goods Program"]'::jsonb,
  '[{"client":"Government of Ontario","outcome":"Modernized case management platform in 10 months"}]'::jsonb,
  null
);

insert into public.rfp_sources (id, name, base_url, scrape_method, active, last_scraped)
values (
  '33333333-3333-3333-3333-333333333333',
  'CanadaBuys',
  'https://canadabuys.canada.ca',
  'api',
  true,
  timezone('utc', now())
);

insert into public.rfps (
  id,
  source_id,
  title,
  agency,
  description,
  location,
  budget,
  deadline,
  source_url,
  source_external_id
)
values
  (
    '44444444-4444-4444-4444-444444444444',
    '33333333-3333-3333-3333-333333333333',
    'GC Cloud Data Platform Modernization',
    'Public Services and Procurement Canada',
    'Design and implement a secure, cloud-native data platform for federal procurement analytics.',
    'Ottawa, ON',
    2500000.00,
    timezone('utc', now()) + interval '45 days',
    'https://canadabuys.canada.ca/en/tender-opportunities/gc-cloud-data-platform',
    'PSPC-2026-001'
  ),
  (
    '55555555-5555-5555-5555-555555555555',
    '33333333-3333-3333-3333-333333333333',
    'National Cybersecurity SOC Expansion',
    'Shared Services Canada',
    'Expand Government of Canada SOC monitoring coverage and automate incident response workflows.',
    'Toronto, ON',
    4300000.00,
    timezone('utc', now()) + interval '60 days',
    'https://canadabuys.canada.ca/en/tender-opportunities/national-cybersecurity-soc-expansion',
    'SSC-2026-014'
  );
