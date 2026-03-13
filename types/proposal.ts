export type ProposalItem = {
  id: string;
  rfpTitle: string;
  status: "draft" | "in_review" | "submitted" | "won" | "lost" | "archived";
  createdAt: string;
};
