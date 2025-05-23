import { Module } from '@nestjs/common';
import { AuthController } from 'src/infrastructure/auth';
import { HashModule } from 'src/infrastructure/auth/hash';
import {
  createAuthUseCaseProviders,
} from './providers';
import { SessionModule } from 'src/infrastructure/auth/session';
import {
  ConfirmationUseCase,
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
import { MailModule } from 'src/infrastructure/auth/mail';
import { TokenRepository } from 'src/infrastructure/auth/token';

@Module({
  controllers: [AuthController],
  providers: [
    UserRepository,
    TokenRepository,
    GithubStrategy,
    GoogleStrategy,
    ...createAuthUseCaseProviders([
      RegisterUseCase,
      LoginUseCase,
      LogoutUseCase,
      GitHubUseCase,
      GoogleUseCase,
      ConfirmationUseCase,
    ]),
  ],
  imports: [
    HashModule,
    SessionModule,
    MailModule,
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
