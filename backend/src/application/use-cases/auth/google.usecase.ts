import { UserEntity } from 'src/core/domain';
import { BaseAuthUseCase } from './base.usecase';
import { ConflictError } from 'src/application/errors';

export class GoogleUseCase extends BaseAuthUseCase {
  async execute(
    req: any,
    email: string,
    name: string,
    avatar: string,
  ): Promise<UserEntity> {
    const userExist: UserEntity | null = await this.userRepo.findByEmail(email);

    if (userExist) {
      if (userExist.method === 'GOOGLE') {
        return await this.sessionPort.save(req, userExist);
      } else {
        throw new ConflictError(
          'Authentication failed. A user with this email already exists. Please use another github profile or log in to your account.',
        );
      }
    }

    const newUser: UserEntity = await this.userRepo.create(
      email,
      '',
      name,
      avatar,
      'GOOGLE',
      true,
    );

    return await this.sessionPort.save(req, newUser);
  }
}
