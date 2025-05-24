import { Injectable, NotFoundException } from '@nestjs/common';
import { Token } from 'prisma/__generated__';
import { TokenEntity, TokenType } from 'src/core/domain';
import { ITokenRepository } from 'src/core/ports/token';
import { PrismaService } from 'src/infrastructure/prisma';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TokenRepository implements ITokenRepository {
  constructor(private readonly prismaService: PrismaService) { }

  async save(userId: string, type: TokenType): Promise<TokenEntity> {
    const token: Token = await this.prismaService.token.create({
      data: {
        token: uuidv4(),
        type,
        expiresIn: new Date(Date.now() + 60 * 60 * 1000),
        userId,
      },
    });

    return this.returnToken(token);
  }

  async findByToken(tokenField: string): Promise<TokenEntity | never> {
    const token: Token | null = await this.prismaService.token.findUnique({
      where: {
        token: tokenField,
      },
    });

    if (!token || token.expiresIn < new Date()) {
      throw new NotFoundException(
        'Token not found or expired. Make sure to follow the confirmation link no later than 1 hour after submission.',
      );
    }

    return this.returnToken(token);
  }

  async delete(token: string): Promise<boolean> {
    await this.prismaService.token.delete({
      where: {
        token,
      },
    });

    return true;
  }

  private returnToken(token: Token): TokenEntity {
    return new TokenEntity(
      token.id,
      token.token,
      token.expiresIn,
      token.type,
      token.userId,
    );
  }
}
