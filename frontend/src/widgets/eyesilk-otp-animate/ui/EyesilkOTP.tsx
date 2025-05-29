"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/input-otp/ui/input-otp";
import { useOtpAnimate } from "../lib/useOtpAnimate";

const value: string = "EYY-ESII-LK-------LO-0G1N1N-------CONFIRM-------";

export default function EyesilkOTP() {
  const { inputValue, activeSlot } = useOtpAnimate(value, 150);

  return (
    <InputOTP maxLength={7} value={inputValue} disabled animate>
      <InputOTPGroup>
        <InputOTPSlot index={0} active={activeSlot === 0} />
        <InputOTPSlot index={1} active={activeSlot === 1} />
        <InputOTPSlot index={2} active={activeSlot === 2} />
        <InputOTPSlot index={3} active={activeSlot === 3} />
        <InputOTPSlot index={4} active={activeSlot === 4} />
        <InputOTPSlot index={5} active={activeSlot === 5} />
        <InputOTPSlot index={6} active={activeSlot === 6} />
      </InputOTPGroup>
    </InputOTP>
  );
}
