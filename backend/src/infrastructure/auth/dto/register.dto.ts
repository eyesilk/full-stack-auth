import { IsEmail, IsNotEmpty, IsString, MinLength, Validate } from "class-validator";
import { IsPasswordMatchingConstraint } from "src/infrastructure/common/decorators";

export class RegisterDto {
  @IsString({ message: "Name should be a string." })
  @IsNotEmpty({ message: "Name required." })
  name: string;

  @IsString({ message: "Email should be a string." })
  @IsEmail({}, { message: "Invalid email format." })
  @IsNotEmpty({ message: "Email required." })
  email: string;

  @IsString({ message: "Password should be a string." })
  @IsNotEmpty({ message: "Password required." })
  @MinLength(6, { message: "Password must contain at least 6 characters." })
  password: string;

  @IsString({ message: "Confirmation password should be a string." })
  @IsNotEmpty({ message: "Confirmation password required." })
  @MinLength(6, { message: "Confirmation password must contain at least 6 characters." })
  @Validate(IsPasswordMatchingConstraint, {
    message: "Passwords don't match."
  })
  passwordRepeat: string;
}
