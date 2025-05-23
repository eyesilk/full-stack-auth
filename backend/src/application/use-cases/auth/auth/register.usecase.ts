import { TokenEntity, UserEntity } from 'src/core/domain';
import { BaseAuthUseCase } from '../base.usecase';
import { ConflictError } from 'src/application/errors';

export class RegisterUseCase extends BaseAuthUseCase {
  async execute(
    name: string,
    email: string,
    password: string,
  ): Promise<Record<string, string>> {
    const userExist: UserEntity | null = await this.userRepo.findByEmail(email);

    if (userExist) {
      throw new ConflictError(
        'Registration failed. A user with this email already exists. Please use another email or log in to your account.',
      );
    }

    const hashedPassword: string = await this.hashPort.hash(password);

    const newUser: UserEntity | null = await this.userRepo.create(
      email,
      hashedPassword,
      name,
      '',
      'CREDENTIALS',
      false,
    );

    const token: TokenEntity = await this.tokenRepo.save(
      newUser.id,
      'ACTIVATE',
    );

    await this.mailPort.sendActivation(newUser.email, token.token);

    return { message: 'Confirm your account via the email we sent you.' };
  }
}
