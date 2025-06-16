import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailExistDto {
  @IsString({ message: 'Email should be a string.' })
  @IsEmail({}, { message: 'Invalid email format.' })
  @IsNotEmpty({ message: 'Email required.' })
  email: string;
}
