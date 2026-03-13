import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Target, FileText } from "lucide-react";
import { SiteNav } from "@/components/layout/site-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "RFP Discovery",
    description: "Aggregate public opportunities from federal, state, and local sources."
  },
  {
    title: "AI Qualification",
    description: "Score fit against your capabilities, NAICS, and historical wins."
  },
  {
    title: "Proposal Drafting",
    description: "Generate first-pass proposal content aligned to solicitation requirements."
  }
];

const workflow = [
  { step: "01", title: "Ingest", description: "Continuously capture new opportunities and amendments." },
  { step: "02", title: "Analyze", description: "Extract requirements, risk flags, and match confidence." },
  { step: "03", title: "Execute", description: "Draft proposals faster with structured AI workflows." }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(120%_80%_at_50%_0%,rgba(82,124,255,0.18),rgba(249,250,255,1))]">
      <SiteNav />

      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 pb-20 pt-20 text-center md:pt-28">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-4 py-1 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5" />
          AI-first procurement intelligence
        </p>
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
          Government Procurement Intelligence
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
          Discover, analyze, and win government contracts with AI.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/signup">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/login">View Demo</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-6 pb-20 md:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="rounded-2xl border-border/70 bg-card/85">
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold tracking-tight">How it Works</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {workflow.map((item) => (
            <Card key={item.step} className="rounded-2xl border-border/70 bg-card/85">
              <CardHeader>
                <p className="text-xs text-muted-foreground">{item.step}</p>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold tracking-tight">Example Opportunities</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="rounded-2xl border-border/70 bg-card/85">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-4 w-4 text-primary" />
                DHS Zero Trust Modernization
              </CardTitle>
              <CardDescription>Estimated value: $18.4M</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 text-sm text-muted-foreground">Match score: 91%</CardContent>
          </Card>
          <Card className="rounded-2xl border-border/70 bg-card/85">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                VA Digital Forms Platform
              </CardTitle>
              <CardDescription>Estimated value: $6.2M</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 text-sm text-muted-foreground">Match score: 86%</CardContent>
          </Card>
          <Card className="rounded-2xl border-border/70 bg-card/85">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-4 w-4 text-primary" />
                DOT Analytics Operations Support
              </CardTitle>
              <CardDescription>Estimated value: $9.7M</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 text-sm text-muted-foreground">Match score: 83%</CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <Card className="rounded-2xl border-border/70 bg-card/85">
          <CardHeader>
            <h2 className="text-3xl font-semibold tracking-tight">Pricing</h2>
            <CardDescription>Start lean and scale with your capture team.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border/70 p-4">
              <p className="text-sm font-medium">Starter</p>
              <p className="mt-1 text-sm text-muted-foreground">$99/mo</p>
            </div>
            <div className="rounded-xl border border-border/70 p-4">
              <p className="text-sm font-medium">Growth</p>
              <p className="mt-1 text-sm text-muted-foreground">$299/mo</p>
            </div>
            <div className="rounded-xl border border-border/70 p-4">
              <p className="text-sm font-medium">Enterprise</p>
              <p className="mt-1 text-sm text-muted-foreground">Custom</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-6 pb-24 text-center">
        <h2 className="text-3xl font-semibold tracking-tight">Login / Signup</h2>
        <p className="text-muted-foreground">Access your AI-powered procurement workspace.</p>
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Signup</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
