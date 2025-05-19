import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRole } from 'src/core/domain';
import { Roles } from './roles.decorator';
import { AuthGuard, RolesGuard } from '../guards';

export function Authorization(...roles: UserRole[]) {
  if (roles.length > 0) {
    return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard));
  }

  return applyDecorators(UseGuards(AuthGuard));
}
