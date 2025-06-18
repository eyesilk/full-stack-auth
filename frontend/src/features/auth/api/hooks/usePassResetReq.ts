import { useMutation } from "@tanstack/react-query";
import AuthApi from "../authApi";
import { alertStore } from "@/app/providers/AlertProvider";

export const usePassResetReq = () => {
  return useMutation({
    mutationFn: AuthApi.passwordResetRequest,
    onSuccess: (data: Record<string, string>) => {
      alertStore.setMessage(data.message);
    },
    onError: (err: any) => {
      alertStore.setError(err.response.data.message as string);
    },
  });
};
