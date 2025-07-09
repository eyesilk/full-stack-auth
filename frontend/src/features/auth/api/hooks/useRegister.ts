import { useMutation } from "@tanstack/react-query";
import AuthApi from "../authApi";
import { alertStore } from "@/app/providers/AlertProvider";
import { MessageResponse } from "../../model/message-response.type";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../model/error.type";
import { RegisterForm } from "@/entities/auth/model/registartionForm.type";

export const useRegister = () => {
  return useMutation<MessageResponse, AxiosError<ErrorResponse>, RegisterForm>({
    mutationFn: AuthApi.registration,
    onSuccess: (data) => {
      alertStore.setMessage(data.message);
    },
    onError: (err) => {
      alertStore.setError(err.response?.data.message || "unknown error");
    },
  });
};
