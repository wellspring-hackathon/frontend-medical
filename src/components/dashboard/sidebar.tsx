"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Calendar,
  User,
  Users,
  Building,
  Settings,
  LogOut,
  Stethoscope,
  Search,
  FileText,
  ShieldCheck,
  Pill,
  Activity,
  ClipboardList,
  BedDouble,
  HeartPulse
} from "lucide-react";
import { appName } from "@/constants";

type SidebarProps = {
  user: {
    role: string;
  };
}

export function DashboardSidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  // Define navigation items based on user role
  const getNavItems = () => {
    // Role-specific items
    if (user.role === "patient") {
      return [
        {
          title: "Patient Dashboard",
          href: `/dashboard/patient`,
          icon: <LayoutDashboard className="h-5 w-5" />
        },
        {
          title: "Find Doctors",
          href: "/dashboard/patient/find-doctors",
          icon: <Search className="h-5 w-5" />
        },
        {
          title: "My Appointments",
          href: "/dashboard/patient/appointments",
          icon: <Calendar className="h-5 w-5" />
        },
        {
          title: "Medical Records",
          href: "/dashboard/patient/records",
          icon: <FileText className="h-5 w-5" />
        },
        {
          title: "Prescriptions",
          href: "/dashboard/patient/prescriptions",
          icon: <Pill className="h-5 w-5" />
        },
        {
          title: "My Profile",
          href: `/dashboard/profile`,
          icon: <User className="h-5 w-5" />
        },
        {
          title: "Settings",
          href: `/dashboard/settings`,
          icon: <Settings className="h-5 w-5" />
        }
      ];
    } else if (user.role === "doctor") {
      return [
        {
          title: "Doctor Dashboard",
          href: `/dashboard/doctor`,
          icon: <LayoutDashboard className="h-5 w-5" />
        },
        {
          title: "Appointments",
          href: "/dashboard/doctor/appointments",
          icon: <Calendar className="h-5 w-5" />
        },
        {
          title: "My Patients",
          href: "/dashboard/doctor/patients",
          icon: <Users className="h-5 w-5" />
        },
        {
          title: "Schedule",
          href: "/dashboard/doctor/schedule",
          icon: <ClipboardList className="h-5 w-5" />
        },
        {
          title: "Medical Records",
          href: "/dashboard/doctor/records",
          icon: <FileText className="h-5 w-5" />
        },
        {
          title: "My Profile",
          href: `/dashboard/profile`,
          icon: <User className="h-5 w-5" />
        },
        {
          title: "Settings",
          href: `/dashboard/settings`,
          icon: <Settings className="h-5 w-5" />
        }
      ];
    } else if (user.role === "provider") {
      return [
        {
          title: "Provider Dashboard",
          href: `/dashboard/provider`,
          icon: <LayoutDashboard className="h-5 w-5" />
        },
        {
          title: "Doctors",
          href: "/dashboard/provider/doctors",
          icon: <Stethoscope className="h-5 w-5" />
        },
        {
          title: "Facilities",
          href: "/dashboard/provider/facilities",
          icon: <Building className="h-5 w-5" />
        },
        {
          title: "Bed Management",
          href: "/dashboard/provider/beds",
          icon: <BedDouble className="h-5 w-5" />
        },
        {
          title: "Equipment",
          href: "/dashboard/provider/equipment",
          icon: <HeartPulse className="h-5 w-5" />
        },
        {
          title: "Appointments",
          href: "/dashboard/provider/appointments",
          icon: <Calendar className="h-5 w-5" />
        },
        {
          title: "Profile",
          href: `/dashboard/profile`,
          icon: <User className="h-5 w-5" />
        },
        {
          title: "Settings",
          href: `/dashboard/settings`,
          icon: <Settings className="h-5 w-5" />
        }
      ];
    } else if (user.role === "admin") {
      return [
        {
          title: "Admin Dashboard",
          href: `/dashboard/admin`,
          icon: <LayoutDashboard className="h-5 w-5" />
        },
        {
          title: "User Management",
          href: "/dashboard/admin/users",
          icon: <Users className="h-5 w-5" />
        },
        {
          title: "Healthcare Providers",
          href: "/dashboard/admin/providers",
          icon: <Building className="h-5 w-5" />
        },
        {
          title: "System Analytics",
          href: "/dashboard/admin/analytics",
          icon: <Activity className="h-5 w-5" />
        },
        {
          title: "Security",
          href: "/dashboard/admin/security",
          icon: <ShieldCheck className="h-5 w-5" />
        },
        {
          title: "Settings",
          href: `/dashboard/admin/settings`,
          icon: <Settings className="h-5 w-5" />
        }
      ];
    }

    // Default items if role doesn't match
    return [
      {
        title: "Dashboard",
        href: `/dashboard`,
        icon: <LayoutDashboard className="h-5 w-5" />
      },
      {
        title: "Profile",
        href: `/dashboard/profile`,
        icon: <User className="h-5 w-5" />
      },
      {
        title: "Settings",
        href: `/dashboard/settings`,
        icon: <Settings className="h-5 w-5" />
      }
    ];
  };

  const navItems = getNavItems();

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center">
          <HeartPulse className="mr-1 text-primary" />
          <span className="text-xl font-bold">{appName}</span>
        </Link>
      </div>

      <div className="flex-1 overflow-auto py-4">
        {/* Role indicator */}
        <div className="mb-4 px-4">
          <div
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium uppercase tracking-wider",
              user.role === "patient"
                ? "bg-green-100 text-green-800"
                : user.role === "doctor"
                  ? "bg-blue-100 text-blue-800"
                  : user.role === "provider"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-rose-100 text-rose-800"
            )}>
            {user.role} View
          </div>
        </div>

        <nav className="grid items-start px-2 text-sm">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                pathname === item.href
                  ? "bg-accent font-medium text-foreground"
                  : ""
              )}>
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <Link
          href="/logout"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground">
          <LogOut className="h-5 w-5" />
          Sign Out
        </Link>
      </div>
    </div>
  );
}
