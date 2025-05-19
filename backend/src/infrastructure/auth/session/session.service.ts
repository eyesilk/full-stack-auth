import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { UserEntity } from 'src/core/domain';
import { SessionPort } from 'src/core/ports/auth/session.port';

@Injectable()
export class SessionService implements SessionPort {
  constructor(private readonly configService: ConfigService) { }

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

  async destroy(req: any, res: any): Promise<void> {
    const request: Request = req as Request;
    const response: Response = res as Response;

    return new Promise((resolve, reject) => {
      request.session.destroy((error: Error) => {
        if (error) {
          return reject(
            new InternalServerErrorException(
              'Failed to complete the session. There may be a problem with the server or the session may have already ended.',
            ),
          );
        }
        response.clearCookie(
          this.configService.getOrThrow<string>('SESSION_NAME'),
        );
        resolve();
      });
    });
  }
}
