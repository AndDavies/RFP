import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminIngestionLoading() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Loading ingestion records...</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">Fetching pending records for review.</CardContent>
    </Card>
  );
}
