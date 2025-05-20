import { IUserRepository } from 'src/core/ports/user';

export abstract class BaseUserUseCase {
  constructor(
    protected readonly userRepo: IUserRepository,
  ) { }
}
