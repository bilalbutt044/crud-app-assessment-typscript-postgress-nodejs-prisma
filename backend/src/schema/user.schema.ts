import { z } from "zod";

export const userUpdateSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must be at least 1 characters long" })
    .max(50, {
      message: "Name cannot be longer than 50 characters",
    })
    .optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  password: z
    .string()
    .min(1, { message: "password must be at least 1 characters long" })
    .max(50, {
      message: "password cannot be longer than 50 characters",
    })
    .optional(),
});

export const paginationSchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
});
export type UpdateUserSchema = z.infer<typeof userUpdateSchema>;
