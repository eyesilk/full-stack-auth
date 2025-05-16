import { UserEntity } from 'src/core/domain';
import { BaseAuthUseCase } from './base.usecase';
import { ConflictError } from 'src/application/errors';

export class RegisterUseCase extends BaseAuthUseCase {
  async execute(name: string, email: string, password: string) {
    const userExist: UserEntity | null = await this.userRepo.findByEmail(email);

    if (userExist) {
      throw new ConflictError(
        'Registration failed. A user with this email already exists. Please use another email or log in to your account.',
      );
    }

    const newUser: UserEntity | null = await this.userRepo.create(
      email,
      password,
      name,
      '',
      'CREDENTIALS',
      false,
    );

    return newUser;
  }
}
