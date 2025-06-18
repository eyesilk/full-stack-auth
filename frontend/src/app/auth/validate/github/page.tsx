import { GitHubLogin } from "@/page/github-login";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    absolute: "GitHub Token Validation",
    template: "%s | Nest + Next",
  },
  description:
    "Validating your GitHub token to securely link your account and continue the authentication process.",
};

export default function GitHubValidatePage() {
  return (
    <Suspense>
      <GitHubLogin />
    </Suspense>
  );
}
