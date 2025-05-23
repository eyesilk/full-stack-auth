import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import {
  LogoutUseCase,
  RegisterUseCase,
  LoginUseCase,
} from 'src/application/use-cases/auth';
import { LoginDto, RegisterDto } from '../dto';
import { Request, Response } from 'express';
import { UserEntity } from 'src/core/domain';
import { Recaptcha } from '@nestlab/google-recaptcha';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerCase: RegisterUseCase,
    private readonly loginCase: LoginUseCase,
    private readonly logoutCase: LogoutUseCase,
  ) { }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @Recaptcha()
  async register(@Body() dto: RegisterDto): Promise<Record<string, string>> {
    return this.registerCase.execute(dto.name, dto.email, dto.password);
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
}
