import { useMutation, useQueryClient } from "@tanstack/react-query";
import { alertStore } from "@/app/providers/AlertProvider";
import UserApi from "../userApi";
import { setSessionStorage } from "@/features/auth/lib/setSessionStorage";
import { useRouter } from "next/navigation";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: UserApi.update,
    onSuccess: (data) => {
      if (!data.message) {
        const { id, email, displayName, avatar, isTwoFactorEnabled } = data;
        queryClient.removeQueries({ queryKey: ["get-user"] });
        console.log(data);
        setSessionStorage(id, email, displayName, avatar, isTwoFactorEnabled);
        router.refresh();
        alertStore.setMessage(
          "Success. Profile information has been successfully updated",
        );
      } else {
        alertStore.setMessage(
          "Verification. A verification code has been sent to your email address",
        );
      }
    },
    onError: (err: any) => {
      alertStore.setError(err.response.data.message as string);
    },
  });
};
