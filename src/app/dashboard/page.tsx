import LogOutButton from "@/components/auth-components/logOutButton";
export default async function DashboardPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <LogOutButton />
    </div>
  );
}
