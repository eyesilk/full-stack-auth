import { TokenEntity, UserEntity } from 'src/core/domain';
import { BaseUserUseCase } from './base.usecase';

export class UpdateProfileUseCase extends BaseUserUseCase {
  async execute(
    id: string,
    name: string,
    email: string,
    twoFactor: boolean,
    code: string,
  ): Promise<UserEntity | Record<string, string>> {
    const userExist: UserEntity = await this.userRepo.findById(id);

    if (userExist.isTwoFactorEnabled) {
      if (!code) {
        const token: TokenEntity = await this.tokenRepo.save(
          userExist.id,
          'TWO_FACTOR',
        );

        await this.mailPort.sendTwoFactorCode(userExist.email, token.token);

        return {
          message: 'The activation code has been sent to your email.',
        };
      }

      const token: TokenEntity = await this.tokenRepo.findByCodeAndId(
        code,
        userExist.id,
      );

      await this.tokenRepo.delete(token.token);
    }

    const user: UserEntity = await this.userRepo.update(
      userExist.id,
      email,
      name,
      twoFactor,
    );

    return user;
  }
}
