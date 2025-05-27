import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateDto {
  @IsString({ message: 'Name should be a string.' })
  @IsNotEmpty({ message: 'Name required.' })
  name: string;

  @IsString({ message: 'Email should be a string.' })
  @IsEmail({}, { message: 'Invalid email format.' })
  @IsNotEmpty({ message: 'Email required.' })
  email: string;

  @IsBoolean({ message: 'Two-factor should be a boolean' })
  @IsNotEmpty({ message: 'Two-factor required.' })
  twoFactor: boolean;
}
