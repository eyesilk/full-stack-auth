"use client";

import { useGitHubLogin } from "@/features/auth";
import { Loader } from "@/shared/loader";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GitHubValidate() {
  const searchParams = useSearchParams();
  const token: string | null = searchParams.get("token");
  const { mutate } = useGitHubLogin();

  useEffect(() => {
    mutate(token!);
  }, []);

  return (
    <div className="flex-center justify-between bg-plaid h-screen min-h-[220px] w-full">
      <Loader />
    </div>
  );
}
