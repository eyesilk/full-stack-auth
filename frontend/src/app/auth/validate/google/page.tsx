import { GoogleLogin } from "@/page/google-login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Google Token Validation",
    template: "%s | Nest + Next",
  },
  description:
    "Validating your Google token to securely link your account and continue the authentication process.",
};

export default function GoogleValidatePage() {
  return <GoogleLogin />;
}
