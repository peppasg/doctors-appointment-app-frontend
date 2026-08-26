import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, { error: "Username must contain at least 3 characters" }),
  password: z.string().min(5, { error: "Password must contain at least 5 characters" })
});

export type LoginFields = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  username: z.string().min(3, { error: "Username must contain at least 3 characters" }),
  password: z.string().min(5, { error: "Password must contain at least 5 characters" })
});