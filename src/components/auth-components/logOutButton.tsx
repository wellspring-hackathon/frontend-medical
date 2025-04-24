"use client";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
export default function LogOutButton() {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex items-center"
      variant="default">
      <LogOut className="mr-2 h-4 w-4" />
      log out
    </Button>
  );
}
