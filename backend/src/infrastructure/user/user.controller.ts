import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Authorization, Authorized } from '../common/decorators';
import { UserEntity } from 'src/core/domain';

@Controller('user')
export class UserController {
  constructor(public readonly userRepo: UserRepository) { }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @Authorization()
  async profile(@Authorized() user: UserEntity) {
    return this.userRepo.findById(user.id);
  }
}
