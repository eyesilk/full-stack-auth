import { PasswordReset } from "@/page/password-reset";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Reset Password",
    template: "%s | Nest + Next",
  },
  description:
    "Reset your forgotten password to regain access to your account quickly and securely.",
};

export default function PasswordResetPage() {
  return <PasswordReset />;
}
