import { PasswordResetForm, User } from "@/entities/auth";
import { LoginForm } from "@/entities/auth/model/loginForm.type";
import { RegisterForm } from "@/entities/auth/model/registartionForm.type";
import { axios as apiAxios } from "@/shared/utils";
import { LoginResponse } from "../model/lopin-response.type";
import { MessageResponse } from "../model/message-response.type";

export default class AuthApi {
  static async registration(
    registrationForm: RegisterForm,
  ): Promise<MessageResponse> {
    const { data } = await apiAxios.post("/auth/register", registrationForm);

    return data;
  }

  static async login(loginForm: LoginForm): Promise<LoginResponse> {
    const { data } = await apiAxios.post("/auth/login", loginForm);

    return data;
  }

  static async gitHubLogin(accessToken: string): Promise<User> {
    const { data } = await apiAxios.post(`/oauth/github-login/${accessToken}`);

    return data;
  }

  static async googleLogin(accessToken: string): Promise<User> {
    const { data } = await apiAxios.post(`/oauth/google-login/${accessToken}`);

    return data;
  }

  static async passwordResetRequest(email: string): Promise<MessageResponse> {
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
  }): Promise<MessageResponse> {
    const { data } = await apiAxios.post(
      `/verif/password-recovery/${token}`,
      passwordResetForm,
    );

    return data;
  }

  static async logout(): Promise<void> {
    await apiAxios.post("/auth/logout");
  }
}
