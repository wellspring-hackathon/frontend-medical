import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRightToLine } from "lucide-react";

const RegisterButton = () => {
  return (
    <Button
      size="lg"
      className="w-full bg-primary text-lg text-primary-foreground sm:w-auto"
      variant="outline"
      asChild>
      <Link href="/register" className="flex items-center justify-center">
        Get Started
        <ArrowRightToLine className="ml-2 h-5 w-5" />
      </Link>
    </Button>
  );
};

export default RegisterButton;
