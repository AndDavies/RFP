import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type AuthCardProps = {
  title: string;
  description: string;
  footerText: string;
  footerLinkLabel: string;
  footerLinkHref: string;
  children: React.ReactNode;
};

export function AuthCard({
  title,
  description,
  footerText,
  footerLinkLabel,
  footerLinkHref,
  children
}: AuthCardProps) {
  return (
    <Card className="w-full border-border/70 bg-card/90 backdrop-blur">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
        <p className="text-sm text-muted-foreground">
          {footerText}{" "}
          <Link href={footerLinkHref} className="font-medium text-primary hover:underline">
            {footerLinkLabel}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
