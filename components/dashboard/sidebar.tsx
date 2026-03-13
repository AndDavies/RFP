"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, SearchCheck, Sparkles, FileText, Building2, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/opportunities", label: "Opportunities", icon: SearchCheck },
  { href: "/dashboard/analysis", label: "Analysis", icon: Sparkles },
  { href: "/dashboard/proposals", label: "Proposals", icon: FileText },
  { href: "/dashboard/company-profile", label: "Company Profile", icon: Building2 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings }
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-border/70 bg-card/70 p-4 lg:block">
      <div className="mb-6 px-2 text-sm font-semibold tracking-wide">RFP Intelligence</div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground",
                isActive && "bg-secondary text-secondary-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
