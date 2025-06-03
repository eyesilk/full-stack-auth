import { z } from "zod";

export const schema = z
  .object({
    name: z.string().nonempty("Name required"),
    email: z.string().email().nonempty("Email required"),
    password: z.string().min(6).nonempty("Password required"),
    passwordRepeat: z.string().min(6).nonempty("Repeat the required password"),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    path: ["passwordRepeat"],
    message: "The passwords don't match",
  });
