import { UserEntity } from 'src/core/domain';

export interface SessionPort {
  save(req: any, user: UserEntity): Promise<UserEntity>;
}
