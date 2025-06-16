import { LoginForm } from "@/entities/auth/model/loginForm.type";
import { RegisterForm } from "@/entities/auth/model/registartionForm.type";
import { axios as apiAxios } from "@/shared/utils";
import axios from "axios";

export default class AuthApi {
  static async registration(registrationForm: RegisterForm) {
    const { data } = await apiAxios.post("/auth/register", registrationForm);

    return data;
  }

  static async login(loginForm: LoginForm) {
    const { data } = await apiAxios.post("/auth/login", loginForm);

    return data;
  }

  static async validateGitHub(accessToken: string) {
    const { data: gitHubEmails } = await axios.get(
      "https://api.github.com/user/emails",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github+json",
        },
      },
    );

    const email: string = gitHubEmails[0].email;

    await apiAxios.post("/oauth/email-exist-github", {
      email,
    });

    const { data } = await apiAxios.post("/oauth/github-login", {
      email,
      accessToken,
    });

    return data;
  }
}
