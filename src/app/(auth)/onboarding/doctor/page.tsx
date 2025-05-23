"use client";

import DocRegistrationForm from "@/components/auth-components/doc-registration-form";




const DoctorRegisterPage = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <DocRegistrationForm />
      </div>
    </div>
  );
};

export default DoctorRegisterPage;








