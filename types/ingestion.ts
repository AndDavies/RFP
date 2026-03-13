export type RawRFPDocumentPayload = {
  document_type?: string;
  file_url?: string;
  [key: string]: unknown;
};

export type RawRFPIngestionPayload = {
  source_name: string;
  source_url: string;
  title: string;
  agency?: string;
  description?: string;
  deadline?: string;
  documents?: RawRFPDocumentPayload[];
  raw_payload?: Record<string, unknown>;
  [key: string]: unknown;
};

export type PendingRawIngestionRecord = {
  id: string;
  sourceName: string;
  sourceUrl: string;
  title: string;
  agency: string | null;
  deadline: string | null;
  createdAt: string;
  rawPayload: Record<string, unknown>;
};
