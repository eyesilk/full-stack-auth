import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { GitHubAuth, GoogleAuth } from '../decorators';
import { Authorized } from 'src/infrastructure/common/decorators';
import { UserEntity } from 'src/core/domain';
import {
  CheckEmailExistUseCase,
  GitHubUseCase,
  GoogleUseCase,
} from 'src/application/use-cases/auth';
import { Response } from 'express';
import { EmailExistDto, OAuthLoginDto } from '../dto';
import { GitHubLoginUseCase } from 'src/application/use-cases/auth/oauth/github-login.usecase';

@Controller('oauth')
export class OAuthContoller {
  constructor(
    private readonly githubCase: GitHubUseCase,
    private readonly googleCase: GoogleUseCase,
    private readonly checkEmailExistCase: CheckEmailExistUseCase,
    private readonly gitHubLoginCase: GitHubLoginUseCase,
  ) { }

  @Post('email-exist-github')
  @HttpCode(HttpStatus.OK)
  async checkUserExistByEmailGitHub(
    @Body() dto: EmailExistDto,
  ): Promise<boolean> {
    return this.checkEmailExistCase.execute(dto.email, 'GITHUB');
  }

  @Post('github-login')
  @HttpCode(HttpStatus.OK)
  async gitHubLogin(
    @Body() dto: OAuthLoginDto,
    @Req() req: Request,
  ): Promise<UserEntity> {
    const { email, accessToken } = dto;
    return this.gitHubLoginCase.execute(email, accessToken, req);
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
    this.githubCase.execute(req, email, name, avatar!);
    res.redirect(
      `http://localhost:3000/auth/validate/github?token=${accessToken}`,
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
    @Authorized() user: UserEntity,
  ): Promise<void> {
    const { email, displayName: name, avatar } = user;
    this.googleCase.execute(req, email, name, avatar!);
  }
}
