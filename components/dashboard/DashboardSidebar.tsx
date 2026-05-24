"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  Images,
  Sparkles,
  GalleryHorizontal,
  FileText,
  Inbox,
  Settings,
  ImagePlay,
  UserCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/home", label: "Home Page", icon: Home },
  { href: "/dashboard/founder", label: "Founder", icon: UserCircle },
  { href: "/dashboard/slides", label: "Slides", icon: Images },
  { href: "/dashboard/highlights", label: "Highlights", icon: Sparkles },
  { href: "/dashboard/gallery", label: "Gallery", icon: GalleryHorizontal },
  { href: "/dashboard/documents", label: "Documents", icon: FileText },
  { href: "/dashboard/media", label: "Media Library", icon: ImagePlay },
  { href: "/dashboard/leads", label: "Leads", icon: Inbox },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar() {
  const path = usePathname();
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-navy-700/50 bg-navy-900 text-white lg:flex">
      <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
        <span className="grid h-9 w-9 place-items-center rounded-md border border-gold-500 bg-navy-950 text-sm font-bold text-gold-500">
          AU
        </span>
        <div>
          <div className="font-serif text-base font-semibold leading-tight">AU Hospital</div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-gold-300/80">
            Admin Console
          </div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = item.exact
            ? path === item.href
            : path === item.href || path.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-white/[0.06] text-white"
                  : "text-white/65 hover:bg-white/[0.04] hover:text-white"
              )}
            >
              {active && (
                <span className="absolute inset-y-1 left-0 w-0.5 rounded-r bg-gold-500" />
              )}
              <Icon
                className={cn(
                  "h-4 w-4 transition-colors",
                  active ? "text-gold-400" : "text-white/55"
                )}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-4 text-xs text-white/45">
        Project Development Phase
      </div>
    </aside>
  );
}
