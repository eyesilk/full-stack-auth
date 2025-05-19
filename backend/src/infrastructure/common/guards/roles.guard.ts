import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/core/domain';
import { ROLES_KEY } from '../decorators';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  public constructor(private readonly reflector: Reflector) { }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<UserRole>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request: Request = context.switchToHttp().getRequest() as Request;

    if (!roles) return true;

    if (!roles.includes(request.user!.role)) {
      throw new ForbiddenException(
        'Not right enough. You do not have access to this resource.',
      );
    }

    return true;
  }
}
