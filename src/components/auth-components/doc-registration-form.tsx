"use client";

import { useState } from "react";
import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { appName, docRegImg, medicalSpecializations } from "@/constants";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/utils/ZodSchema";
import type { z } from "zod";

// Define the form type using the schema
type FormValues = z.infer<typeof RegisterSchema>;

type DocRegistrationFormProps = React.HTMLAttributes<HTMLDivElement>;

const DocRegistrationForm = ({
  className,
  ...props
}: DocRegistrationFormProps) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);

  // Create the form with proper typing
  const form = useForm<FormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      specialization: "",
      licenseNo: "",
      role: "doctor", // This matches the enum default in the schema
      phone: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    mode: "onChange"
  });

  // Function to handle next step
  const handleNextStep = async () => {
    // Validate only the fields in the first step
    const result = await form.trigger([
      "firstName",
      "lastName",
      "specialization",
      "licenseNo"
    ]);
    if (result) {
      setStep(2);
    }
  };

  // Function to go back to previous step
  const handlePrevStep = () => {
    setStep(1);
  };

  // Properly typed onSubmit function
  const onSubmit = (values: FormValues) => {
    setIsLoading(true);
    console.log("Form submitted:", values);
    setIsLoading(false);
    // Handle form submission logic here
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 p-6 md:p-8">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Create a Doctor Account</h1>
                <p className="text-wrap text-muted-foreground">{`Sign up for full access to ${appName}`}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full",
                      step === 1 ? "bg-primary" : "bg-muted"
                    )}
                  />
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full",
                      step === 2 ? "bg-primary" : "bg-muted"
                    )}
                  />
                </div>
              </div>

              {/* Hidden role field - we're setting it to "doctor" by default */}
              <input type="hidden" {...form.register("role")} value="doctor" />

              {step === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    {/* First Name */}
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Last Name */}
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Specialization */}
                  <FormField
                    control={form.control}
                    name="specialization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specialization</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your medical specialization" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {medicalSpecializations.map((specialization) => (
                              <SelectItem
                                key={specialization}
                                value={specialization}>
                                {specialization}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Choose your area of medical expertise
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* License Number */}
                  <FormField
                    control={form.control}
                    name="licenseNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>License Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your license number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    className="text-md w-full"
                    onClick={handleNextStep}>
                    <span className="flex items-center gap-2">
                      Continue
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="08012345678" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter a valid Nigerian phone number
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="doctor@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormDescription>
                          Must be at least 6 characters
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Confirm Password */}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="text-md flex-1"
                      onClick={handlePrevStep}>
                      <span className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </span>
                    </Button>
                    <Button type="submit" className="text-md flex-1">
                      {isLoading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <span className="flex items-center gap-2">
                          Register
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </div>
                </>
              )}
            </form>
          </Form>

          <div className="relative hidden bg-muted md:block">
            <Image
              src={docRegImg || "/placeholder.svg?height=600&width=500"}
              alt="Doctor registration"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              width={500}
              height={600}
              priority
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default DocRegistrationForm;
