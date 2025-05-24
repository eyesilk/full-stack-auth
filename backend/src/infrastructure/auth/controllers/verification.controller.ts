import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import {
  AccountConfirmationUseCase,
  PasswordRecoveryRequestUseCase,
  PasswordRecoveryUseCase,
} from 'src/application/use-cases/auth';
import { UserEntity } from 'src/core/domain';
import { PasswordRecoveryDto, PasswordRecoveryRequestDto } from '../dto';
import { Record } from 'prisma/__generated__/runtime/library';

@Controller('verif')
export class VerificationController {
  constructor(
    private readonly accountConfirmationCase: AccountConfirmationUseCase,
    private readonly passwordRecReqCase: PasswordRecoveryRequestUseCase,
    private readonly passwordRecCase: PasswordRecoveryUseCase,
  ) { }

  @Get('account/:token')
  @HttpCode(HttpStatus.OK)
  async account(
    @Req() req: Request,
    @Param('token') token: string,
  ): Promise<UserEntity> {
    return this.accountConfirmationCase.execute(req, token);
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
