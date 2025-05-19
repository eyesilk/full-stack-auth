import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { LogoutUseCase, RegisterUseCase } from 'src/application/use-cases/auth';
import { LoginDto, RegisterDto } from './dto';
import { Request, Response } from 'express';
import { LoginUseCase } from 'src/application/use-cases/auth/login.usecase';
import { UserEntity } from 'src/core/domain';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerCase: RegisterUseCase,
    private readonly loginCase: LoginUseCase,
    private readonly logoutCase: LogoutUseCase,
  ) { }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Req() req: Request,
    @Body() dto: RegisterDto,
  ): Promise<UserEntity> {
    return this.registerCase.execute(req, dto.name, dto.email, dto.password);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
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
