import { Provider } from '@nestjs/common';
import { MailPort } from 'src/core/ports/auth';
import { ITokenRepository } from 'src/core/ports/token';
import { IUserRepository } from 'src/core/ports/user';
import { MailService } from 'src/infrastructure/auth/mail';
import { TokenRepository } from 'src/infrastructure/auth/token';
import { UserRepository } from 'src/infrastructure/user';

export function createUserUseCaseProviders(useCases: any[]): Provider[] {
  return useCases.map((useCase) => {
    return {
      provide: useCase,
      useFactory: (
        userRepo: IUserRepository,
        tokenRepo: ITokenRepository,
        mailPort: MailPort,
      ) => new useCase(userRepo, tokenRepo, mailPort),
      inject: [UserRepository, TokenRepository, MailService],
    };
  });
}
