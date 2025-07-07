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
  AccountConfirmationUseCase,
  PasswordRecoveryRequestUseCase,
  PasswordRecoveryUseCase,
} from 'src/application/use-cases/auth';
import { PasswordRecoveryDto, PasswordRecoveryRequestDto } from '../dto';
import { Record } from 'prisma/__generated__/runtime/library';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('verif')
export class VerificationController {
  constructor(
    private readonly accountConfirmationCase: AccountConfirmationUseCase,
    private readonly passwordRecReqCase: PasswordRecoveryRequestUseCase,
    private readonly passwordRecCase: PasswordRecoveryUseCase,
    private readonly configService: ConfigService,
  ) { }

  @Get('account/:token')
  @HttpCode(HttpStatus.OK)
  async account(
    @Req() req: Request,
    @Res() res: Response,
    @Param('token')
    token: string,
  ): Promise<void> {
    this.accountConfirmationCase.execute<Request>(req, token);
    res.redirect(
      `${this.configService.getOrThrow<string>('ALLOWED_ORIGIN')}/auth/login`,
    );
  }

  @Post('password-recovery/request')
  @HttpCode(HttpStatus.OK)
  async passwordRecoveryRequest(
    @Body() dto: PasswordRecoveryRequestDto,
  ): Promise<Record<string, string>> {
    return this.passwordRecReqCase.execute(dto.email);
  }

  @Post('password-recovery/:token')
  @HttpCode(HttpStatus.OK)
  async passwordRecovery(
    @Body() dto: PasswordRecoveryDto,
    @Param('token') token: string,
  ): Promise<Record<string, string>> {
    return this.passwordRecCase.execute(token, dto.password);
  }
}
