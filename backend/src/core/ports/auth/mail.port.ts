export interface MailPort {
  sendActivation(email: string, token: string): Promise<void>;
}
