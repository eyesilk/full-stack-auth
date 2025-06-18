import { useMutation } from "@tanstack/react-query";
import AuthApi from "../authApi";
import { alertStore } from "@/app/providers/AlertProvider";
import { useRouter } from "next/navigation";

export const usePassReset = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: AuthApi.passwordReset,
    onSuccess: (data: Record<string, string>) => {
      alertStore.setMessage(data.message);
      router.push("/auth/login");
    },
    onError: (err: any) => {
      alertStore.setError(err.response.data.message as string);
    },
  });
};
