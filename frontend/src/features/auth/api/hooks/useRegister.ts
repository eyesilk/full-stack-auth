import { useMutation } from "@tanstack/react-query";
import AuthApi from "../authApi";
import { alertStore } from "@/app/providers/AlertProvider";

export const useRegister = () => {
  return useMutation({
    mutationFn: AuthApi.registration,
    onSuccess: (data) => {
      alertStore.setMessage(data.message);
    },
    onError: (err: any) => {
      alertStore.setError(err.response.data.message as string);
    },
  });
};
