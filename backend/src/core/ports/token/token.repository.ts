import { TokenEntity, TokenType } from 'src/core/domain';

export interface ITokenRepository {
  save(userId: string, token: TokenType): Promise<TokenEntity>;
  findByToken(tokenField: string): Promise<TokenEntity>;
  findByCodeAndId(code: string, userId: string): Promise<TokenEntity>;
  delete(token: string): Promise<boolean>;
}
