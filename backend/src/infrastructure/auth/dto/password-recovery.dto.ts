import { IsNotEmpty, IsString, MinLength, Validate } from 'class-validator';
import { IsPasswordMatchingConstraint } from '../decorators';

export class PasswordRecoveryDto {
  @IsString({ message: 'Password should be a string.' })
  @IsNotEmpty({ message: 'Password required.' })
  @MinLength(6, { message: 'Password must contain at least 6 characters.' })
  password: string;

  @IsString({ message: 'Confirmation password should be a string.' })
  @IsNotEmpty({ message: 'Confirmation password required.' })
  @MinLength(6, {
    message: 'Confirmation password must contain at least 6 characters.',
  })
  @Validate(IsPasswordMatchingConstraint, {
    message: "Passwords don't match.",
  })
  passwordRepeat: string;
}
