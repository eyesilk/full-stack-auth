import { Injectable } from "@nestjs/common";
import * as argon2 from "argon2";

@Injectable()
export class HashService {
  async hash(field: string): Promise<string> {
    return await argon2.hash(field, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1,
    });
  }

  async verify(userPassword: string, inputPassword: string): Promise<boolean> {
    return await argon2.verify(userPassword, inputPassword)
  }
}
