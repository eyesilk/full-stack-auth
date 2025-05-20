import { HashPort } from 'src/core/ports/auth';
import { SessionPort } from 'src/core/ports/auth/session.port';
import { IUserRepository } from 'src/core/ports/user';

export abstract class BaseAuthUseCase {
  constructor(
    protected readonly userRepo: IUserRepository,
    protected readonly sessionPort: SessionPort,
    protected readonly hashPort: HashPort,
  ) { }
}
