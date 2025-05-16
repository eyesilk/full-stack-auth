import { Module } from '@nestjs/common';
import { AuthController } from 'src/infrastructure/auth';
import { HashModule } from 'src/infrastructure/auth/hash';
import { RegisterUseCaseProvider } from './providers';
import { UserRepository } from 'src/infrastructure/auth/user';

@Module({
  controllers: [AuthController],
  providers: [UserRepository, RegisterUseCaseProvider],
  imports: [HashModule],
})
export class AuthModule { }
