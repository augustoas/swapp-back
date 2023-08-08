import { IsNotEmpty, IsString, MinLength, IsEmail } from 'class-validator';

// defines the shape of the data required for authentication
export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;
}