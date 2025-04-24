"use client";

import { Button } from "@/components/ui/button";
import { Building2, Stethoscope, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RoleCard from "./role-card";
import { appName } from "@/constants";

export default function RoleSelectionPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (selectedRole === 'patient') {
      router.push('/dasboard')
      return;
    }
    if (selectedRole) {
      router.push(`/onboarding/${selectedRole}`);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {`Welcome to ${appName}`}
          </h1>
          <p className="text-muted-foreground text-lg">
            Tell us how you'll be using our platform so we can customize your
            experience
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Patient Card */}
          <RoleCard
            icon={<UserRound size={48} />}
            title="I'm a Patient"
            description="Looking for healthcare services, booking appointments, or accessing medical resources"
            isSelected={selectedRole === "patient"}
            onClick={() => setSelectedRole("patient")}
            color="blue"
          />

          {/* Doctor Card */}
          <RoleCard
            icon={<Stethoscope size={48} />}
            title="I'm a Doctor"
            description="A healthcare professional looking to offer services on this platform"
            isSelected={selectedRole === "doctor"}
            onClick={() => setSelectedRole("doctor")}
            color="green"
          />

          {/* Facility Card */}
          <RoleCard
            icon={<Building2 size={48} />}
            title="I'm a Healthcare Facility"
            description="A hospital, clinic, or healthcare organization connecting with patients"
            isSelected={selectedRole === "facility"}
            onClick={() => setSelectedRole("facility")}
            color="purple"
          />
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!selectedRole}
            className="rounded-xl px-8 py-6 text-lg">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

// Role selection card component with visual feedback
