import { OpportunitiesTable } from "@/components/dashboard/opportunities-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOpportunities } from "@/services/rfp/getOpportunities";

export default async function DashboardPage() {
  const opportunities = await getOpportunities();
  const opportunitiesWithScores = opportunities.filter((item) => item.matchScore !== null);
  const pipelineValue = opportunities.reduce((acc, item) => acc + (item.budget ?? 0), 0);
  const averageMatchScore = 
    opportunitiesWithScores.length > 0
      ? Math.round(opportunitiesWithScores.reduce((acc, item) => acc + (item.matchScore ?? 0), 0) / opportunitiesWithScores.length)
      : null;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Tracked Opportunities</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{opportunities.length}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Average Match Score</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{averageMatchScore === null ? "N/A" : `${averageMatchScore}%`}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Pipeline Value</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(pipelineValue)}
          </CardContent>
        </Card>
      </div>
      <OpportunitiesTable opportunities={opportunities} />
    </div>
  );
}
