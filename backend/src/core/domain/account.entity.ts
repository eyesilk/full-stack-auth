import { type UserEntity } from "./user.entity";

export class AccountEntity {
  constructor(
    public readonly id: string,
    public readonly type: string,
    public readonly provider: string,
    public readonly expiresAt: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly refreshToken: string | null,
    public readonly accessToken: string | null,
    public readonly userId: string | null,
    public readonly user?: UserEntity,
  ) { }
}
