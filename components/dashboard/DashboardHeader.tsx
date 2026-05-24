import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function DashboardHeader({ email }: { email: string }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white px-6">
      <div className="text-sm text-muted-foreground">
        Signed in as <span className="font-medium text-navy-900">{email}</span>
      </div>
      <div className="flex items-center gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/" target="_blank" rel="noopener">View public site</Link>
        </Button>
        <form action="/logout" method="POST">
          <Button type="submit" variant="ghost" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </form>
      </div>
    </header>
  );
}
