export type TokenType = 'ACTIVATE' | 'PASS_RECOVERY' | 'TWO_FACTOR';

export class TokenEntity {
  constructor(
    public readonly id: string,
    public readonly token: string,
    public readonly expiresIn: Date,
    public readonly type: TokenType,
    public readonly userId: string,
  ) { }
}
