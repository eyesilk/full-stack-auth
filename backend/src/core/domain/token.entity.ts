export class TokenEntity {
  constructor(
    public readonly id: string,
    public readonly token: string,
    public readonly expiresIn: Date,
    public readonly userId: string,
  ) { }
}
