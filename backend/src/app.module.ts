import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IS_DEV_ENV } from './infrastructure/common/utils';
import { PrismaModule } from './infrastructure/prisma';
import { AuthModule } from './modules/auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
  ],
})
export class AppModule { }
