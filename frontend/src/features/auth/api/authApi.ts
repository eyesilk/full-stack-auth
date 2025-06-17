import { LoginForm } from "@/entities/auth/model/loginForm.type";
import { RegisterForm } from "@/entities/auth/model/registartionForm.type";
import { axios as apiAxios } from "@/shared/utils";

export default class AuthApi {
  static async registration(registrationForm: RegisterForm) {
    const { data } = await apiAxios.post("/auth/register", registrationForm);

    return data;
  }

  static async login(loginForm: LoginForm) {
    const { data } = await apiAxios.post("/auth/login", loginForm);

    return data;
  }

  static async gitHubLogin(accessToken: string) {
    const { data } = await apiAxios.post(`/oauth/github-login/${accessToken}`);

    return data;
  }

  static async googleLogin(accessToken: string) {
    const { data } = await apiAxios.post(`/oauth/google-login/${accessToken}`);

    return data;
  }
}
