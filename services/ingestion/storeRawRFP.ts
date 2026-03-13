import { createClient } from "@/lib/supabase/server";
import { RawRFPIngestionPayload } from "@/types/ingestion";

export async function storeRawRFP(payload: RawRFPIngestionPayload): Promise<string> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("rfp_ingestion_raw")
    .insert({
      source_name: payload.source_name,
      source_url: payload.source_url,
      raw_payload: payload,
      status: "new"
    })
    .select("id")
    .single();

  if (error || !data?.id) {
    throw new Error(`Failed to store raw RFP payload: ${error?.message ?? "Unknown error"}`);
  }

  return data.id;
}
