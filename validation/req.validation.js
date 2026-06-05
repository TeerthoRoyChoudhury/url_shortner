import { z } from "zod";

export const signupPostRequestBodySchema = z.object({
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().optional(),
  email: z.string().trim().email(),
  password: z.string().min(8),
});

export const loginPostRequstBodySchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8),
});

export const shortenPostRequestBodySchema = z.object({
  url: z.string().url(),
  code: z.string().optional(),
});
