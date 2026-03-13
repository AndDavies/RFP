import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getOpportunities } from "@/services/rfp/getOpportunities";

export default async function OpportunitiesPage() {
  const opportunities = await getOpportunities();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Opportunities</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Agency</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>AI Match Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {opportunities.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-muted-foreground">
                  No opportunities available yet.
                </TableCell>
              </TableRow>
            ) : (
              opportunities.map((opportunity) => (
                <TableRow key={opportunity.id}>
                  <TableCell className="font-medium">{opportunity.title}</TableCell>
                  <TableCell>{opportunity.agency}</TableCell>
                  <TableCell>{opportunity.deadline ? new Date(opportunity.deadline).toLocaleDateString() : "N/A"}</TableCell>
                  <TableCell>{opportunity.location ?? "N/A"}</TableCell>
                  <TableCell>
                    {typeof opportunity.budget === "number"
                      ? new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(opportunity.budget)
                      : "N/A"}
                  </TableCell>
                  <TableCell className="capitalize">{opportunity.riskLevel ?? "N/A"}</TableCell>
                  <TableCell>{opportunity.matchScore !== null ? `${Math.round(opportunity.matchScore)}%` : "N/A"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
