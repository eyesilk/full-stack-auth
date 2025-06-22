import { z } from "zod";

export const schema = z.object({
  name: z.string().nonempty("Name required"),
  email: z.string().nonempty("Email required").email(),
  isTwoFactorEnabled: z.boolean(),
  code: z.string().optional(),
});
