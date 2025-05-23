import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { GitHubAuth, GoogleAuth } from '../decorators';
import { Authorized } from 'src/infrastructure/common/decorators';
import { UserEntity } from 'src/core/domain';
import { GitHubUseCase, GoogleUseCase } from 'src/application/use-cases/auth';

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
  ): Promise<UserEntity> {
    const { email, displayName: name, avatar } = user;
    return this.githubCase.execute(req, email, name, avatar!);
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
