import DashboardMenu from "@/components/TempDashboard";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex max-h-[100svh] gap-4">
      <DashboardMenu className="shadow-lg" />
      <div className="w-[90%]">{children}</div>
    </div>
  );
}
