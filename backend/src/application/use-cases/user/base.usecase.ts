import { MailPort } from 'src/core/ports/auth';
import { ITokenRepository } from 'src/core/ports/token';
import { IUserRepository } from 'src/core/ports/user';

export abstract class BaseUserUseCase {
  constructor(
    protected readonly userRepo: IUserRepository,
    protected readonly tokenRepo: ITokenRepository,
    protected readonly mailPort: MailPort,
  ) { }
}
