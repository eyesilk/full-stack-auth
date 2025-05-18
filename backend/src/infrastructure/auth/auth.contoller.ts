import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { RegisterUseCase } from 'src/application/use-cases/auth';
import { LoginDto, RegisterDto } from './dto';
import { Request } from 'express';
import { LoginUseCase } from 'src/application/use-cases/auth/login.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerCase: RegisterUseCase,
    private readonly loginCase: LoginUseCase,
  ) { }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Req() req: Request, @Body() dto: RegisterDto) {
    return this.registerCase.execute(req, dto.name, dto.email, dto.password);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Req() req: Request, @Body() dto: LoginDto) {
    return this.loginCase.execute(req, dto.email, dto.password);
  }
}
