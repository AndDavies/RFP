import { createClient } from "@/lib/supabase/server";

export async function rejectRecord(rawId: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("rfp_ingestion_raw").update({ status: "rejected" }).eq("id", rawId);

  if (error) {
    throw new Error(`Failed to reject ingestion record: ${error.message}`);
  }
}
