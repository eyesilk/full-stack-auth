import 'express-session';
import { UserEntity } from './core/domain';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
  }
}
