import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardLoading() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Loading dashboard data...</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">Fetching the latest opportunities and analysis.</CardContent>
    </Card>
  );
}
