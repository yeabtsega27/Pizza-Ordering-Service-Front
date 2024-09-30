import { z } from "zod";

const allowedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/bmp",
  "image/tiff",
  "image/svg+xml",
  "image/webp",
];
// Registration Schema
const registrationSchema = z
  .object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email address"),
    location: z.string().nonempty("Location is required"),
    phone_no: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the Terms and Conditions",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"], // Specify where to attach the error message
        message: "Passwords do not match",
        code: z.ZodIssueCode.custom,
      });
    }
  });

// Login Schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerRestaurantSchema = z
  .object({
    name: z.string().nonempty({ message: "Name is required" }),
    restaurant_name: z
      .string()
      .nonempty({ message: "Restaurant name is required" }),
    email: z
      .string()
      .nonempty({ message: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirm Password is required" }),
    location: z.string().nonempty({ message: "Location is required" }),
    phone_no: z
      .string()
      .nonempty({ message: "Phone number is required" })
      .min(10, { message: "Invalid phone number" }),
    acceptTerms: z.boolean().refine((value) => value === true, {
      message: "You must accept the terms and conditions",
    }),
    logo: z
      .any()
      .refine(
        (file) =>
          file[0] &&
          file[0] instanceof File &&
          allowedImageTypes.includes(file[0].type),
        {
          message: "Logo must be an image",
        }
      ),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"], // Specify where to attach the error message
        message: "Passwords do not match",
        code: z.ZodIssueCode.custom,
      });
    }
  });

// Exporting both schemas
export { registrationSchema, loginSchema };
