import { Module } from '@nestjs/common';
import { AuthController } from 'src/infrastructure/auth';
import { HashModule } from 'src/infrastructure/auth/hash';
import { createUseCaseProvider } from './providers';
import { UserRepository } from 'src/infrastructure/auth/user';
import { SessionModule } from 'src/infrastructure/auth/session';
import { RegisterUseCase } from 'src/application/use-cases/auth';
import { LoginUseCase } from 'src/application/use-cases/auth/login.usecase';

@Module({
  controllers: [AuthController],
  providers: [
    UserRepository,
    createUseCaseProvider(RegisterUseCase),
    createUseCaseProvider(LoginUseCase),
  ],
  imports: [HashModule, SessionModule],
})
export class AuthModule { }
