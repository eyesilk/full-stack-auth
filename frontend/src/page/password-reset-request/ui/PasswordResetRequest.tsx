import { AnimateWrapper } from "@/shared/animate-wrapper";
import { PasswordResetRequestCard } from "@/widgets/password-reset-request-card";
import Link from "next/link";

function PasswordResetRequest() {
  return (
    <div className="flex-center justify-between bg-[#171717] h-screen min-h-[350px] w-full">
      <AnimateWrapper className="flex-center">
        <div className="flex flex-col justify-center items-start w-full md:max-w-[450px] max-w-[350px] mx-5">
          <h1 className="text-white md:text-3xl text-2xl font-medium mb-1">
            Reset Your Password
          </h1>
          <span className="text-[#a8a8a8] md:text-sm text-xs block w-full border-b-1 border-[#363636] md:pb-12 pb-8 md:mb-4 mb-3">
            Enter the email tied to your account to recover your password.
          </span>
          <PasswordResetRequestCard />
          <span className="md:text-sm text-xs text-[#a8a8a8] self-center">
            Already have an account?{" "}
            <Link href="login" className="text-(--shamrock) hover:underline">
              login
            </Link>
          </span>
        </div>
      </AnimateWrapper>
    </div>
  );
}

export default PasswordResetRequest;
