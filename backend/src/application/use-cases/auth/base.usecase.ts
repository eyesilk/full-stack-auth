import { HashPort, IUserRepository } from 'src/core/ports/auth';
import { SessionPort } from 'src/core/ports/auth/session.port';

export abstract class BaseAuthUseCase {
  constructor(
    protected readonly userRepo: IUserRepository,
    protected readonly sessionPort: SessionPort,
    protected readonly hashPort: HashPort,
  ) { }
}
