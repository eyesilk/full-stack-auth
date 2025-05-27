import { UserEntity } from 'src/core/domain';
import { BaseUserUseCase } from './base.usecase';

export class UpdateProfileUseCase extends BaseUserUseCase {
  async execute(
    id: string,
    name: string,
    email: string,
    twoFactor: boolean,
  ): Promise<UserEntity> {
    const user: UserEntity = await this.userRepo.update(
      id,
      email,
      name,
      twoFactor,
    );

    return user;
  }
}
