import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthApi from "../authApi";
import { alertStore } from "@/app/providers/AlertProvider";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
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
