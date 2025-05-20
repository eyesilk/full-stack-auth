import { UserEntity } from 'src/core/domain';
import { BaseUserUseCase } from './base.usecase';

export class GetProfileUseCase extends BaseUserUseCase {
  async execute(userId: string): Promise<UserEntity> {
    return this.userRepo.findById(userId);
  }
}
