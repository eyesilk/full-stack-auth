import { Provider } from '@nestjs/common';
import { HashPort, IUserRepository } from 'src/core/ports/auth';
import { SessionPort } from 'src/core/ports/auth/session.port';
import { HashService } from 'src/infrastructure/auth/hash';
import { SessionService } from 'src/infrastructure/auth/session';
import { UserRepository } from 'src/infrastructure/auth/user';

export function createUseCaseProvider(useCase: any): Provider {
  return {
    provide: useCase,
    useFactory: (
      userRepo: IUserRepository,
      sessionPort: SessionPort,
      hashPort: HashPort,
    ) => new useCase(userRepo, sessionPort, hashPort),
    inject: [UserRepository, SessionService, HashService],
  };
}
