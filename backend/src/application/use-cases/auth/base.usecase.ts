import { HashPort, MailPort, SessionPort } from 'src/core/ports/auth';
import { ITokenRepository } from 'src/core/ports/token';
import { IUserRepository } from 'src/core/ports/user';

export abstract class BaseAuthUseCase {
  constructor(
    protected readonly userRepo: IUserRepository,
    protected readonly tokenRepo: ITokenRepository,
    protected readonly sessionPort: SessionPort,
    protected readonly hashPort: HashPort,
    protected readonly mailPort: MailPort,
  ) { }
}
