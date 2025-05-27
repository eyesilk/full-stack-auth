import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { Authorization, Authorized } from '../common/decorators';
import {
  GetProfileUseCase,
  UpdateProfileUseCase,
} from 'src/application/use-cases/user';
import { UpdateDto } from './dto';

@Controller('user')
export class UserController {
  constructor(
    public readonly getProfileCase: GetProfileUseCase,
    public readonly updateProfileCase: UpdateProfileUseCase,
  ) { }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @Authorization()
  async profile(@Authorized('id') userId: string) {
    return this.getProfileCase.execute(userId);
  }

  @Get('by-id/:id')
  @HttpCode(HttpStatus.OK)
  @Authorization('ADMIN')
  async findById(@Param('id') id: string) {
    return this.getProfileCase.execute(id);
  }

  @Patch('update')
  @HttpCode(HttpStatus.OK)
  @Authorization()
  async update(@Authorized('id') id: string, @Body() dto: UpdateDto) {
    return this.updateProfileCase.execute(
      id,
      dto.name,
      dto.email,
      dto.twoFactor,
    );
  }
}
