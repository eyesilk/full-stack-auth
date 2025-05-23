import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import {
  GitHubUseCase,
  LogoutUseCase,
  RegisterUseCase,
  LoginUseCase,
  GoogleUseCase,
  ConfirmationUseCase,
} from 'src/application/use-cases/auth';
import { LoginDto, RegisterDto } from './dto';
import { Request, Response } from 'express';
import { UserEntity } from 'src/core/domain';
import { Recaptcha } from '@nestlab/google-recaptcha';
import { Authorized } from '../common/decorators';
import { GitHubAuth, GoogleAuth } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerCase: RegisterUseCase,
    private readonly loginCase: LoginUseCase,
    private readonly logoutCase: LogoutUseCase,
    private readonly githubCase: GitHubUseCase,
    private readonly googleCase: GoogleUseCase,
    private readonly confirmationCase: ConfirmationUseCase,
  ) { }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @Recaptcha()
  async register(
    @Req() req: Request,
    @Body() dto: RegisterDto,
  ): Promise<Record<string, string>> {
    return this.registerCase.execute(req, dto.name, dto.email, dto.password);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Recaptcha()
  async login(@Req() req: Request, @Body() dto: LoginDto): Promise<UserEntity> {
    return this.loginCase.execute(req, dto.email, dto.password);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    await this.logoutCase.execute(req, res);
    res.send(true);
  }

  @Get('confirmation/:token')
  @HttpCode(HttpStatus.OK)
  async confirmation(
    @Req() req: Request,
    @Param('token') token: string,
  ): Promise<UserEntity> {
    return this.confirmationCase.execute(req, token);
  }

  // github auth
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

  // google auth

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
