"use client";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
export default function LogOutButton({ className }: { className: string }) {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className={cn("flex items-center", className)}
      variant="default">
      <LogOut className="mr-2 h-4 w-4" />
      log out
    </Button>
  );
}
