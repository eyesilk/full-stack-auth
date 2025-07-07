import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { GitHubAuth, GoogleAuth } from '../decorators';
import { Authorized } from 'src/infrastructure/common/decorators';
import { UserEntity } from 'src/core/domain';
import {
  GitHubLoginUseCase,
  GitHubUseCase,
  GoogleLoginUseCase,
  GoogleUseCase,
} from 'src/application/use-cases/auth';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('oauth')
export class OAuthContoller {
  constructor(
    private readonly githubCase: GitHubUseCase,
    private readonly googleCase: GoogleUseCase,
    private readonly gitHubLoginCase: GitHubLoginUseCase,
    private readonly googleLoginCase: GoogleLoginUseCase,
    private readonly configService: ConfigService,
  ) { }

  @Post('github-login/:token')
  @HttpCode(HttpStatus.OK)
  async gitHubLogin(
    @Param('token') token: string,
    @Req() req: Request,
  ): Promise<UserEntity> {
    return this.gitHubLoginCase.execute<Request>(token, req);
  }

  @Post('google-login/:token')
  @HttpCode(HttpStatus.OK)
  async googleLogin(
    @Param('token') token: string,
    @Req() req: Request,
  ): Promise<UserEntity> {
    return this.googleLoginCase.execute<Request>(token, req);
  }

  @Get('github')
  @HttpCode(HttpStatus.OK)
  @GitHubAuth()
  async githubAuth(): Promise<void> { }

  @Get('github/callback')
  @HttpCode(HttpStatus.OK)
  @GitHubAuth()
  async githubCallback(
    @Req() req: Request,
    @Authorized() user: UserEntity & { accessToken: string },
    @Res() res: Response,
  ): Promise<void> {
    const { email, displayName: name, avatar, accessToken } = user;
    this.githubCase.execute<Request>(req, email, name, avatar!);
    res.redirect(
      `${this.configService.getOrThrow<string>('ALLOWED_ORIGIN')}/auth/validate/github?token=${accessToken}`,
    );
  }

  @Get('google')
  @HttpCode(HttpStatus.OK)
  @GoogleAuth()
  async googleAuth(): Promise<void> { }

  @Get('google/callback')
  @HttpCode(HttpStatus.OK)
  @GoogleAuth()
  async googleCallback(
    @Req() req: Request,
    @Authorized() user: UserEntity & { accessToken: string },
    @Res() res: Response,
  ): Promise<void> {
    const { email, displayName: name, avatar, accessToken } = user;
    this.googleCase.execute<Request>(req, email, name, avatar!);
    res.redirect(
      `${this.configService.getOrThrow<string>('ALLOWED_ORIGIN')}/auth/validate/google?token=${accessToken}`,
    );
  }
}
