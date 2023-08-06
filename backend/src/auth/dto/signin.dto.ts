import { IsNotEmpty, IsString, MinLength, IsEmail, Matches } from 'class-validator';

// defines the shape of the data required for authentication
export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  @Matches(/^.+@lovalledor.cl$/, {message: 'email must end in @lovalledor.cl.'})
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;
}