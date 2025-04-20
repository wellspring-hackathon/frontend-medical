"use client";

import React, { useState } from "react";
import Image from "next/image";

import Link from "next/link";
import { ArrowRightIcon, ArrowRightToLine, HeartPulse } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { appName } from "@/constants";
import RegisterButton from "./register-button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Hide Navbar on specific routes
  if (pathname.includes("/site/dashboard")) return null;

  const navItems = [
    { href: "/site/useCases", label: "Features" },
    { href: "/site/Demo", label: "How it Works" },
    { href: "/site/pricing", label: "For Providers" },
    { href: "/site/demo", label: "For doctors" },
    { href: "/site/faq", label: "Login" }
  ];

  return (
    <nav className="border-b px-4">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Logo Section */}
        <div className="">
          <Link href="/" className="flex items-center">
            <HeartPulse className="text-primary mr-1" />
            <span className="text-xl font-bold">{appName}</span>
          </Link>
        </div>

        {/* Navigation Links Section */}
        <div className="hidden items-center justify-center text-lg font-semibold lg:flex">
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
