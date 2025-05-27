import { type AuthMethod, UserEntity } from '../../domain';

export interface IUserRepository {
  findById(id: string): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
  create(
    email: string,
    password: string,
    displayName: string,
    avatar: string,
    method: AuthMethod,
    isVerified: boolean,
  ): Promise<UserEntity>;
  update(
    id: string,
    email: string,
    name: string,
    twoFactor: boolean,
  ): Promise<UserEntity>;
  activate(id: string): Promise<UserEntity>;
  changePassword(id: string, password: string): Promise<UserEntity>;
}
