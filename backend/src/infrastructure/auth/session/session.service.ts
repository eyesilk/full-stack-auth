import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Request } from 'express';
import { UserEntity } from 'src/core/domain';
import { SessionPort } from 'src/core/ports/auth/session.port';

@Injectable()
export class SessionService implements SessionPort {
  async save(req: any, user: UserEntity): Promise<UserEntity> {
    const request: Request = req as Request;

    return new Promise((resolve, reject) => {
      request.session.userId = user.id;

      request.session.save((error: Error) => {
        if (error) {
          return reject(
            new InternalServerErrorException('Failed to save the session.'),
          );
        }

        return resolve(user);
      });
    });
  }
}
