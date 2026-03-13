import { createClient } from "@/lib/supabase/server";
import { ProposalItem } from "@/types/proposal";

type ProposalRow = {
  id: string;
  rfp_id: string;
  status: ProposalItem["status"];
  created_at: string;
};

export async function getProposals(): Promise<ProposalItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("proposals").select("id, rfp_id, status, created_at").order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch proposals", error);
    return [];
  }

  return (data as ProposalRow[]).map((item) => ({
    id: item.id,
    rfpId: item.rfp_id,
    status: item.status,
    createdAt: item.created_at
  }));
}
