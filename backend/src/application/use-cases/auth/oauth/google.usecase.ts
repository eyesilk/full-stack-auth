import { UserEntity } from 'src/core/domain';
import { BaseAuthUseCase } from '../base.usecase';

export class GoogleUseCase extends BaseAuthUseCase {
  async execute<Req>(
    req: Req,
    email: string,
    name: string,
    avatar: string,
  ): Promise<void> {
    const userExist: UserEntity | null = await this.userRepo.findByEmail(email);

    if (userExist) {
      if (userExist.method === 'GOOGLE') {
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
      'GOOGLE',
      true,
    );

    await this.sessionPort.save(req, newUser);
    return;
  }
}
