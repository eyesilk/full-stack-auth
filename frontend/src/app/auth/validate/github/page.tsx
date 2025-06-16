import { GitHubValidate } from "@/page/github-validate";
import { Loader } from "@/shared/loader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "GitHub Token Validation",
    template: "%s | Nest + Next",
  },
  description:
    "Validating your GitHub token to securely link your account and continue the authentication process.",
};

export default function GitHubValidatePage() {
  return <GitHubValidate />;
}
