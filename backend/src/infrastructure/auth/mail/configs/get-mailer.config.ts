import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { isDev } from 'src/infrastructure/common/utils';

export async function getMailerConfig(
  configService: ConfigService,
): Promise<MailerOptions> {
  return {
    transport: {
      host: configService.getOrThrow<string>('SMTP_HOST'),
      port: configService.getOrThrow<number>('SMTP_PORT'),
      secure: !isDev(configService),
      auth: {
        user: configService.getOrThrow<string>('SMTP_USER'),
        pass: configService.getOrThrow<string>('SMTP_PASSWORD'),
      },
    },
    defaults: {
      from: `"Eyesilk" ${configService.getOrThrow<string>('SMTP_USER')}`,
    },
  };
}
