import { useMutation, useQueryClient } from "@tanstack/react-query";
import { alertStore } from "@/app/providers/AlertProvider";
import UserApi from "../userApi";
import { setSessionStorage } from "@/features/auth/lib/setSessionStorage";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useUpdateUser = () => {
  const [isCodeEnabled, setIsCodeEnabled] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: UserApi.update,
    onSuccess: (data) => {
      if (!data.message) {
        setIsCodeEnabled(false);
        const { id, email, displayName, avatar, isTwoFactorEnabled } = data;
        queryClient.removeQueries({ queryKey: ["get-user"] });
        console.log(data);
        setSessionStorage(id, email, displayName, avatar, isTwoFactorEnabled);
        router.refresh();
        alertStore.setMessage(
          "Success. Profile information has been successfully updated",
        );
      } else {
        alertStore.setMessage(data.message);
        setIsCodeEnabled(true);
      }
    },
    onError: (err: any) => {
      alertStore.setError(err.response.data.message as string);
    },
  });

  return { mutation, isCodeEnabled, setIsCodeEnabled };
};
