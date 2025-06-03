import { useMutation } from "@tanstack/react-query";
import AuthApi from "../authApi";
import { alertStore } from "@/app/providers/AlertProvider";
import { User } from "@/entities/auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: AuthApi.login,
    onSuccess: (data: User) => {
      sessionStorage.setItem(
        "account",
        JSON.stringify({
          id: data.id,
          email: data.email,
          displayName: data.displayName,
          avatar: data.avatar,
        }),
      );
      console.log(sessionStorage.getItem("account"));
    },
    onError: (err: any) => {
      alertStore.setError(err.response.data.message as string);
    },
  });
};
