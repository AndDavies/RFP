import { createClient } from "@/lib/supabase/server";
import { CompanyProfile, PastPerformanceEntry } from "@/types/company";

type CompanyProfileRow = {
  id: string;
  organization_id: string;
  capabilities: unknown;
  certifications: unknown;
  past_performance: unknown;
  created_at: string;
};

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item): item is string => typeof item === "string");
}

function asPastPerformanceArray(value: unknown): PastPerformanceEntry[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter(
    (item): item is PastPerformanceEntry => typeof item === "object" && item !== null && !Array.isArray(item)
  );
}

export async function getProfile(): Promise<CompanyProfile | null> {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: membership, error: membershipError } = await supabase
    .from("users")
    .select("organization_id")
    .eq("id", user.id)
    .maybeSingle();

  if (membershipError) {
    console.error("Failed to resolve organization membership", membershipError);
    return null;
  }

  const organizationId = membership?.organization_id;
  if (!organizationId) {
    return null;
  }

  const { data, error } = await supabase
    .from("company_profiles")
    .select("id, organization_id, capabilities, certifications, past_performance, created_at")
    .eq("organization_id", organizationId)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch company profile", error);
    return null;
  }

  if (!data) {
    return null;
  }

  const row = data as CompanyProfileRow;
  return {
    id: row.id,
    organizationId: row.organization_id,
    capabilities: asStringArray(row.capabilities),
    certifications: asStringArray(row.certifications),
    pastPerformance: asPastPerformanceArray(row.past_performance),
    createdAt: row.created_at
  };
}
