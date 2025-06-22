import { DashboardForm } from "@/entities/dashboard";
import { axios as apiAxios } from "@/shared/utils";

export default class UserApi {
  static async get() {
    const { data } = await apiAxios.get("/user/profile");

    return data;
  }

  static async update(dashboardForm: DashboardForm) {
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
