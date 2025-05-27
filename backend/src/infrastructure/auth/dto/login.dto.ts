import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsString({ message: 'Email should be a string.' })
  @IsEmail({}, { message: 'Invalid email format.' })
  @IsNotEmpty({ message: 'Email required.' })
  email: string;

  @IsString({ message: 'Password should be a string.' })
  @IsNotEmpty({ message: 'Password required.' })
  @MinLength(6, { message: 'Password must contain at least 6 characters.' })
  password: string;

  @IsOptional()
  @IsString()
  code?: string;
}
