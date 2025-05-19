import { UserEntity } from './core/domain';
import 'express';

declare module 'express' {
  interface Request {
    user?: UserEntity;
  }
}
