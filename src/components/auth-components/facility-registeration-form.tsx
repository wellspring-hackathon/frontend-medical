"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { appName, facilityRegImg, facilityRegImg2 } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Updated Form Schema
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  localGovernment: z
    .string()
    .min(1, { message: "Local government is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  specialties: z
    .array(z.string())
    .nonempty({ message: "At least one specialty required" }),
  availableBeds: z.number().int().nonnegative(),
  equipment: z
    .array(z.string())
    .nonempty({ message: "At least one equipment required" }),

  // Keep contact validations as-is (they match DB)
  contactEmail: z.string().email({ message: "Must be a valid email" }),
  contactPhone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, {
      message: "Invalid phone number format"
    })
});

const FacilityRegisterationForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
    }
  });

  const router = useRouter();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
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
              className="space-y-8 p-6 md:p-8">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">
                  Register Healthcare Facility
                </h1>
                <p className="text-wrap text-muted-foreground">
                  {`Provide your facility details to join ${appName}`}
                </p>
              </div>

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

              {/* Specialties (Multi-select) */}
              <FormField
                control={form.control}
                name="specialties"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialties</FormLabel>
                    <Select
                      onValueChange={(value) =>
                        field.onChange([...field.value, value])
                      }
                      value="">
                      <FormControl>
                        <div className="flex gap-2">
                          <SelectTrigger>
                            <SelectValue placeholder="Add specialties" />
                          </SelectTrigger>
                          <Button type="button" variant="outline">
                            Add
                          </Button>
                        </div>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                        <SelectItem value="surgery">Surgery</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex flex-wrap gap-2">
                      {field.value?.map((item) => (
                        <Badge key={item}>
                          {item}
                          <button
                            type="button"
                            onClick={() =>
                              field.onChange(
                                field.value.filter((i) => i !== item)
                              )
                            }
                            className="ml-2">
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
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
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
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
                        field.onChange([...field.value, value])
                      }
                      value="">
                      <FormControl>
                        <div className="flex gap-2">
                          <SelectTrigger>
                            <SelectValue placeholder="Add equipment" />
                          </SelectTrigger>
                          <Button type="button" variant="outline">
                            Add
                          </Button>
                        </div>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="xray">X-Ray Machine</SelectItem>
                        <SelectItem value="mri">MRI Scanner</SelectItem>
                        <SelectItem value="ultrasound">Ultrasound</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex flex-wrap gap-2">
                      {field.value?.map((item) => (
                        <Badge key={item}>
                          {item}
                          <button
                            type="button"
                            onClick={() =>
                              field.onChange(
                                field.value.filter((i) => i !== item)
                              )
                            }
                            className="ml-2">
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
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

              <Button type="submit" className="text-md w-full cursor-pointer">
                Register Facility
                <ArrowRight className="ml-2" />
              </Button>
            </form>
          </Form>

          <div className="relative h-full bg-muted">
            <Image
              src={facilityRegImg}
              alt="Medical facility image"
              className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              fill
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

export default FacilityRegisterationForm;
