import { UserEntity } from 'src/core/domain';
import { ConflictError } from 'src/application/errors';
import { BaseAuthUseCase } from '../base.usecase';

export class CheckEmailExistUseCase extends BaseAuthUseCase {
  async execute(email: string, method: 'GITHUB' | 'GOOGLE'): Promise<boolean> {
    const userExist: UserEntity | null = await this.userRepo.findByEmail(email);

    if (userExist) {
      if (userExist.method === method) {
        return false;
      } else {
        throw new ConflictError(
          'Authentication failed. A user with this email already exists. Please use another profile or log in to your account.',
        );
      }
    }

    return false;
  }
}
