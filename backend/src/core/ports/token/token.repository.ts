import { TokenEntity } from 'src/core/domain';

export interface ITokenRepository {
  save(userId: string): Promise<TokenEntity>;
  findByToken(tokenFiled: string): Promise<TokenEntity>;
}
