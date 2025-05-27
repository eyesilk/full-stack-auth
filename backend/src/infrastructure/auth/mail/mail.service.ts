import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { returnConfirmationHtml, returnTwoFactorHtml } from './utils';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) { }

  async sendActivation(email: string, token: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Confirmation of registration',
      html: returnConfirmationHtml(
        `${this.configService.getOrThrow<string>('APPLICATION_URL')}/verif/account/${token}`,
        'Account Confirmation',
        'Please confirm your account by clicking the button below.',
        'This link will expire in 1 hour.',
        'Confirm Account',
      ),
    });
  }

  async sendPassRecover(email: string, token: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Password recovery',
      html: returnConfirmationHtml(
        `${this.configService.getOrThrow<string>('APPLICATION_URL')}/verif/password-recovery/${token}`,
        'Password Recovery',
        'You have requested password recovery. To do this, you need to click on the button below.',
        'This link will expire in 1 hour.',
        'Recover Password',
      ),
    });
  }

  async sendTwoFactorCode(email: string, code: number): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Two-factor code',
      html: returnTwoFactorHtml(code),
    });
  }
}
