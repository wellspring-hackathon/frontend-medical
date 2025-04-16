import { z } from "zod";
export const RegisterSchema = z
  .object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    specialization: z.string().min(1, "specialization is required"),
    licenseNo: z.string().min(1, "licenseNo is required"),
    role:  z.enum(["patient","doctor"]).default("patient"),
    phone: z
      .string()
      .min(11, "Phone number must be at least 11 digits")
      .regex(/^0[789][01]\d{8}$/, "Invalid Nigerian phone number"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });