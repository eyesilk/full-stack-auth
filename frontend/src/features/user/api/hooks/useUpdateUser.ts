import { useMutation, useQueryClient } from "@tanstack/react-query";
import { alertStore } from "@/app/providers/AlertProvider";
import UserApi from "../userApi";
import { setSessionStorage } from "@/features/auth/lib/setSessionStorage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { hasMessage } from "../../model/type-guards/has-message.typeguard";
import { UpdateResponse } from "../../model/update-response.type";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../model/error.type";
import { DashboardForm } from "@/entities/dashboard";

export const useUpdateUser = () => {
  const [isCodeEnabled, setIsCodeEnabled] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<
    UpdateResponse,
    AxiosError<ErrorResponse>,
    DashboardForm
  >({
    mutationFn: UserApi.update,
    onSuccess: (data) => {
      if (hasMessage(data)) {
        alertStore.setMessage(data.message);
        setIsCodeEnabled(true);
      } else {
        setIsCodeEnabled(false);
        const { id, email, displayName, avatar, isTwoFactorEnabled } = data;
        queryClient.removeQueries({ queryKey: ["get-user"] });
        console.log(data);
        setSessionStorage(id, email, displayName, avatar, isTwoFactorEnabled);
        router.refresh();
        alertStore.setMessage(
          "Success. Profile information has been successfully updated",
        );
      }
    },
    onError: (err) => {
      alertStore.setError(err.response?.data.message || "unknown error");
    },
  });

  return { mutation, isCodeEnabled, setIsCodeEnabled };
};
