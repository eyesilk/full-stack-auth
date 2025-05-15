export interface HashPort {
  hash(data: string): Promise<string>;
  verify(userPassword: string, inputPassword: string): Promise<boolean>;
}
