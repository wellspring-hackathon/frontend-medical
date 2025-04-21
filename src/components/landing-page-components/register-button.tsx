import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRightToLine } from "lucide-react";

const RegisterButton = ({}) => {
  return (
    <Button
      size="lg"
      className="bg-primary text-primary-foreground w-full text-lg sm:w-auto"
      variant="outline"
      asChild>
      <Link href="/login" className="flex items-center justify-center">
        Get Started
        <ArrowRightToLine className="ml-2 h-5 w-5" />
      </Link>
    </Button>
  );
};

export default RegisterButton;
