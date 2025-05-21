export type UserRole = 'ADMIN' | 'USER';

export type AuthMethod = 'CREDENTIALS' | 'GOOGLE' | 'GITHUB';

export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string | null,
    public readonly displayName: string,
    public readonly role: UserRole,
    public readonly isVerified: boolean,
    public readonly isTwoFactorEnabled: boolean,
    public readonly method: AuthMethod,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly avatar: string | null,
  ) { }
}
