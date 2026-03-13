export type PastPerformanceEntry = {
  client?: string;
  project?: string;
  outcome?: string;
  year?: number | string;
  [key: string]: unknown;
};

export type CompanyProfile = {
  id: string;
  organizationId: string;
  capabilities: string[];
  certifications: string[];
  pastPerformance: PastPerformanceEntry[];
  createdAt: string;
};
