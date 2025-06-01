"use client";

import { Input } from "@/shared/input";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "@/widgets/auth-strategies/lib/register.schema";

type RegisterForm = {
  displayName: string;
  email: string;
  password: string;
  passwordRepeat: string;
};

export default function RegisterCard() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<RegisterForm>({
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  const submit: SubmitHandler<RegisterForm> = (data): void => {
    console.log(data);
    reset();
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(submit)}>
      <label
        htmlFor="name"
        className="label-auth"
        aria-invalid={!!errors.displayName}
      >
        {errors.displayName ? errors.displayName.message : "Name"}
      </label>
      <div className="relative w-full">
        <Input
          className="md:mb-4 mb-3"
          placeholder="eyesilk"
          type="name"
          id="name"
          aria-invalid={!!errors.displayName}
          {...register("displayName")}
        />
      </div>
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
          className="md:mb-4 mb-3"
          placeholder="⦁⦁⦁⦁⦁⦁⦁"
          type={isVisible ? "text" : "password"}
          id="password"
          aria-invalid={!!errors.password}
          required
          {...register("password")}
        />
      </div>
      <label
        htmlFor="passwordRepeat"
        className="label-auth"
        aria-invalid={!!errors.passwordRepeat}
      >
        {errors.passwordRepeat
          ? errors.passwordRepeat.message
          : "Repeat the password"}
      </label>
      <Input
        className="md:mb-8 mb-6"
        placeholder="⦁⦁⦁⦁⦁⦁⦁"
        type={isVisible ? "text" : "password"}
        id="passwordRepeat"
        aria-invalid={!!errors.passwordRepeat}
        required
        {...register("passwordRepeat")}
      />
      <button
        className="btn w-full"
        type="submit"
        disabled={!isDirty || !isValid}
      >
        Sign up
      </button>
    </form>
  );
}
