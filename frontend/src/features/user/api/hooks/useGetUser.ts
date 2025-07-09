import { useQuery } from "@tanstack/react-query";
import { User } from "@/entities/auth";
import UserApi from "../userApi";
import { setSessionStorage } from "@/features/auth/lib/setSessionStorage";

export const useGetUser = () => {
  return useQuery<User>({
    queryKey: ["get-user"],
    queryFn: async () => {
      const userStorage = sessionStorage.getItem("account");
      if (userStorage) {
        return JSON.parse(userStorage);
      }

      const userData: User = await UserApi.get();
      const { id, email, displayName, avatar, isTwoFactorEnabled } = userData;
      setSessionStorage(id, email, displayName, avatar, isTwoFactorEnabled);
      return {
        id,
        email,
        displayName,
        avatar,
        isTwoFactorEnabled,
      };
    },
    refetchOnWindowFocus: false,
  });
};
