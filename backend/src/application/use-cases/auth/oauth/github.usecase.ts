import { UserEntity } from 'src/core/domain';
import { BaseAuthUseCase } from '../base.usecase';

export class GitHubUseCase extends BaseAuthUseCase {
  async execute(
    req: any,
    email: string,
    name: string,
    avatar: string,
  ): Promise<UserEntity | null> {
    const userExist: UserEntity | null = await this.userRepo.findByEmail(email);

    if (userExist) {
      if (userExist.method === 'GITHUB') {
        return await this.sessionPort.save(req, userExist);
      } else {
        return null;
      }
    }

    const newUser: UserEntity = await this.userRepo.create(
      email,
      '',
      name,
      avatar,
      'GITHUB',
      true,
    );

    return await this.sessionPort.save(req, newUser);
  }
}
