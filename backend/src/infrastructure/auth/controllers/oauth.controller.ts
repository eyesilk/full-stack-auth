import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';
import { GitHubAuth, GoogleAuth } from '../decorators';
import { Authorized } from 'src/infrastructure/common/decorators';
import { UserEntity } from 'src/core/domain';
import { GitHubUseCase, GoogleUseCase } from 'src/application/use-cases/auth';
import { Response } from 'express';

@Controller('oauth')
export class OAuthContoller {
  constructor(
    private readonly githubCase: GitHubUseCase,
    private readonly googleCase: GoogleUseCase,
  ) { }

  @Get('github')
  @HttpCode(HttpStatus.OK)
  @GitHubAuth()
  async githubAuth(): Promise<void> { }

  @Get('github/callback')
  @HttpCode(HttpStatus.OK)
  @GitHubAuth()
  async githubCallback(
    @Req() req: Request,
    @Authorized() user: UserEntity,
    @Res() res: Response,
  ): Promise<void> {
    const { email, displayName: name, avatar } = user;
    this.githubCase.execute(req, email, name, avatar!);
    res.redirect('http://localhost:3000/auth/register');
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
  ): Promise<UserEntity> {
    const { email, displayName: name, avatar } = user;
    return this.googleCase.execute(req, email, name, avatar!);
  }
}
