import { TokenEntity, UserEntity } from 'src/core/domain';
import { BaseAuthUseCase } from '../base.usecase';
import { Record } from 'prisma/__generated__/runtime/library';
import { ConflictError } from 'src/application/errors';

export class PasswordRecoveryUseCase extends BaseAuthUseCase {
  async execute(
    token: string,
    password: string,
  ): Promise<Record<string, string>> {
    const tokenExist: TokenEntity = await this.tokenRepo.findByToken(token);

    const user: UserEntity = await this.userRepo.findById(tokenExist.userId);

    if (user.method !== 'CREDENTIALS') {
      throw new ConflictError(
        'Password recovery is not allowed, as you have registered through third-party services. Please log in to your account using the service through which you registered.',
      );
    }

    const isPasswordMatch: boolean = await this.hashPort.verify(
      user.password!,
      password,
    );

    if (isPasswordMatch) {
      throw new ConflictError(
        'The new password must not match the old password.',
      );
    }

    const hashedPassword: string = await this.hashPort.hash(password);

    await this.userRepo.changePassword(user.id, hashedPassword);

    await this.tokenRepo.delete(tokenExist.token);

    return {
      message:
        'Password has been successfully changed. Please log in with the new password.',
    };
  }
}
