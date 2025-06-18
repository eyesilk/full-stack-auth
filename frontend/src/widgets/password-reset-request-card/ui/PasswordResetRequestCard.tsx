"use client";

import { Input } from "@/shared/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { schema } from "../lib/password-reset-request.schema";
import { usePassResetReq } from "@/features/auth";
import { Loader2Icon } from "lucide-react";
import { PasswordResetRequestForm } from "@/entities/auth";

function PasswordResetRequestCard() {
  const { mutateAsync, isPending } = usePassResetReq();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<PasswordResetRequestForm>({
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  const submit: SubmitHandler<PasswordResetRequestForm> = async (
    data,
  ): Promise<void> => {
    await mutateAsync(data.email);
    reset();
  };

  return (
    <form className="w-full md:mb-8 mb-6" onSubmit={handleSubmit(submit)}>
      <label
        htmlFor="email"
        className="label-auth"
        aria-invalid={!!errors.email}
      >
        {errors.email ? errors.email.message : "Email"}
      </label>
      <Input
        className="md:mb-8 mb-5"
        placeholder="eyesilk@gmail.com"
        type="email"
        id="email"
        aria-invalid={!!errors.email}
        required
        {...register("email")}
      />
      <button
        className="btn btn-stable w-full"
        type="submit"
        disabled={!isDirty || !isValid || isPending}
      >
        {isPending && (
          <Loader2Icon className="animate-spin inline mr-1 scale-85" />
        )}
        Send Reset Email
      </button>
    </form>
  );
}

export default PasswordResetRequestCard;
