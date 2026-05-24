import { requireAdmin } from "@/lib/auth";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex">
        <DashboardSidebar />
        <div className="flex min-h-screen flex-1 flex-col lg:pl-64">
          <DashboardHeader email={session.email} />
          <main className="flex-1 p-6 md:p-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
