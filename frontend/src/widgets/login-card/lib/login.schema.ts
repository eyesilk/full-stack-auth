import { z } from "zod";

export const schema = z.object({
  email: z.string().email().nonempty("Email required"),
  password: z.string().min(6).nonempty("Password required"),
});
