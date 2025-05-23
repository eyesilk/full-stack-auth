import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Req,
} from '@nestjs/common';
import { AccountConfirmationUseCase } from 'src/application/use-cases/auth';
import { UserEntity } from 'src/core/domain';

@Controller('verif')
export class VerificationController {
  constructor(
    private readonly accountConfirmationCase: AccountConfirmationUseCase,
  ) { }

  @Get('account/:token')
  @HttpCode(HttpStatus.OK)
  async confirmation(
    @Req() req: Request,
    @Param('token') token: string,
  ): Promise<UserEntity> {
    return this.accountConfirmationCase.execute(req, token);
  }
}
