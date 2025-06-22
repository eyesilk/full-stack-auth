"use client";

import { Input } from "@/shared/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { schema } from "../lib/dashboard.schema";
import { Switch } from "@/shared/switch";
import { DashboardForm } from "@/entities/dashboard";
import { Avatar, AvatarFallback } from "@/shared/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useGetUser, useUpdateUser } from "@/features/user";
import { Loader } from "@/shared/loader";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/dropdown-menu";
import { Loader2Icon, LogOutIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useLogout } from "@/features/auth";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/input-otp/ui/input-otp";
import { AnimateWrapper } from "@/shared/animate-wrapper";

type DashboardInnerProps = {
  user: {
    id: string;
    email: string;
    displayName: string;
    avatar: string;
    isTwoFactorEnabled: boolean;
  };
};

function DashboardInner({ user }: DashboardInnerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    mutation: mutationUpdate,
    isCodeEnabled,
    setIsCodeEnabled,
  } = useUpdateUser();
  const { mutate: logout } = useLogout();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<DashboardForm>({
    mode: "onTouched",
    resolver: zodResolver(schema),
    defaultValues: {
      name: user.displayName,
      email: user.email,
      isTwoFactorEnabled: user.isTwoFactorEnabled,
    },
  });

  const isTwoFactorEnabled: boolean = watch("isTwoFactorEnabled");

  const submit: SubmitHandler<DashboardForm> = async (data): Promise<void> => {
    mutationUpdate.mutate(data);
    console.log(data);
  };
  return (
    <div className="flex-center justify-between bg-plaid bg-drk-gray h-screen min-h-[220px] w-full">
      <div className="bg-[#171717] md:max-w-[550px] sm:max-w-[400px] w-full m-10 border border-[#2e2e2e] rounded-md p-5">
        <div className="flex-center justify-between md:mb-7 mb-5 ">
          <h1
            className={`sm:text-3xl text-xl font-[500] text-white leading-tight w-full md:text-4xl `}
          >
            It's a{" "}
            <strong className="text-(--shamrock) inline-block underline underline-offset-[17px] decoration-wavy">
              Dashboard
            </strong>
          </h1>
          <DropdownMenu onOpenChange={setIsOpen}>
            <DropdownMenuTrigger className="cursor-pointer">
              <Avatar
                className={`${isOpen && "ring-2 ring-(--shamrock)"} hover:ring-2 hover:ring-(--shamrock) transition-all`}
              >
                <AvatarImage src={user.avatar} alt={user.displayName} />
                <AvatarFallback>
                  {user.displayName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className="flex items-center justify-between"
                onClick={() => logout()}
              >
                <span>Logout</span>
                <LogOutIcon />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
          <Controller
            name="isTwoFactorEnabled"
            control={control}
            render={({ field }) => (
              <div className="flex btn-stable justify-between items-center md:mb-8 mb-6 bg-[#1d1d1d] px-3 border border-[#393939] rounded-sm  md:text-base sm:text-sm text-xs">
                <span
                  className={`${isTwoFactorEnabled ? "text-white" : "text-[#737373]"} md:text-sm text-xs font-medium`}
                >
                  two-factor
                </span>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </div>
            )}
          />
          <button
            className="btn btn-stable w-full"
            type="submit"
            disabled={!isValid || mutationUpdate.isPending}
          >
            {mutationUpdate.isPending && (
              <Loader2Icon className="animate-spin inline mr-1 scale-85" />
            )}
            Update Profile
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
                      disabled={!isValid || mutationUpdate.isPending}
                    >
                      {mutationUpdate.isPending && (
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
      </div>
    </div>
  );
}

function Dashboard() {
  const { data: user, isLoading, isError } = useGetUser();
  const router = useRouter();

  useEffect(() => {
    if (isError) {
      router.push("/auth/register");
    }
  }, [isError]);

  if (isLoading && !user) {
    return (
      <div className="flex-center justify-between bg-plaid h-screen min-h-[220px] w-full">
        <Loader />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <DashboardInner user={user} />;
}

export default Dashboard;
