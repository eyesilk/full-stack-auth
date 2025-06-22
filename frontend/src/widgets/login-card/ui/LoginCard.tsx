"use client";

import { Input } from "@/shared/input";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { schema } from "../lib/login.schema";
import { type LoginForm } from "@/entities/auth/model/loginForm.type";
import { useLogin } from "@/features/auth";
import Link from "next/link";
import { useGetUser } from "@/features/user";
import { redirect } from "next/navigation";
import { AnimateWrapper } from "@/shared/animate-wrapper";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/input-otp/ui/input-otp";

export default function LoginCard() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const {
    mutation: loginMutation,
    isCodeEnabled,
    setIsCodeEnabled,
  } = useLogin();
  const { data: user } = useGetUser();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
  } = useForm<LoginForm>({
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  const submit: SubmitHandler<LoginForm> = async (data): Promise<void> => {
    await loginMutation.mutateAsync(data);
  };

  useEffect(() => {
    if (user) {
      redirect("/dashboard");
    }
  }, [user]);

  return (
    <form className="w-full" onSubmit={handleSubmit(submit)}>
      <label
        htmlFor="email"
        className="label-auth"
        aria-invalid={!!errors.email}
      >
        {errors.email ? errors.email.message : "Email"}
      </label>
      <Input
        className="md:mb-4 mb-3"
        placeholder="eyesilk@gmail.com"
        type="email"
        id="email"
        aria-invalid={!!errors.email}
        required
        {...register("email")}
      />
      <label
        htmlFor="password"
        className="label-auth"
        aria-invalid={!!errors.password}
      >
        {errors.password ? errors.password.message : "Password"}
      </label>
      <div className="w-full relative">
        <button
          type="button"
          className={`absolute right-0.5 top-center btn py-0 ${errors.password ? "btn-err" : "btn-gray"}`}
          onClick={() => setIsVisible((prev) => !prev)}
        >
          {isVisible ? (
            <BsEyeSlash
              className={errors.password ? "text-[#e5484d]" : "text-[#737373]"}
            />
          ) : (
            <BsEye
              className={errors.password ? "text-[#e5484d]" : "text-[#737373]"}
            />
          )}
        </button>
        <Input
          className="md:mb-1 mb-0"
          placeholder="⦁ ⦁ ⦁ ⦁ ⦁ ⦁ ⦁"
          type={isVisible ? "text" : "password"}
          id="password"
          aria-invalid={!!errors.password}
          required
          {...register("password")}
        />
      </div>
      <Link
        href="password-reset-request"
        className="md:mb-5 mb-4 inline-block text-[#898989] md:text-sm text-xs hover:text-(--shamrock) hover:underline"
      >
        Forgot your password?
      </Link>
      <button
        className="btn btn-stable w-full"
        type="submit"
        disabled={!isDirty || !isValid || loginMutation.isPending}
      >
        {loginMutation.isPending && (
          <Loader2Icon className="animate-spin inline mr-1 scale-85" />
        )}
        Sign in
      </button>
      {isCodeEnabled && (
        <div className="w-full h-full fixed bg-black/35 top-0 left-0 flex-center">
          <AnimateWrapper className="flex-center">
            <div className="bg-[#171717] flex-center flex-col w-fit m-10 border border-[#2e2e2e] rounded-md p-5">
              <span className="text-base font-[500] text-white leading-tight md:text-xl mb-5">
                Enter your verification code
              </span>
              <Controller
                name="code"
                control={control}
                render={({ field }) => (
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />
              <div className="flex w-full gap-3 mt-5">
                <button
                  className="btn btn-gray btn-stable w-full"
                  type="button"
                  onClick={() => setIsCodeEnabled(false)}
                >
                  Decline
                </button>
                <button
                  className="btn btn-stable w-full"
                  type="submit"
                  disabled={!isValid || loginMutation.isPending}
                >
                  {loginMutation.isPending && (
                    <Loader2Icon className="animate-spin inline mr-1 scale-85" />
                  )}
                  Submit
                </button>
              </div>
            </div>
          </AnimateWrapper>
        </div>
      )}
    </form>
  );
}
