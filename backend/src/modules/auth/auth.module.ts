import { Module } from '@nestjs/common';
import { HashModule } from 'src/infrastructure/auth/hash';
import { createAuthUseCaseProviders } from './providers';
import { SessionModule } from 'src/infrastructure/auth/session';
import {
  AccountConfirmationUseCase,
  GitHubLoginUseCase,
  GitHubUseCase,
  GoogleLoginUseCase,
  GoogleUseCase,
  LoginUseCase,
  LogoutUseCase,
  PasswordRecoveryRequestUseCase,
  PasswordRecoveryUseCase,
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
import {
  AuthController,
  OAuthContoller,
  VerificationController,
} from 'src/infrastructure/auth/controllers';
import { InterceptorModule } from 'src/infrastructure/auth/interceptor';

@Module({
  controllers: [AuthController, OAuthContoller, VerificationController],
  providers: [
    UserRepository,
    TokenRepository,
    GithubStrategy,
    GoogleStrategy,
    ConfigService,
    ...createAuthUseCaseProviders([
      RegisterUseCase,
      LoginUseCase,
      LogoutUseCase,
      GitHubUseCase,
      GoogleUseCase,
      AccountConfirmationUseCase,
      PasswordRecoveryRequestUseCase,
      PasswordRecoveryUseCase,
      GoogleLoginUseCase,
      GitHubLoginUseCase,
    ]),
  ],
  imports: [
    HashModule,
    SessionModule,
    MailModule,
    InterceptorModule,
    ConfigModule,
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
