"use client";

import { Input } from "@/shared/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { PasswordResetForm } from "@/entities/auth";
import { schema } from "../lib/password-reset.schema";
import { usePassReset } from "@/features/auth";
import { useSearchParams } from "next/navigation";

function PasswordResetCard() {
  const searchParams = useSearchParams();
  const token: string = searchParams.get("token") || "";

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { mutateAsync, isPending } = usePassReset();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<PasswordResetForm>({
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  const submit: SubmitHandler<PasswordResetForm> = async (
    data,
  ): Promise<void> => {
    await mutateAsync({ passwordResetForm: data, token });
    reset();
  };

  return (
    <form className="w-full md:mb-8 mb-6" onSubmit={handleSubmit(submit)}>
      <label
        htmlFor="password"
        className="label-auth"
        aria-invalid={!!errors.password}
      >
        {errors.password ? errors.password.message : "New password"}
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
        Reset Your Password
      </button>
    </form>
  );
}
export default PasswordResetCard;
