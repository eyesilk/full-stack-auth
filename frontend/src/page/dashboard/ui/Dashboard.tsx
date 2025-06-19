"use client";

import { Input } from "@/shared/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { schema } from "../lib/dashboard.schema";
import { Switch } from "@/shared/switch";
import { DashboardForm } from "@/entities/dashboard";

function Dashboard() {
  const user = JSON.parse(sessionStorage.getItem("account")!);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<DashboardForm>({
    mode: "onTouched",
    resolver: zodResolver(schema),
    defaultValues: {
      name: user.displayName,
      email: user.email,
      isTwoFactorEnabled: user.isTwoFactorEnabled,
    },
  });

  const submit: SubmitHandler<DashboardForm> = async (data): Promise<void> => {
    reset();
  };
  return (
    <div className="flex-center justify-between bg-plaid bg-drk-gray h-screen min-h-[220px] w-full">
      <div className="bg-[#171717] md:max-w-[550px] sm:max-w-[400px] w-full m-10 border border-[#2e2e2e] rounded-md p-5">
        <h1
          className={`sm:text-3xl text-2xl font-[500] text-white leading-tight md:text-4xl md:mb-7 mb-5 w-full`}
        >
          It's a{" "}
          <strong className="text-(--shamrock) inline-block underline underline-offset-[17px] decoration-wavy">
            Dashboard
          </strong>
        </h1>
        <form className="w-full" onSubmit={handleSubmit(submit)}>
          <label
            htmlFor="name"
            className="label-auth"
            aria-invalid={!!errors.name}
          >
            {errors.name ? errors.name.message : "Name"}
          </label>
          <Input
            className="md:mb-4 mb-3"
            placeholder="eyesilk"
            type="name"
            id="name"
            aria-invalid={!!errors.name}
            required
            {...register("name")}
          />
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
          <label htmlFor="security" className="label-auth">
            Security
          </label>
          <div className="flex btn-stable justify-between items-center md:mb-8 mb-6 bg-[#1d1d1d] px-3 border border-[#393939] rounded-sm  md:text-base sm:text-sm text-xs">
            <span className="text-[#737373] md:text-sm text-xs font-medium">
              two-factor
            </span>
            <Switch />
          </div>
          <button
            className="btn btn-stable w-full"
            type="submit"
            disabled={!isDirty || !isValid}
          >
            {/* {isPending && ( */}
            {/*   <Loader2Icon className="animate-spin inline mr-1 scale-85" /> */}
            {/* )} */}
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
