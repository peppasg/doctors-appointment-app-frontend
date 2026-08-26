import { z } from "zod";

export const addressSchema = z.object({
  area: z.string().optional(),
  street: z.string().optional(),
  number: z.string().optional(),
  po: z.string().optional(),
});

export const phoneSchema = z.object({
  type: z.string().min(1, { error: "Phone type is required" }),
  number: z.string().min(8, { error: "Phone number must contain at least 8 characters" }),
});

export const createUserSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(5, { error: "Password must contain at least 5 characters" }),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  email: z.email().optional(),
  address: addressSchema.optional(),
  phone: z.array(phoneSchema).min(1, { error: "At least one phone number is required" }),
  roles: z.array(z.string()).optional(),
});

export type CreateUserFields = z.infer<typeof createUserSchema>;

export const updateUserSchema = createUserSchema.partial();
