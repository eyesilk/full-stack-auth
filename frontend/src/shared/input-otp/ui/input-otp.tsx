"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";

import { cn } from "@/shared/utils";

function InputOTP({
  className,
  containerClassName,
  animate,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
  animate?: boolean;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        `flex items-center justify-center gap-2 has-disabled:opacity-${animate ? "100" : "50"}`,
        containerClassName,
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  active,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
  active?: boolean;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const {
    char,
    hasFakeCaret,
    isActive: contextActive,
  } = inputOTPContext?.slots[index] ?? {};

  const isActive = active ?? contextActive;

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "data-[active=true]:border-[#138353] data-[active=true]:ring-[#138353] data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-[#363636] relative flex sm:h-12 sm:w-12 h-10 w-10 items-center justify-center border-y border-r sm:text-xl text-base shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 sm:data-[active=true]:ring-[3px] data-[active=true]:ring-[1px] text-white",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-white h-7 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
