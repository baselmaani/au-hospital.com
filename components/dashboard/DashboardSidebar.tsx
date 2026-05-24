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
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r bg-navy-950 text-white lg:flex">
      <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
        <span className="grid h-9 w-9 place-items-center rounded-md bg-gold-500 text-sm font-bold text-navy-950">
          AU
        </span>
        <div>
          <div className="font-serif text-base font-semibold">AU Hospital</div>
          <div className="text-[10px] uppercase tracking-widest text-white/50">
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
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition",
                active
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-4 text-xs text-white/50">
        Project Development Phase
      </div>
    </aside>
  );
}
