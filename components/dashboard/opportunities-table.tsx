import { OpportunityItem } from "@/types/rfp";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type OpportunitiesTableProps = {
  opportunities: OpportunityItem[];
};

export function OpportunitiesTable({ opportunities }: OpportunitiesTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Opportunities</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Agency</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Match Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {opportunities.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-muted-foreground">
                  No opportunities available yet.
                </TableCell>
              </TableRow>
            ) : (
              opportunities.map((opportunity) => (
                <TableRow key={opportunity.id}>
                  <TableCell className="font-medium">{opportunity.title}</TableCell>
                  <TableCell>{opportunity.agency}</TableCell>
                  <TableCell>{opportunity.deadline ? new Date(opportunity.deadline).toLocaleDateString() : "N/A"}</TableCell>
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
