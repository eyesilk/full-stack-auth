import { UserEntity } from 'src/core/domain';
import { BaseAuthUseCase } from '../base.usecase';

export class GitHubUseCase extends BaseAuthUseCase {
  async execute<Req>(
    req: Req,
    email: string,
    name: string,
    avatar: string,
  ): Promise<void> {
    const userExist: UserEntity | null = await this.userRepo.findByEmail(email);

    if (userExist) {
      if (userExist.method === 'GITHUB') {
        await this.sessionPort.save(req, userExist);
        return;
      } else {
        return;
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

    await this.sessionPort.save(req, newUser);
    return;
  }
}
