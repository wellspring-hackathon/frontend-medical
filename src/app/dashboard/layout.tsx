import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

// Mock authentication - replace with your actual auth logic
function getUser() {
  // This would be your actual auth check
  // For testing, you can change the role to: "patient", "doctor", "provider", or "admin"
  const role = "provider"; // Change this to test different roles

  return {
    id: "user_123",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: role,
    isAuthenticated: true
  };
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const user = getUser();

  // Redirect to login if not authenticated
  if (!user.isAuthenticated) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={user} />
      <div className="flex flex-1">
        <DashboardSidebar user={user} />
        <main className="flex-1 overflow-y-auto bg-background">{children}</main>
      </div>
    </div>
  );
}
