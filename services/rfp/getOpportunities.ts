import { createClient } from "@/lib/supabase/server";
import { DashboardOpportunity, OpportunityListItem } from "@/types/rfp";

type DashboardOpportunityRow = {
  id: string;
  title: string;
  agency: string;
  deadline: string | null;
  rfp_analysis: { match_score: number | null } | Array<{ match_score: number | null }> | null;
};

type OpportunityListRow = {
  id: string;
  title: string;
  agency: string;
  deadline: string | null;
  location: string | null;
  budget: number | null;
};

export async function getRecentOpportunities(limit = 20): Promise<DashboardOpportunity[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("rfps")
    .select("id, title, agency, deadline, rfp_analysis(match_score)")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Failed to fetch recent opportunities", error);
    return [];
  }

  const getMatchScore = (row: DashboardOpportunityRow): number | null => {
    if (!row.rfp_analysis) {
      return null;
    }
    if (Array.isArray(row.rfp_analysis)) {
      return row.rfp_analysis[0]?.match_score ?? null;
    }
    return row.rfp_analysis.match_score;
  };

  return (data as DashboardOpportunityRow[]).map((item) => ({
    id: item.id,
    title: item.title,
    agency: item.agency,
    deadline: item.deadline,
    matchScore: getMatchScore(item)
  }));
}

export async function getOpportunities(): Promise<OpportunityListItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("rfps")
    .select("id, title, agency, deadline, location, budget")
    .order("deadline", { ascending: true });

  if (error) {
    console.error("Failed to fetch opportunities list", error);
    return [];
  }

  return (data as OpportunityListRow[]).map((item) => ({
    id: item.id,
    title: item.title,
    agency: item.agency,
    deadline: item.deadline,
    location: item.location,
    budget: item.budget
  }));
}
