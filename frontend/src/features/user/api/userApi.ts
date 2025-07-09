import { DashboardForm } from "@/entities/dashboard";
import { axios as apiAxios } from "@/shared/utils";
import { UpdateResponse } from "../model/update-response.type";
import { User } from "@/entities/auth";

export default class UserApi {
  static async get(): Promise<User> {
    const { data } = await apiAxios.get("/user/profile");

    return data;
  }

  static async update(dashboardForm: DashboardForm): Promise<UpdateResponse> {
    const { name, email, isTwoFactorEnabled, code } = dashboardForm;

    const { data } = await apiAxios.patch("/user/update", {
      name,
      email,
      twoFactor: isTwoFactorEnabled,
      code,
    });

    return data;
  }
}
