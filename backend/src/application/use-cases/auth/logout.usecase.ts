import { BaseAuthUseCase } from './base.usecase';

export class LogoutUseCase extends BaseAuthUseCase {
  async execute(req: any, res: any): Promise<void> {
    await this.sessionPort.destroy(req, res);
  }
}
