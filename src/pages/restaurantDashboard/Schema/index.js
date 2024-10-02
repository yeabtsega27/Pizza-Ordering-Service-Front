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
// role Schema
export const roleSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
});
export const addUserSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),
  location: z.string().nonempty({ message: "Location is required" }),
  phone_no: z.string().nonempty({ message: "Phone number is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  sub_role: z
    .number()
    .min(1, { message: "Role is required. Please select a valid role." }),
});
export const pizzaSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }), // Non-empty string validation for name
  price: z
    .string()
    .regex(/^\d+$/, { message: "Price must be a valid number" }) // Ensure the price is a numeric string
    .refine((value) => parseInt(value, 10) >= 1, {
      message: "Price must be at least 1",
    }), // Ensure price is at least 1
  image: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        file[0] instanceof File &&
        allowedImageTypes.includes(file[0].type),
      {
        message: "Only jpeg, png, gif, bmp, tiff, svg, webp images are allowed",
      }
    )
    .refine((file) => file[0] && file[0].size <= 2 * 1024 * 1024, {
      message: "Image size must be less than 2MB",
    }), // Image validation (valid type and file size)
});
export const editePizzaSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  price: z
    .string()
    .regex(/^\d+$/, { message: "Price must be a valid number" })
    .refine((value) => parseInt(value, 10) >= 1, {
      message: "Price must be at least 1",
    }),
  image: z.any().optional(),
});
export const editeRestaurant = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  location: z.string(),
  logo: z.any().optional(),
});
