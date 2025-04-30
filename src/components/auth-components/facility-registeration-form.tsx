"use client";

import { useState } from "react";
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
import { appName, facilityRegImg } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FacilitySchema } from "@/utils/ZodSchema";
import { cn } from "@/lib/utils";

// Define the form type using the schema
type FormValues = z.infer<typeof FacilitySchema>;

// Lists of specialties and equipment for the dropdowns
const specialtiesList = [
  "Cardiology",
  "Pediatrics",
  "Surgery",
  "Neurology",
  "Orthopedics",
  "Oncology",
  "Gynecology",
  "Dermatology",
  "Ophthalmology",
  "Psychiatry",
  "Urology",
  "Nephrology",
  "Gastroenterology",
  "Endocrinology",
  "Hematology",
  "Rheumatology",
  "Pulmonology",
  "Allergy and Immunology",
  "Infectious Diseases",
  "Emergency Medicine",
  "Family Medicine",
  "Internal Medicine",
  "Geriatrics",
  "Pathology",
  "Radiology"
];

const equipmentList = [
  "X-Ray Machine",
  "MRI Scanner",
  "Ultrasound",
  "CT Scanner",
  "ECG Machine",
  "Ventilator",
  "Defibrillator",
  "Anesthesia Machine",
  "Surgical Lights",
  "Patient Monitors",
  "Infusion Pump",
  "Autoclave",
  "Incubator",
  "Dialysis Machine",
  "Suction Machine",
  "Laryngoscope",
  "Otoscope",
  "Oxygen Concentrator",
  "Nebulizer",
  "Thermometer",
  "Glucometer",
  "Blood Pressure Monitor",
  "Stethoscope",
  "Wheelchair",
  "Hospital Bed"
];

const FacilityRegistrationForm = () => {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);

  const form = useForm<FormValues>({
    resolver: zodResolver(FacilitySchema),
    defaultValues: {
      name: "",
      address: "",
      localGovernment: "",
      city: "",
      state: "Edo", // Default from database schema
      specialties: [], // Array field
      availableBeds: 0, // Numeric field
      equipment: [], // Array field
      contactEmail: "",
      contactPhone: ""
    },
    mode: "onChange"
  });

  // Function to handle next step
  const handleNextStep = async () => {
    // Validate only the fields in the first step
    const result = await form.trigger([
      "name",
      "address",
      "localGovernment",
      "city",
      "state"
    ]);
    if (result) {
      setStep(2);
    }
  };

  // Function to go back to previous step
  const handlePrevStep = () => {
    setStep(1);
  };

  // Form submission handler
  function onSubmit(values: FormValues) {
    console.log(values);
    router.push("/onboarding");
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="h-full w-full overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 p-6 md:p-8">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">
                  Register Healthcare Facility
                </h1>
                <p className="text-wrap text-muted-foreground">{`Provide your facility details to join ${appName}`}</p>
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

              {step === 1 && (
                <>
                  {/* Step 1: Basic Information */}

                  {/* Facility Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facility Name</FormLabel>
                        <FormControl>
                          <Input placeholder="General Hospital" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Address */}
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Medical Street" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Location Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="localGovernment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Local Government</FormLabel>
                          <FormControl>
                            <Input placeholder="Egor" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Benin City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* State */}
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="Edo" {...field} />
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
                  {/* Step 2: Facility Details and Contact Information */}

                  {/* Specialties (Multi-select) */}
                  <FormField
                    control={form.control}
                    name="specialties"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specialties</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            { field.onChange([...field.value, value]); }
                          }
                          value="">
                          <FormControl>
                            <div className="flex gap-2">
                              <SelectTrigger className="flex-1">
                                <SelectValue placeholder="Add specialties" />
                              </SelectTrigger>
                            </div>
                          </FormControl>
                          <SelectContent>
                            {specialtiesList.map((specialty) => (
                              <SelectItem
                                key={specialty}
                                value={specialty.toLowerCase()}
                                disabled={field.value.includes(
                                  specialty.toLowerCase()
                                )}>
                                {specialty}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {field.value?.map((item) => (
                            <Badge key={item} variant="secondary">
                              {item}
                              <button
                                type="button"
                                onClick={() =>
                                  { field.onChange(
                                    field.value.filter((i) => i !== item)
                                  ); }
                                }
                                className="ml-2 hover:text-destructive">
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <FormDescription>
                          Select all specialties offered at your facility
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Available Beds */}
                  <FormField
                    control={form.control}
                    name="availableBeds"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Available Beds</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="50"
                            {...field}
                            onChange={(e) =>
                              { field.onChange(
                                Number.parseInt(e.target.value) || 0
                              ); }
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Total number of beds available for patients
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Equipment (Multi-select) */}
                  <FormField
                    control={form.control}
                    name="equipment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Equipment</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            { field.onChange([...field.value, value]); }
                          }
                          value="">
                          <FormControl>
                            <div className="flex gap-2">
                              <SelectTrigger className="flex-1">
                                <SelectValue placeholder="Add equipment" />
                              </SelectTrigger>
                            </div>
                          </FormControl>
                          <SelectContent>
                            {equipmentList.map((equipment) => (
                              <SelectItem
                                key={equipment}
                                value={equipment
                                  .toLowerCase()
                                  .replace(/\s+/g, "_")}
                                disabled={field.value.includes(
                                  equipment.toLowerCase().replace(/\s+/g, "_")
                                )}>
                                {equipment}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {field.value?.map((item) => (
                            <Badge key={item} variant="secondary">
                              {item.replace(/_/g, " ")}
                              <button
                                type="button"
                                onClick={() =>
                                  { field.onChange(
                                    field.value.filter((i) => i !== item)
                                  ); }
                                }
                                className="ml-2 hover:text-destructive">
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <FormDescription>
                          Select all medical equipment available at your
                          facility
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Contact Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="contact@hospital.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="+2348160000000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

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
                      <span className="flex items-center gap-2">
                        Register Facility
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Button>
                  </div>
                </>
              )}
            </form>
          </Form>

          <div className="relative hidden md:block">
            <Image
              src={facilityRegImg || "/placeholder.svg?height=600&width=500"}
              alt="Medical facility image"
              className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
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

export default FacilityRegistrationForm;
