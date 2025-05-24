import { TokenEntity, UserEntity } from 'src/core/domain';
import { BaseAuthUseCase } from '../base.usecase';
import { ConflictError, NotFoundError } from 'src/application/errors';
import { Record } from 'prisma/__generated__/runtime/library';

export class PasswordRecoveryRequestUseCase extends BaseAuthUseCase {
  async execute(email: string): Promise<Record<string, string>> {
    const user: UserEntity | null = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new NotFoundError(
        'No user with this email was found. Please recheck the entered data.',
      );
    }

    if (user.method != 'CREDENTIALS') {
      throw new ConflictError(
        'Password recovery is not allowed, as you have registered through third-party services. Please log in to your account using the service through which you registered.',
      );
    }

    const token: TokenEntity = await this.tokenRepo.save(
      user.id,
      'PASS_RECOVERY',
    );

    await this.mailPort.sendPassRecover(email, token.token);

    return {
      message: 'The recovery message has been successfully sent to your email.',
    };
  }
}
