"use client";

import { useGoogleLogin } from "@/features/auth";
import { Loader } from "@/shared/loader";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function GoogleLogin() {
  const searchParams = useSearchParams();
  const token: string = searchParams.get("token") || "";
  const { mutate } = useGoogleLogin();

  useEffect(() => {
    mutate(token);
  }, []);

  return (
    <div className="flex-center justify-between bg-plaid h-screen min-h-[220px] w-full">
      <Loader />
    </div>
  );
}

export default GoogleLogin;
