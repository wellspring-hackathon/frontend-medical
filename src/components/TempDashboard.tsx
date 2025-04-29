"use client";
import {
  BotMessageSquare,
  HeartPulse,
  Home,
  Files,
  Hospital,
  Search
} from "lucide-react";
import LogOutButton from "./auth-components/logOutButton";
import { cn } from "@/lib/utils";
import { appName } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardMenu({ className }: { className: string }) {
  const pathName = usePathname();
  console.log(pathName);
  const items = [
    {
      link: "/dashboard",
      icon: <Home />,
      name: "Home"
    },
    {
      link: "/dashboard/search",
      icon: <Search />,
      name: "Search"
    },
    {
      link: "/dashboard/vivy",
      icon: <BotMessageSquare />,
      name: "vivy"
    },
    {
      link: "/dashboard/appointments",
      icon: <Files />,
      name: "Appointments"
    },
    {
      link: "/dashboard/healthproviders",
      icon: <Hospital />,
      name: "Health Providers"
    }
  ];
  return (
    <div
      className={cn(
        "flex h-[100svh] max-h-[100svh] w-[20%] flex-col gap-10 p-4",
        className
      )}>
      <div className="">
        <Link href="/" className="flex items-center">
          <HeartPulse className="mr-1 text-primary" />
          <span className="text-xl font-bold">{appName}</span>
        </Link>
      </div>
      <ul className="flex flex-col gap-6 p-2">
        {items.map((link, i) => {
          return (
            <li
              key={i}
              className={cn(
                "rounded-md p-[10px] transition hover:bg-primary hover:text-white",
                pathName == link.link && "bg-primary text-white"
              )}>
              <Link href={link.link} className="flex items-center gap-2">
                {link.icon}
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>

      <LogOutButton className="mb-0 mt-[auto] justify-self-end" />
    </div>
  );
}
