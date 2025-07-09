import { useMutation } from "@tanstack/react-query";
import AuthApi from "../authApi";
import { alertStore } from "@/app/providers/AlertProvider";
import { useRouter } from "next/navigation";
import { MessageResponse } from "../../model/message-response.type";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../model/error.type";
import { PasswordResetForm } from "@/entities/auth";

export const usePassReset = () => {
  const router = useRouter();

  return useMutation<
    MessageResponse,
    AxiosError<ErrorResponse>,
    {
      passwordResetForm: PasswordResetForm;
      token: string;
    }
  >({
    mutationFn: AuthApi.passwordReset,
    onSuccess: (data) => {
      alertStore.setMessage(data.message);
      router.push("/auth/login");
    },
    onError: (err) => {
      alertStore.setError(err.response?.data.message || "unknown error");
    },
  });
};
