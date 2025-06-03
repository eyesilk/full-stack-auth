import { Register } from "@/page/register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Register",
    template: "%s | Nest + Next",
  },
  description:
    "Create a new account to start using the full features of the app.",
};

export default function RegisterPage() {
  return <Register />;
}
