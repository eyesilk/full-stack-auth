import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { returnConfirmationAuthHtml } from './utils';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) { }

  async sendActivation(email: string, token: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'confirmation of registration',
      html: returnConfirmationAuthHtml(
        `${this.configService.getOrThrow<string>('APPLICATION_URL')}/verif/account/${token}`,
      ),
    });
  }
}
