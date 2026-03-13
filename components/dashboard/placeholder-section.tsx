import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type PlaceholderSectionProps = {
  title: string;
  description: string;
};

export function PlaceholderSection({ title, description }: PlaceholderSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-xl border border-dashed border-border p-8 text-sm text-muted-foreground">
          This module is scaffolded and ready for AI agent-driven implementation.
        </div>
      </CardContent>
    </Card>
  );
}
