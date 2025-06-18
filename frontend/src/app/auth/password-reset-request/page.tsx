import { PasswordResetRequest } from "@/page/password-reset-request";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Reset Password",
    template: "%s | Nest + Next",
  },
  description:
    "Reset your forgotten password to regain access to your account quickly and securely.",
};

export default function PasswordResetRequestPage() {
  return <PasswordResetRequest />;
}
