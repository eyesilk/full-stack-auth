import { z } from "zod";

export const schema = z
  .object({
    password: z.string().nonempty("Password required").min(6),
    passwordRepeat: z.string().nonempty("Repeat the required password").min(6),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    path: ["passwordRepeat"],
    message: "The passwords don't match",
  });
