import { useMutation } from "@tanstack/react-query";
import AuthApi from "../authApi";
import { alertStore } from "@/app/providers/AlertProvider";
import { useRouter } from "next/navigation";
import { setSessionStorage } from "../../lib/setSessionStorage";
import { User } from "@/entities/auth";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../model/error.type";

export const useGoogleLogin = () => {
  const router = useRouter();

  return useMutation<User, AxiosError<ErrorResponse>, string>({
    mutationFn: AuthApi.googleLogin,
    onSuccess: (data) => {
      const { id, email, displayName, avatar, isTwoFactorEnabled } = data;
      setSessionStorage(id, email, displayName, avatar, isTwoFactorEnabled);
      router.push("/dashboard");
    },
    onError: (err) => {
      alertStore.setError(err.response?.data.message || "unknown error");
      setTimeout(() => {
        router.push("/auth/register");
      }, 3000);
    },
  });
};
