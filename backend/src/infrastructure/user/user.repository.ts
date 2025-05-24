import { AuthMethod, UserEntity } from 'src/core/domain';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma';
import { IUserRepository } from 'src/core/ports/user';
import { User } from 'prisma/__generated__';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) { }

  async findById(id: string): Promise<UserEntity | never> {
    const user: User | null = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(
        'User not found. Please check the entered data.',
      );
    }

    return this.returnUser(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user: User | null = await this.prismaService.user.findUnique({
      where: {
        email,
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
    });

    return this.returnUser(user);
  }

  async activate(id: string): Promise<UserEntity | never> {
    const user: User | null = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        isVerified: true,
      },
    });

    if (!user) {
      throw new NotFoundException(
        'User not found. Please check the entered data.',
      );
    }

    return this.returnUser(user);
  }

  async changePassword(id: string, password: string): Promise<UserEntity> {
    const user: User = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        password,
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
    );
  }
}
