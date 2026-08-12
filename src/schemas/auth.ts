import { z } from "zod";

export const loginSchema = z.object({
  username: z.email({ error: "Invalid email" }),
  password: z.string().min(6, { error: "Password must contain at least 6 characters" })
});

export type LoginFields = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  username: z.email({ error: "Invalid email" }),
  password: z.string().min(6, { error: "Password must contain at least 6 characters" })
});