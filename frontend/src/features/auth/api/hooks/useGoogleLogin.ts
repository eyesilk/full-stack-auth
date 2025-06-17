import { useMutation } from "@tanstack/react-query";
import AuthApi from "../authApi";
import { alertStore } from "@/app/providers/AlertProvider";
import { useRouter } from "next/navigation";
import { setSessionStorage } from "../../lib/setSessionStorage";

export const useGoogleLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: AuthApi.googleLogin,
    onSuccess: (data) => {
      const { id, email, displayName, avatar } = data;
      setSessionStorage(id, email, displayName, avatar);
      router.push("/auth/register");
    },
    onError: (err: any) => {
      alertStore.setError(err.response.data.message as string);
      setTimeout(() => {
        router.push("/auth/register");
      }, 3000);
    },
  });
};
