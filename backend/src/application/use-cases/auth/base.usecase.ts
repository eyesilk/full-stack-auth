import { IUserRepository } from "src/core/ports/auth";

export abstract class BaseAuthUseCase {
  constructor(
    protected readonly userRepo: IUserRepository,
  ) { }
}
