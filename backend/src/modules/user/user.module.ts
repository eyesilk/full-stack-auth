import { Module } from '@nestjs/common';
import { UserController, UserRepository } from 'src/infrastructure/user';
import { createUserUseCaseProvider } from './providers';
import {
  GetProfileUseCase,
  UpdateProfileUseCase,
} from 'src/application/use-cases/user';

@Module({
  controllers: [UserController],
  providers: [
    UserRepository,
    createUserUseCaseProvider(GetProfileUseCase),
    createUserUseCaseProvider(UpdateProfileUseCase),
  ],
})
export class UserModule { }
