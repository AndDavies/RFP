import { createClient } from "@/lib/supabase/server";
import { AnalysisItem } from "@/types/rfp";

type AnalysisRow = {
  id: string;
  rfp_id: string;
  summary: string | null;
  risk_level: "low" | "medium" | "high" | null;
  match_score: number | null;
  key_requirements: unknown;
  created_at: string;
  rfps: { title: string } | Array<{ title: string }> | null;
};

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item): item is string => typeof item === "string");
}

export async function getAnalysis(): Promise<AnalysisItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("rfp_analysis")
    .select("id, rfp_id, summary, risk_level, match_score, key_requirements, created_at, rfps(title)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch analysis entries", error);
    return [];
  }

  const getTitle = (row: AnalysisRow): string => {
    if (!row.rfps) {
      return "Unknown RFP";
    }
    if (Array.isArray(row.rfps)) {
      return row.rfps[0]?.title ?? "Unknown RFP";
    }
    return row.rfps.title;
  };

  return (data as AnalysisRow[]).map((item) => ({
    id: item.id,
    rfpId: item.rfp_id,
    title: getTitle(item),
    summary: item.summary,
    riskLevel: item.risk_level,
    matchScore: item.match_score,
    keyRequirements: asStringArray(item.key_requirements),
    createdAt: item.created_at
  }));
}
