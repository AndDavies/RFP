import { createClient } from "@/lib/supabase/server";

type RawRecordForApproval = {
  id: string;
  raw_payload: unknown;
};

function asObject(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }
  return value as Record<string, unknown>;
}

export async function approveRecord(rawId: string): Promise<void> {
  const supabase = await createClient();

  const { data: rawRecord, error: rawError } = await supabase
    .from("rfp_ingestion_raw")
    .select("id, raw_payload")
    .eq("id", rawId)
    .single();

  if (rawError || !rawRecord) {
    throw new Error(`Failed to load ingestion record: ${rawError?.message ?? "Record not found"}`);
  }

  const payload = asObject((rawRecord as RawRecordForApproval).raw_payload);

  const { error: queueError } = await supabase.from("rfp_ingestion_queue").insert({
    raw_id: rawId,
    parsed_data: payload,
    approved: false
  });

  if (queueError) {
    throw new Error(`Failed to queue validated record: ${queueError.message}`);
  }

  const { error: updateError } = await supabase.from("rfp_ingestion_raw").update({ status: "validated" }).eq("id", rawId);

  if (updateError) {
    throw new Error(`Failed to update raw record status: ${updateError.message}`);
  }
}
