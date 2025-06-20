import { PasswordResetForm } from "@/entities/auth";
import { LoginForm } from "@/entities/auth/model/loginForm.type";
import { RegisterForm } from "@/entities/auth/model/registartionForm.type";
import { axios as apiAxios } from "@/shared/utils";
import { redirect } from "next/navigation";

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

  static async passwordResetRequest(email: string) {
    const { data } = await apiAxios.post("/verif/password-recovery/request", {
      email,
    });

    return data;
  }

  static async passwordReset({
    passwordResetForm,
    token,
  }: {
    passwordResetForm: PasswordResetForm;
    token: string;
  }) {
    const { data } = await apiAxios.post(
      `/verif/password-recovery/${token}`,
      passwordResetForm,
    );

    return data;
  }

  static async logout() {
    await apiAxios.post("/auth/logout");
  }
}
