import { UserEntity } from 'src/core/domain';
import { BaseAuthUseCase } from './base.usecase';
import { NotFoundError, UnauthorizedError } from 'src/application/errors';

export class LoginUseCase extends BaseAuthUseCase {
  async execute(
    req: any,
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const userExist: UserEntity | null = await this.userRepo.findByEmail(email);

    if (!userExist || !userExist.password) {
      throw new NotFoundError('User not found. Please check the entered data.');
    }

    const isValidPassword: boolean = await this.hashPort.verify(
      userExist.password,
      password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedError(
        'Wrong password. Please try again, or reset your password if you have forgotten it.',
      );
    }

    return await this.sessionPort.save(req, userExist);
  }
}
