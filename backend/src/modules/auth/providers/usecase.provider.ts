import { Provider } from '@nestjs/common';
import { HashPort, MailPort, SessionPort } from 'src/core/ports/auth';
import { ITokenRepository } from 'src/core/ports/token';
import { IUserRepository } from 'src/core/ports/user';
import { HashService } from 'src/infrastructure/auth/hash';
import { MailService } from 'src/infrastructure/auth/mail';
import { SessionService } from 'src/infrastructure/auth/session';
import { TokenRepository } from 'src/infrastructure/auth/token';
import { UserRepository } from 'src/infrastructure/user';

export function createAuthUseCaseProviders(useCases: any[]): Provider[] {
  return useCases.map((useCase) => {
    return {
      provide: useCase,
      useFactory: (
        userRepo: IUserRepository,
        tokenRepo: ITokenRepository,
        sessionPort: SessionPort,
        hashPort: HashPort,
        mailPort: MailPort,
      ) => new useCase(userRepo, tokenRepo, sessionPort, hashPort, mailPort),
      inject: [
        UserRepository,
        TokenRepository,
        SessionService,
        HashService,
        MailService,
      ],
    };
  });
}
