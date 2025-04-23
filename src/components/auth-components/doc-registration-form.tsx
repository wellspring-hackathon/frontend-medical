"use client"

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
import { appName, docRegImg, userRegImg } from "@/constants";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useForm, useFieldArray, FieldValues } from "react-hook-form";
import { z } from "zod";

// List of medical specializations
const medicalSpecializations = [
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Family Medicine",
  "Gastroenterology",
  "Neurology",
  "Obstetrics & Gynecology",
  "Oncology",
  "Ophthalmology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Radiology",
  "Surgery",
  "Urology",
]

// Days of the week
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

// Time slots
const timeSlots = ["8:00 AM - 12:00 PM", "12:00 PM - 4:00 PM", "4:00 PM - 8:00 PM", "8:00 AM - 8:00 PM"]

const formSchema = z.object({
  healthCareProvider: z.string().min(1, { message: "Healthcare provider name is required" }),
  specialization: z.string().min(1, { message: "Specialization is required" }),
  licenseNumber: z.string().min(1, { message: "License number is required" }),
  availability: z.array(z.string().min(1)).min(1, { message: "Please add at least one availability slot" }),
})

// Define the form type explicitly
type FormValues = z.infer<typeof formSchema>;

type DocRegistrationFormProps = React.HTMLAttributes<HTMLDivElement>

const DocRegistrationForm = ({ className, ...props }: DocRegistrationFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      healthCareProvider: "",
      specialization: "",
      licenseNumber: "",
      availability: ["Monday 8:00 AM - 12:00 PM"], // Initialize with a valid value
    },
  })

  // Use useFieldArray to handle the dynamic array of availability slots
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "availability" as const, // Use 'as const' to make TypeScript understand this is a literal string
  })

  function onSubmit(values: FormValues) {
    console.log("Form submitted:", values)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6 md:p-8">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>
                <p className="text-wrap text-muted-foreground">{`Sign up for full access to ${appName}`}</p>
              </div>

              {/* Healthcare Provider form field */}
              <FormField
                control={form.control}
                name="healthCareProvider"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Healthcare Provider</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter healthcare provider name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Specialization form field - now a Select dropdown */}
              <FormField
                control={form.control}
                name="specialization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialization</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your medical specialization" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {medicalSpecializations.map((specialization) => (
                          <SelectItem key={specialization} value={specialization}>
                            {specialization}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Choose your area of medical expertise</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* License Number form field */}
              <FormField
                control={form.control}
                name="licenseNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your license number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Availability Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Availability</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append("Monday 8:00 AM - 12:00 PM")}
                    className="h-8 gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Slot</span>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Add the days and times when you're available for appointments
                </p>

                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name={`availability.${index}`}
                      render={({ field }) => {
                        // Split the value into day and time parts if it exists
                        const parts = field.value ? field.value.split(" ") : ["Monday", ""]
                        const day = parts[0] || "Monday"
                        const timeSlot = parts.length > 1 ? parts.slice(1).join(" ") : "8:00 AM - 12:00 PM"

                        return (
                          <FormItem className="flex-1">
                            <FormControl>
                              <div className="flex items-center gap-2">
                                <Select
                                  onValueChange={(selectedDay) => {
                                    // Combine the selected day with the existing time slot
                                    field.onChange(`${selectedDay} ${timeSlot}`)
                                  }}
                                  value={day}
                                >
                                  <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Day" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {daysOfWeek.map((d) => (
                                      <SelectItem key={d} value={d}>
                                        {d}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>

                                <Select
                                  onValueChange={(selectedTime) => {
                                    // Combine the existing day with the selected time slot
                                    field.onChange(`${day} ${selectedTime}`)
                                  }}
                                  value={timeSlot}
                                >
                                  <SelectTrigger className="flex-1">
                                    <SelectValue placeholder="Time slot" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {timeSlots.map((time) => (
                                      <SelectItem key={time} value={time}>
                                        {time}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>

                                {index > 0 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => remove(index)}
                                    className="h-8 w-8 p-0 text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Remove</span>
                                  </Button>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )
                      }}
                    />
                  </div>
                ))}
              </div>

              <Button type="submit" className="text-md w-full">
                <span className="flex items-center gap-2">
                  Register
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Button>
            </form>
          </Form>

          <div className="relative hidden bg-muted md:block">
            <Image
              src={docRegImg || "/placeholder.svg"}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              width={500}
              height={500}
              priority
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}

export default DocRegistrationForm