export type ProposalItem = {
  id: string;
  rfpId: string;
  status: "draft" | "in_review" | "submitted" | "won" | "lost" | "archived";
  createdAt: string;
};
