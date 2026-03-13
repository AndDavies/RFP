import { createClient } from "@/lib/supabase/server";
import { PendingRawIngestionRecord } from "@/types/ingestion";

type RawRecordRow = {
  id: string;
  source_name: string | null;
  source_url: string | null;
  raw_payload: unknown;
  created_at: string;
};

function asObject(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }
  return value as Record<string, unknown>;
}

function asString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

export async function getRawRecords(): Promise<PendingRawIngestionRecord[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("rfp_ingestion_raw")
    .select("id, source_name, source_url, raw_payload, created_at")
    .eq("status", "new")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch pending ingestion records", error);
    return [];
  }

  return (data as RawRecordRow[]).map((row) => {
    const rawPayload = asObject(row.raw_payload);
    return {
      id: row.id,
      sourceName: row.source_name ?? "Unknown source",
      sourceUrl: row.source_url ?? "",
      title: asString(rawPayload.title) ?? "Untitled opportunity",
      agency: asString(rawPayload.agency),
      deadline: asString(rawPayload.deadline),
      createdAt: row.created_at,
      rawPayload
    };
  });
}
