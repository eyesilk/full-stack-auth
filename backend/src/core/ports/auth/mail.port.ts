export interface MailPort {
  sendActivation(email: string, token: string): Promise<void>;
  sendPassRecover(email: string, token: string): Promise<void>;
  sendTwoFactorCode(email: string, code: string): Promise<void>;
}
