import { Module } from '@nestjs/common';
import { AuthController } from 'src/infrastructure/auth';
import { HashModule } from 'src/infrastructure/auth/hash';
import { createAuthUseCaseProvider } from './providers';
import { SessionModule } from 'src/infrastructure/auth/session';
import {
  GitHubUseCase,
  GoogleUseCase,
  LoginUseCase,
  LogoutUseCase,
  RegisterUseCase,
} from 'src/application/use-cases/auth';
import { UserRepository } from 'src/infrastructure/user';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getRecaptchaConfig } from './configs';
import { PassportModule } from '@nestjs/passport';
import {
  GithubStrategy,
  GoogleStrategy,
} from 'src/infrastructure/auth/strategies';

@Module({
  controllers: [AuthController],
  providers: [
    UserRepository,
    GithubStrategy,
    GoogleStrategy,
    createAuthUseCaseProvider(RegisterUseCase),
    createAuthUseCaseProvider(LoginUseCase),
    createAuthUseCaseProvider(LogoutUseCase),
    createAuthUseCaseProvider(GitHubUseCase),
    createAuthUseCaseProvider(GoogleUseCase),
  ],
  imports: [
    HashModule,
    SessionModule,
    GoogleRecaptchaModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getRecaptchaConfig,
      inject: [ConfigService],
    }),
    PassportModule.register({
      session: true,
    }),
  ],
})
export class AuthModule { }
