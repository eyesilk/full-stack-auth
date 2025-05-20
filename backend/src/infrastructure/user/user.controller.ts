import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Authorization, Authorized } from '../common/decorators';
import { GetProfileUseCase } from 'src/application/use-cases/user';

@Controller('user')
export class UserController {
  constructor(public readonly getProfileCase: GetProfileUseCase) { }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @Authorization()
  async profile(@Authorized('id') userId: string) {
    return this.getProfileCase.execute(userId);
  }
}
