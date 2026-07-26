import { z } from "zod";

export const loginSchema = z.object({
  username: z.email({ error: "Μη έγκυρο email" }),
  password: z.string().min(6, { error: "Ο κωδικός πρέπει να έχει τουλάχιστον 6 χαρακτήρες" })
});

export const signupSchema = z.object({
  username: z.email({ error: "Μη έγκυρο email" }),
  password: z.string().min(6, { error: "Ο κωδικός πρέπει να έχει τουλάχιστον 6 χαρακτήρες" })
});