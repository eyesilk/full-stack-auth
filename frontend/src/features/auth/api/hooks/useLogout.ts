import { useMutation, useQueryClient } from "@tanstack/react-query";
import { alertStore } from "@/app/providers/AlertProvider";
import { useRouter } from "next/navigation";
import { ErrorResponse } from "../../model/error.type";
import { AxiosError } from "axios";
import AuthApi from "../authApi";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ErrorResponse>>({
    mutationFn: AuthApi.logout,
    onSuccess: () => {
      sessionStorage.removeItem("account");
      queryClient.removeQueries({ queryKey: ["get-user"] });
      alertStore.setMessage(
        "You have successfully logged out of the system. Come back to us more often :(",
      );
      router.push("/");
    },
    onError: () => {
      alertStore.setError("Failed to log out. Try again later");
    },
  });
};
