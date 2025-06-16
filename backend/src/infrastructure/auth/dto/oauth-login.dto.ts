import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class OAuthLoginDto {
  @IsString({ message: 'Email should be a string.' })
  @IsEmail({}, { message: 'Invalid email format.' })
  @IsNotEmpty({ message: 'Email required.' })
  email: string;

  @IsString({ message: 'Token should be a string.' })
  @IsNotEmpty({ message: 'Token required.' })
  accessToken: string;
}
