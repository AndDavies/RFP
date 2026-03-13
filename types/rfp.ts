export type DashboardOpportunity = {
  id: string;
  title: string;
  agency: string;
  deadline: string | null;
  matchScore: number | null;
};

export type OpportunityListItem = {
  id: string;
  title: string;
  agency: string;
  deadline: string | null;
  location: string | null;
  budget: number | null;
};

export type AnalysisItem = {
  id: string;
  rfpId: string;
  title: string;
  summary: string | null;
  riskLevel: "low" | "medium" | "high" | null;
  matchScore: number | null;
  createdAt: string;
};
