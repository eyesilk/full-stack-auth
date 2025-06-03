import { LoginForm } from "@/entities/auth/model/loginForm.type";
import { RegisterForm } from "@/entities/auth/model/registartionForm.type";
import { axios } from "@/shared/utils";

export default class AuthApi {
  static async registration(registrationForm: RegisterForm) {
    const { data } = await axios.post("/auth/register", registrationForm);

    return data;
  }

  static async login(loginForm: LoginForm) {
    const { data } = await axios.post("/auth/login", loginForm);

    return data;
  }
}
