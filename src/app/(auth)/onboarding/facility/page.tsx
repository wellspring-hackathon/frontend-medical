"use client";

import FacilityRegisterationForm from "@/components/auth-components/facility-registeration-form";




const FacilityRegistrationPage = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <FacilityRegisterationForm/>
      </div>
    </div>
  );
};

export default FacilityRegistrationPage;








