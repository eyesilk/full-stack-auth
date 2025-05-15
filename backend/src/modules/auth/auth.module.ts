import { Module } from "@nestjs/common";
import { AuthController } from "src/infrastructure/auth";
import { HashModule } from "src/infrastructure/auth/hash";

@Module({
  controllers: [AuthController],
  imports: [HashModule],
})
export class AuthModule { }
