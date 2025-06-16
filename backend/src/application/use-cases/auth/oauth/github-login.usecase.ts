import { UserEntity } from 'src/core/domain';
import { BaseAuthUseCase } from '../base.usecase';
import { ConflictError, NotFoundError } from 'src/application/errors';
import { ConflictException } from '@nestjs/common';

export class GitHubLoginUseCase extends BaseAuthUseCase {
  async execute(
    email: string,
    accessToken: string,
    req: any,
  ): Promise<UserEntity> {
    const isTokenValid: boolean =
      await this.interceptorPort.checkGitHubTokenValid(accessToken);

    if (!isTokenValid) {
      throw new ConflictException('The GitHub token is not valid');
    }

    const userExist: UserEntity | null = await this.userRepo.findByEmail(email);

    if (userExist) {
      if (userExist.method === 'GITHUB') {
        return await this.sessionPort.save(req, userExist);
      } else {
        throw new ConflictError(
          'Authentication failed. A user with this email already exists. Please use another profile or log in to your account.',
        );
      }
    }

    throw new NotFoundError('No user with this email was found.');
  }
}
