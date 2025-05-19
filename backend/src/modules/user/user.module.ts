import { Module } from '@nestjs/common';
import { UserController, UserRepository } from 'src/infrastructure/user';

@Module({
  controllers: [UserController],
  providers: [UserRepository],
})
export class UserModule { }
