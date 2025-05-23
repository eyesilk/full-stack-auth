import { TokenEntity, TokenType } from 'src/core/domain';

export interface ITokenRepository {
  save(userId: string, token: TokenType): Promise<TokenEntity>;
  findByToken(tokenFiled: string): Promise<TokenEntity>;
}
