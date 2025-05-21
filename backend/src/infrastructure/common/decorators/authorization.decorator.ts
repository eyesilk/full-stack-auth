import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRole } from 'src/core/domain';
import { Roles } from './roles.decorator';

export function Authorization(...roles: UserRole[]) {
  const { AuthGuard } = require('../guards/auth.guard');
  const { RolesGuard } = require('../guards/roles.guard');

  if (roles.length > 0) {
    return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard));
  }

  return applyDecorators(UseGuards(AuthGuard));
}
