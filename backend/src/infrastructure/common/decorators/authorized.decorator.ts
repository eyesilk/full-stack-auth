import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UserEntity } from 'src/core/domain';

export const Authorized = createParamDecorator(
  (data: keyof UserEntity, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest() as Request;

    const user: UserEntity | undefined = request.user;

    return data ? user![data] : user;
  },
);
