import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisStore } from 'connect-redis';
import IORedis from 'ioredis';
import * as session from 'express-session';
import { ms, parseBoolean, StringValue } from './infrastructure/common/utils';
import { ExceptionsFilter } from './infrastructure/common/exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const redis = new IORedis(config.getOrThrow('REDIS_URI'));

  app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalFilters(new ExceptionsFilter());

  app.use(
    session({
      secret: config.getOrThrow<string>('SESSION_SECRET'),
      name: config.getOrThrow<string>('SESSION_NAME'),
      resave: true,
      rolling: true,
      saveUninitialized: false,
      cookie: {
        maxAge: ms(config.getOrThrow<StringValue>('SESSION_MAX_AGE')),
        // httpOnly: parseBoolean(config.getOrThrow<string>('SESSION_HTTP_ONLY')),
        // secure: parseBoolean(config.getOrThrow<string>('SESSION_SECURE')),
        // sameSite: config.getOrThrow<'lax' | 'none'>('SESSION_SAMESITE'),
        // path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
      },
      store: new RedisStore({
        client: redis,
        prefix: config.getOrThrow<string>('SESSION_PREFIX'),
      }),
    }),
  );

  app.enableCors({
    origin: config.getOrThrow<string>('ALLOWED_ORIGIN'),
    credentials: true,
  });

  const PORT: number = config.getOrThrow<number>('APPLICATION_PORT');

  try {
    await app.listen(PORT, () => console.log('Server OK. PORT: ', PORT));
  } catch (error) {
    console.log('Server shutdown. ERROR: ', error);
  }
}
bootstrap();
