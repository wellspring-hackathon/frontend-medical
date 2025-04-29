import { z } from "zod";
export const SomeSchema = z
  .object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    specialization: z.string().min(1, "specialization is required"),
    licenseNo: z.string().min(1, "licenseNo is required"),
    role: z.enum(["patient", "doctor", "admin"]).default("patient"),
    phone: z
      .string()
      .min(11, "Phone number must be at least 11 digits")
      .regex(/^0[789][01]\d{8}$/, "Invalid Nigerian phone number"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"]
  });

export const RegisterSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Must be a valid email" }),
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, {
      message: "Invalid phone number format"
    })
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
export const FacilitySchema = z.object({
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
