export type TokenType = 'VERIFICATION' | 'TWO_FACTOR' | 'PASSWORD_RESET';

export class TokensEntity {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly token: string,
    public readonly type: TokenType,
    public readonly expiresIn: Date,
  ) { }
}
