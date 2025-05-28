import { Module } from '@nestjs/common';
import { UserController, UserRepository } from 'src/infrastructure/user';
import { createUserUseCaseProviders } from './providers';
import {
  GetProfileUseCase,
  UpdateProfileUseCase,
} from 'src/application/use-cases/user';
import { MailService } from 'src/infrastructure/auth/mail';
import { TokenRepository } from 'src/infrastructure/auth/token';

@Module({
  controllers: [UserController],
  providers: [
    UserRepository,
    TokenRepository,
    MailService,
    ...createUserUseCaseProviders([UpdateProfileUseCase, GetProfileUseCase]),
  ],
})
export class UserModule { }
