import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegisterUseCase } from 'src/application/use-cases/auth';
import { RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly registerCase: RegisterUseCase) { }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() dto: RegisterDto) {
    return this.registerCase.execute(dto.name, dto.email, dto.password);
  }
}
