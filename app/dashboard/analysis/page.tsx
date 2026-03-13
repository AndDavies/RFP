import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAnalysis } from "@/services/rfp/getAnalysis";

export default async function AnalysisPage() {
  const analysis = await getAnalysis();

  if (analysis.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>RFP Analysis</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">No analysis records available yet.</CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {analysis.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle className="text-lg">{item.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground">{item.summary ?? "No summary available yet."}</p>
            <div className="flex flex-wrap gap-4">
              <p>
                <span className="font-medium">Risk:</span>{" "}
                <span className="capitalize">{item.riskLevel ?? "N/A"}</span>
              </p>
              <p>
                <span className="font-medium">Match:</span> {item.matchScore !== null ? `${Math.round(item.matchScore)}%` : "N/A"}
              </p>
            </div>
            {item.keyRequirements.length > 0 ? (
              <div>
                <p className="mb-1 font-medium">Key Requirements</p>
                <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                  {item.keyRequirements.map((requirement) => (
                    <li key={`${item.id}-${requirement}`}>{requirement}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
