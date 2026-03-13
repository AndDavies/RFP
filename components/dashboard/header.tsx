import { LogOut } from "lucide-react";
import { signOutAction } from "@/app/auth-actions";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border/70 bg-background/80 px-6 backdrop-blur">
      <p className="text-sm text-muted-foreground">AI procurement workspace</p>
      <form action={signOutAction}>
        <Button variant="outline" size="sm" type="submit">
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </form>
    </header>
  );
}
