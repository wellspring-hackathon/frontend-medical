"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { appName, userRegImg } from "@/constants"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { RegisterSchema } from "@/utils/ZodSchema"
import type { z } from "zod"

// Define the form type using the schema
type FormValues = z.infer<typeof RegisterSchema>

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2>(1)

  const form = useForm<FormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      // Set role to patient by default
      role: "patient",
      // These fields are required by the schema but not needed for patients
      // We'll set empty values and hide them in the UI
      specialization: "N/A",
      licenseNo: "N/A",
      password: "",
      confirmPassword: "",
    },
  })

  // Function to handle next step
  const handleNextStep = async () => {
    // Validate only the fields in the first step
    const result = await form.trigger(["firstName", "lastName", "email", "phone"])
    if (result) {
      setStep(2)
    }
  }

  // Function to go back to previous step
  const handlePrevStep = () => {
    setStep(1)
  }

  // Handle form submission
  function onSubmit(values: FormValues) {
    console.log(values)
    router.push("/onboarding")
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6 md:p-8">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Create an account</h1>

                <p className="text-wrap text-muted-foreground">{`Sign up for full access to ${appName}`}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className={cn("h-2 w-2 rounded-full", step === 1 ? "bg-primary" : "bg-muted")} />
                  <div className={cn("h-2 w-2 rounded-full", step === 2 ? "bg-primary" : "bg-muted")} />
                </div>
              </div>

              {/* Hidden role field - we're setting it to "patient" by default */}
              <input type="hidden" {...form.register("role")} value="patient" />

              {/* Hidden fields for specialization and licenseNo - not needed for patients */}
              <input type="hidden" {...form.register("specialization")} value="N/A" />
              <input type="hidden" {...form.register("licenseNo")} value="N/A" />

              {step === 1 && (
                <>
                  {/* firstName form field */}
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Last name form field */}
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email form field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="johndoe@gmail.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone number form field */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="08012345678" {...field} />
                        </FormControl>
                        <FormDescription>Enter a valid Nigerian phone number</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="button" className="text-md w-full" onClick={handleNextStep}>
                    <span className="flex items-center gap-2">
                      Continue
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  {/* Password field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormDescription>Must be at least 6 characters</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Confirm Password field */}
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
                    <Button type="button" variant="outline" className="text-md flex-1" onClick={handlePrevStep}>
                      <span className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </span>
                    </Button>
                    <Button type="submit" className="text-md flex-1">
                      <span className="flex items-center gap-2">
                        Register
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Button>
                  </div>
                </>
              )}

            </form>
          </Form>

          <div className="relative hidden bg-muted md:block">
            <Image
              src={userRegImg || "/placeholder.svg?height=600&width=500"}
              alt="Patient registration"
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
  )
}

export default RegisterForm
