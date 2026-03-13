import { createClient } from "@/lib/supabase/server";
import { OpportunityItem } from "@/types/rfp";

type OpportunityRow = {
  id: string;
  title: string;
  agency: string;
  deadline: string | null;
  rfp_analysis:
    | { match_score: number | null; risk_level: "low" | "medium" | "high" | null }
    | Array<{ match_score: number | null; risk_level: "low" | "medium" | "high" | null }>
    | null;
  location: string | null;
  budget: number | null;
};

export async function getOpportunities(): Promise<OpportunityItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("rfps")
    .select("id, title, agency, deadline, location, budget, rfp_analysis(match_score, risk_level)")
    .order("deadline", { ascending: true })
    .limit(50);

  if (error) {
    console.error("Failed to fetch opportunities", error);
    return [];
  }

  const getAnalysis = (
    row: OpportunityRow
  ): { matchScore: number | null; riskLevel: "low" | "medium" | "high" | null } => {
    if (!row.rfp_analysis) {
      return { matchScore: null, riskLevel: null };
    }
    if (Array.isArray(row.rfp_analysis)) {
      return {
        matchScore: row.rfp_analysis[0]?.match_score ?? null,
        riskLevel: row.rfp_analysis[0]?.risk_level ?? null
      };
    }
    return {
      matchScore: row.rfp_analysis.match_score,
      riskLevel: row.rfp_analysis.risk_level
    };
  };

  return (data as OpportunityRow[]).map((item) => {
    const analysis = getAnalysis(item);
    return {
    id: item.id,
    title: item.title,
    agency: item.agency,
    deadline: item.deadline,
    matchScore: analysis.matchScore,
    riskLevel: analysis.riskLevel,
    location: item.location,
    budget: item.budget
    };
  });
}
