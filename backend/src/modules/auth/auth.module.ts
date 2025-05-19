import { Module } from '@nestjs/common';
import { AuthController } from 'src/infrastructure/auth';
import { HashModule } from 'src/infrastructure/auth/hash';
import { createAuthUseCaseProvider } from './providers';
import { SessionModule } from 'src/infrastructure/auth/session';
import {
  LoginUseCase,
  LogoutUseCase,
  RegisterUseCase,
} from 'src/application/use-cases/auth';
import { UserRepository } from 'src/infrastructure/user';

@Module({
  controllers: [AuthController],
  providers: [
    UserRepository,
    createAuthUseCaseProvider(RegisterUseCase),
    createAuthUseCaseProvider(LoginUseCase),
    createAuthUseCaseProvider(LogoutUseCase),
  ],
  imports: [HashModule, SessionModule],
})
export class AuthModule { }
