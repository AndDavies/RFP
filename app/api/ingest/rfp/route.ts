import { NextResponse } from "next/server";
import { validateIngestionToken } from "@/lib/security/validateIngestionToken";
import { storeRawRFP } from "@/services/ingestion/storeRawRFP";
import { RawRFPIngestionPayload } from "@/types/ingestion";

const MAX_JSON_BYTES = 2 * 1024 * 1024;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function validatePayload(payload: unknown): payload is RawRFPIngestionPayload {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const candidate = payload as Partial<RawRFPIngestionPayload>;
  return (
    isNonEmptyString(candidate.source_name) &&
    isNonEmptyString(candidate.source_url) &&
    isNonEmptyString(candidate.title)
  );
}

export async function POST(request: Request) {
  // Ingestion architecture:
  // 1) External scraping agents submit full raw records to this endpoint.
  // 2) Only internal scraping agents (including OpenClaw agents) can submit data.
  //    They must include Authorization: Bearer <INGESTION_SECRET_KEY>.
  //    This token gate prevents unauthorized submissions to the ingestion pipeline.
  // 3) We persist raw payloads in rfp_ingestion_raw as immutable intake records.
  // 4) A later review/processing stage promotes approved data into production tables.
  try {
    const authorizationHeader = request.headers.get("authorization");
    if (!validateIngestionToken(authorizationHeader)) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized ingestion request"
        },
        { status: 401 }
      );
    }

    const contentLengthHeader = request.headers.get("content-length");
    if (contentLengthHeader) {
      const contentLength = Number(contentLengthHeader);
      if (!Number.isNaN(contentLength) && contentLength > MAX_JSON_BYTES) {
        return NextResponse.json({ success: false, error: "Payload exceeds 2MB limit." }, { status: 400 });
      }
    }

    const rawBody = await request.text();
    const bodySize = new TextEncoder().encode(rawBody).length;
    if (bodySize > MAX_JSON_BYTES) {
      return NextResponse.json({ success: false, error: "Payload exceeds 2MB limit." }, { status: 400 });
    }

    let payload: unknown;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ success: false, error: "Invalid JSON payload." }, { status: 400 });
    }

    if (!validatePayload(payload)) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: source_name, source_url, title."
        },
        { status: 400 }
      );
    }

    const ingestionId = await storeRawRFP(payload);

    console.info("RFP ingestion stored", {
      source_name: payload.source_name,
      source_url: payload.source_url,
      ingestion_id: ingestionId
    });

    return NextResponse.json({
      success: true,
      ingestion_id: ingestionId
    });
  } catch (error) {
    console.error("RFP ingestion failed", error);
    return NextResponse.json({ success: false, error: "Internal server error." }, { status: 500 });
  }
}
