import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export function GitHubAuth() {
  return applyDecorators(UseGuards(AuthGuard('github')));
}
