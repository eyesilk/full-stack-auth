import { axios as apiAxios } from "@/shared/utils";

export default class UserApi {
  static async getUser() {
    const { data } = await apiAxios.get("/user/profile");

    return data;
  }
}
