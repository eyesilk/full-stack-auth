import { z } from "zod";

export const schema = z.object({
  email: z.string().nonempty("Email required").email(),
  password: z.string().nonempty("Password required").min(6),
  code: z.string().optional(),
});
