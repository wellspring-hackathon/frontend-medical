"use client";

import { useState } from "react";

import { HeartPulse } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import { appName } from "@/constants";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import RegisterButton from "./register-button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const hiddenRoutes = ["/dashboard", "/onboarding"]

  // Hide Navbar on specific routes
  if (hiddenRoutes.includes(pathname)) return null;

  const navItems = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How it Works" },
    { href: "#providers", label: "For Providers" },
    { href: "#providers", label: "For doctors" },
    { href: "#cta", label: "Login" }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b px-4">

      <div className="flex h-16 items-center justify-between px-4">
        {/* Logo Section */}
        <div className="">
          <Link href="/" className="flex items-center">
            <HeartPulse className="text-primary mr-1" />
            <span className="text-xl font-bold">{appName}</span>
          </Link>
        </div>

        {/* Navigation Links Section */}
        <div className="hidden items-center justify-center text-lg font-semibold lg:flex text-gray-600">
          <NavigationMenu>
            <NavigationMenuList className="gap-12">
              {navItems.map((item) => (
                <NavigationMenuItem
                  key={item.href}
                  className="hover:text-primary">
                  <NavigationMenuLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* User Actions Section */}
        <div className="flex items-center space-x-4 ">
         <RegisterButton/>

          {/* Mobile Menu Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden">
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      {/* mobile menu */}
      {isMenuOpen && (
        <div className="border-primary fixed inset-0 z-50 h-[400px] w-[200px] rounded-md border-2 bg-background md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu Content */}
          <div className="relative z-10 flex flex-col items-start space-y-4 p-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2 text-lg font-medium hover:bg-gray-200"
                onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
