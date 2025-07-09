import { useMutation } from "@tanstack/react-query";
import AuthApi from "../authApi";
import { alertStore } from "@/app/providers/AlertProvider";
import { setSessionStorage } from "../../lib/setSessionStorage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginResponse } from "../../model/lopin-response.type";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../model/error.type";
import { LoginForm } from "@/entities/auth/model/loginForm.type";
import { hasMessage } from "../../model/type-guards/has-message.typeguard";

export const useLogin = () => {
  const [isCodeEnabled, setIsCodeEnabled] = useState<boolean>(false);
  const router = useRouter();

  const mutation = useMutation<
    LoginResponse,
    AxiosError<ErrorResponse>,
    LoginForm
  >({
    mutationFn: AuthApi.login,
    onSuccess: (data) => {
      if (hasMessage(data)) {
        alertStore.setMessage(data.message);
        setIsCodeEnabled(true);
      } else {
        const { id, email, displayName, avatar, isTwoFactorEnabled } = data;
        setSessionStorage(id, email, displayName, avatar, isTwoFactorEnabled);
        router.push("/dashboard");
      }
    },
    onError: (err) => {
      alertStore.setError(err.response?.data.message || "unknown error");
    },
  });

  return { mutation, isCodeEnabled, setIsCodeEnabled };
};
