import { Provider } from "@nestjs/common";
import { RegisterUseCase } from "src/application/use-cases/auth";
import { IUserRepository } from "src/core/ports/auth";
import { UserRepository } from "src/infrastructure/auth/user";

export const RegisterUseCaseProvider: Provider = {
  provide: RegisterUseCase,
  useFactory: (
    userRepo: IUserRepository,
  ) => new RegisterUseCase(userRepo),
  inject: [UserRepository],
};
