import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getProposals } from "@/services/proposals/getProposals";

export default async function ProposalsPage() {
  const proposals = await getProposals();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Proposals</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>RFP ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-muted-foreground">
                  No proposals found.
                </TableCell>
              </TableRow>
            ) : (
              proposals.map((proposal) => (
                <TableRow key={proposal.id}>
                  <TableCell className="font-mono text-xs">{proposal.rfpId}</TableCell>
                  <TableCell className="capitalize">{proposal.status.replace("_", " ")}</TableCell>
                  <TableCell>{new Date(proposal.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
