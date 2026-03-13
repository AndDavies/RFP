import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAnalysis } from "@/services/rfp/getAnalysis";

export default async function AnalysisPage() {
  const analysis = await getAnalysis();

  return (
    <Card>
      <CardHeader>
        <CardTitle>RFP Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Summary</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>Match Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {analysis.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-muted-foreground">
                  No analysis records found.
                </TableCell>
              </TableRow>
            ) : (
              analysis.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell className="max-w-xl truncate">{item.summary ?? "No summary yet"}</TableCell>
                  <TableCell className="capitalize">{item.riskLevel ?? "N/A"}</TableCell>
                  <TableCell>{item.matchScore !== null ? `${Math.round(item.matchScore)}%` : "N/A"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
