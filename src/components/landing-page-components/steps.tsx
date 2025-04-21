"use client";

import { appName } from "@/constants";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

const steps = [
  {
    id: 1,
    title: "Create an Account",
    description:
      "Register and complete your health profile with relevant information."
  },
  {
    id: 2,
    title: "Find Healthcare Providers",
    description:
      "  Search for specialists or facilities based on your needs and location."
  },
  {
    id: 3,
    title: "Book Appointments",
    description:
      "Get the care you need and maintain your health records in one place."
  }
];

const Steps = () => {
  return (
    <section id="how-it-works" className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold">How It Works</h2>
          <p className="text-muted-foreground mx-auto max-w-3xl">
            Getting started with {`${appName}`} is simple and straightforward.
          </p>
        </div>
        

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <CardContainer key={step.id}>
              <CardBody className="group/card border-primary relative flex h-full flex-col rounded-xl border-2 bg-background px-6 py-4 hover:px-8 hover:py-6 dark:hover:shadow-2xl">
                <CardItem translateZ="50" className="text-center">
                  <div className="bg-primary text-primary-foreground mx-auto flex h-16 w-16 items-center justify-center rounded-full py-4 text-xl font-bold">
                    {step.id}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
