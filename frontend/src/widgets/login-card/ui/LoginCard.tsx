"use client";

import { Input } from "@/shared/input";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { schema } from "../lib/login.schema";
import { LoginForm } from "@/entities/auth/model/loginForm.type";
import { useLogin } from "@/features/auth";

export default function LoginCard() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { mutateAsync, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<LoginForm>({
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  const submit: SubmitHandler<LoginForm> = async (data): Promise<void> => {
    await mutateAsync(data);
    reset();
  };

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
          className="md:mb-8 mb-6"
          placeholder="⦁ ⦁ ⦁ ⦁ ⦁ ⦁ ⦁"
          type={isVisible ? "text" : "password"}
          id="password"
          aria-invalid={!!errors.password}
          required
          {...register("password")}
        />
      </div>
      <button
        className="btn w-full"
        type="submit"
        disabled={!isDirty || !isValid || isPending}
      >
        {isPending && (
          <Loader2Icon className="animate-spin inline mr-1 scale-85" />
        )}
        Sign in
      </button>
    </form>
  );
}
