export function validateIngestionToken(authorizationHeader: string | null): boolean {
  const configuredSecret = process.env.INGESTION_SECRET_KEY;
  if (!configuredSecret) {
    console.error("INGESTION_SECRET_KEY is not configured.");
    return false;
  }

  if (!authorizationHeader) {
    return false;
  }

  const [scheme, token] = authorizationHeader.split(" ");
  if (scheme !== "Bearer" || !token) {
    return false;
  }

  return token === configuredSecret;
}
