"use client";

import { Input } from "@/shared/input";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "@/features/auth";
import { schema } from "../lib/register.schema";
import { Loader2Icon } from "lucide-react";
import { RegisterForm } from "@/entities/auth/model/registartionForm.type";
import { redirect } from "next/navigation";
import { useGetUser } from "@/features/user";

export default function RegisterCard() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { mutateAsync, isPending } = useRegister();
  const { data: user } = useGetUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<RegisterForm>({
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  const submit: SubmitHandler<RegisterForm> = async (data): Promise<void> => {
    await mutateAsync(data);
    reset();
  };

  useEffect(() => {
    if (user) {
      redirect("/dashboard");
    }
  }, [user]);

  return (
    <form className="w-full" onSubmit={handleSubmit(submit)}>
      <label htmlFor="name" className="label-auth" aria-invalid={!!errors.name}>
        {errors.name ? errors.name.message : "Name"}
      </label>
      <div className="relative w-full">
        <Input
          className="md:mb-4 mb-3"
          placeholder="eyesilk"
          type="name"
          id="name"
          aria-invalid={!!errors.name}
          {...register("name")}
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
          placeholder="⦁ ⦁ ⦁ ⦁ ⦁ ⦁ ⦁"
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
        placeholder="⦁ ⦁ ⦁ ⦁ ⦁ ⦁ ⦁"
        type={isVisible ? "text" : "password"}
        id="passwordRepeat"
        aria-invalid={!!errors.passwordRepeat}
        required
        {...register("passwordRepeat")}
      />
      <button
        className="btn btn-stable w-full"
        type="submit"
        disabled={!isDirty || !isValid || isPending}
      >
        {isPending && (
          <Loader2Icon className="animate-spin inline mr-1 scale-85" />
        )}
        Sign up
      </button>
    </form>
  );
}
