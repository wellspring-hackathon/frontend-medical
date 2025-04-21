import React from "react";
import RegisterButton from "./register-button";

const CTA = () => {
  return (
    <section id="cta" className="lg:pb-22 mx-auto max-w-6xl px-4 py-12 pt-12 sm:px-6 sm:py-16 sm:pb-20 sm:pt-16 lg:px-8 lg:py-20 lg:pt-20 xl:py-32 xl:pt-24">
      <div className="bg-primary text-primary-foreground rounded-xl border-4 px-6 py-8">
        <h1 className="text-center text-4xl font-bold">
          Ready to Take Control of Your Healthcare?
        </h1>

        <p className="text-primary-foreground mt-[20px] text-center">
          Join thousands of users who are already benefiting from our healthcare
          platform.
        </p>
        <div className="mt-8 flex items-center justify-center">
          <RegisterButton />
        </div>
      </div>
    </section>
  );
};

export default CTA;
