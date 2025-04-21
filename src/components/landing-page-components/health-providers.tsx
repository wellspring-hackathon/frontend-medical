import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { provImg } from "@/constants";

const HealthProviders = () => {
  return (
    <section id="providers" className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8 md:flex-row justify-evenly">
          <div className="">
            <Image
              src={provImg}
              alt="Healthcare providers"
              className="rounded-lg shadow-lg"
              width={600}
              height={600}
            />
          </div>
          <div className="space-y-6 md:w-1/2">
            <h2 className="text-3xl font-bold">For Healthcare Providers</h2>
            <p className="text-muted-foreground text-lg">
              Join our network of trusted healthcare professionals and connect
              with patients seeking your expertise.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg
                  className="text-primary mr-2 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Expand your practice with new patient connections</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="text-primary mr-2 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Manage appointments and scheduling efficiently</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="text-primary mr-2 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Provide teleconsultations for remote patients</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="text-primary mr-2 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Maintain digital records of patient interactions</span>
              </li>
            </ul>
            <Button size="lg" asChild>
              <Link href="login?role=provider">
                Join as a Provider
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthProviders;
