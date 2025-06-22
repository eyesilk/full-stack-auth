import { useMutation } from "@tanstack/react-query";
import AuthApi from "../authApi";
import { alertStore } from "@/app/providers/AlertProvider";
import { setSessionStorage } from "../../lib/setSessionStorage";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useLogin = () => {
  const [isCodeEnabled, setIsCodeEnabled] = useState<boolean>(false);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: AuthApi.login,
    onSuccess: (data) => {
      if (!data.message) {
        const { id, email, displayName, avatar, isTwoFactorEnabled } = data;
        setSessionStorage(id, email, displayName, avatar, isTwoFactorEnabled);
        router.push("/dashboard");
      } else {
        alertStore.setMessage(data.message);
        setIsCodeEnabled(true);
      }
    },
    onError: (err: any) => {
      alertStore.setError(err.response.data.message as string);
    },
  });

  return { mutation, isCodeEnabled, setIsCodeEnabled };
};
