import { TokenEntity, UserEntity } from 'src/core/domain';
import { BaseAuthUseCase } from '../base.usecase';

export class AccountConfirmationUseCase extends BaseAuthUseCase {
  async execute(req: any, token: string): Promise<UserEntity> {
    const tokenExist: TokenEntity = await this.tokenRepo.findByToken(token);

    const user: UserEntity = await this.userRepo.activate(tokenExist.userId);

    await this.tokenRepo.delete(tokenExist.token);

    return await this.sessionPort.save(req, user);
  }
}
