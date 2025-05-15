import { AuthMethod, UserEntity } from "../domain";

export interface IUserRepository {
  findById(id: string): Promise<UserEntity>,
  findByEmail(email: string): Promise<UserEntity>,
  create(
    email: string,
    password: string,
    displayName: string,
    avatar: string,
    method: AuthMethod,
    isVerified: boolean
  ): Promise<UserEntity>
}
