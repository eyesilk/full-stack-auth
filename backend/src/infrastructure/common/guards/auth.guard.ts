import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserRepository } from 'src/infrastructure/user';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly userRepo: UserRepository) { }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest() as Request;

    if (typeof request.session.userId === 'undefined') {
      throw new UnauthorizedException(
        'The user is not authorized. Please log in to gain access.',
      );
    }

    const user = await this.userRepo.findById(request.session.userId);

    request.user = user;

    return true;
  }
}
