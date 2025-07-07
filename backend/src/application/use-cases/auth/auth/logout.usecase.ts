import { BaseAuthUseCase } from '../base.usecase';

export class LogoutUseCase extends BaseAuthUseCase {
  async execute<Req, Res>(req: Req, res: Res): Promise<void> {
    await this.sessionPort.destroy(req, res);
  }
}
