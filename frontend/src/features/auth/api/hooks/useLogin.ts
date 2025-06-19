import { useMutation } from "@tanstack/react-query";
import AuthApi from "../authApi";
import { alertStore } from "@/app/providers/AlertProvider";
import { User } from "@/entities/auth";
import { setSessionStorage } from "../../lib/setSessionStorage";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: AuthApi.login,
    onSuccess: (data: User) => {
      const { id, email, displayName, avatar, isTwoFactorEnabled } = data;
      setSessionStorage(id, email, displayName, avatar, isTwoFactorEnabled);
      router.push("/dashboard");
    },
    onError: (err: any) => {
      alertStore.setError(err.response.data.message as string);
    },
  });
};
