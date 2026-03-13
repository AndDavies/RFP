import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthCard } from "@/components/layout/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/server";
import { signupAction } from "@/app/auth-actions";

type SignupPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(90%_70%_at_50%_0%,rgba(82,124,255,0.2),rgba(249,250,255,1))] px-6">
      <div className="w-full max-w-md space-y-6">
        <Link href="/" className="block text-center text-sm font-semibold">
          RFP Intelligence
        </Link>
        <AuthCard
          title="Create account"
          description="Start tracking and qualifying opportunities."
          footerText="Already have an account?"
          footerLinkLabel="Login"
          footerLinkHref="/login"
        >
          <form action={signupAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required minLength={8} />
            </div>
            {params.error ? <p className="text-sm text-red-600">{params.error}</p> : null}
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </AuthCard>
      </div>
    </main>
  );
}
