import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

export function isDev(configService: ConfigService): boolean {
  return configService.getOrThrow('MODE_ENV') === 'development';
}

export const IS_DEV_ENV: boolean = process.env.MODE_ENV === 'development';
