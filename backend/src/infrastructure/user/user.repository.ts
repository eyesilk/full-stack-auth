import { AuthMethod, UserEntity } from 'src/core/domain';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma';
import { IUserRepository } from 'src/core/ports/auth';
import { User } from './types';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) { }

  async findById(id: string): Promise<UserEntity> {
    const user: User | null = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        accounts: true,
      },
    });

    if (!user)
      throw new NotFoundException(
        'User not found. Please check the entered data.',
      );

    return this.returnUser(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user: User | null = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      include: {
        accounts: true,
      },
    });

    if (!user) return null;

    return this.returnUser(user);
  }

  async create(
    email: string,
    password: string,
    displayName: string,
    avatar: string,
    method: AuthMethod,
    isVerified: boolean,
  ): Promise<UserEntity> {
    const user: User = await this.prismaService.user.create({
      data: {
        email,
        password,
        displayName,
        avatar,
        method,
        isVerified,
      },
      include: {
        accounts: true,
      },
    });

    return this.returnUser(user);
  }

  private returnUser(user: User) {
    return new UserEntity(
      user.id,
      user.email,
      user.password,
      user.displayName,
      user.role,
      user.isVerified,
      user.isTwoFactorEnabled,
      user.method,
      user.createdAt,
      user.updatedAt,
      user.avatar,
      user.accounts,
    );
  }
}
