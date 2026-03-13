import { createClient } from "@/lib/supabase/server";
import { ProposalItem } from "@/types/proposal";

type ProposalRow = {
  id: string;
  organization_id: string;
  status: ProposalItem["status"];
  created_at: string;
  rfps: { title: string } | Array<{ title: string }> | null;
};

export async function getProposals(): Promise<ProposalItem[]> {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data: membership, error: membershipError } = await supabase
    .from("users")
    .select("organization_id")
    .eq("id", user.id)
    .maybeSingle();

  if (membershipError) {
    console.error("Failed to resolve organization membership", membershipError);
    return [];
  }

  const organizationId = membership?.organization_id;
  if (!organizationId) {
    return [];
  }

  const { data, error } = await supabase
    .from("proposals")
    .select("id, organization_id, status, created_at, rfps(title)")
    .eq("organization_id", organizationId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch proposals", error);
    return [];
  }

  const getTitle = (row: ProposalRow): string => {
    if (!row.rfps) {
      return "Unknown RFP";
    }
    if (Array.isArray(row.rfps)) {
      return row.rfps[0]?.title ?? "Unknown RFP";
    }
    return row.rfps.title;
  };

  return (data as ProposalRow[]).map((item) => ({
    id: item.id,
    rfpTitle: getTitle(item),
    status: item.status,
    createdAt: item.created_at
  }));
}
