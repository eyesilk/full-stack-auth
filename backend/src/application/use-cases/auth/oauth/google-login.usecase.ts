import { UserEntity } from 'src/core/domain';
import { BaseAuthUseCase } from '../base.usecase';
import { ConflictError, NotFoundError } from 'src/application/errors';
import { ConflictException } from '@nestjs/common';

export class GoogleLoginUseCase extends BaseAuthUseCase {
  async execute<Req>(accessToken: string, req: Req): Promise<UserEntity> {
    const email: string | null =
      await this.interceptorPort.checkGoogleTokenValid(accessToken);

    if (!email) {
      throw new ConflictException('The Google token is not valid');
    }

    const userExist: UserEntity | null = await this.userRepo.findByEmail(email);

    if (userExist) {
      if (userExist.method === 'GOOGLE') {
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
