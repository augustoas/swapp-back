import { IsNotEmpty, IsString, Matches, IsEmail, MinLength, IsBoolean, IsBooleanString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly firstname: string;

  @IsNotEmpty()
  @IsString()
  readonly lastname: string;

  @IsNotEmpty()
  @IsEmail()
  @Matches(/^.+@lovalledor.cl$/, {message: 'email must end in @lovalledor.cl.'})
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/, {message: 'password too weak, it must contain at least 1 lowercase letter, 1 uppercase letter, and 1 digit.'})
  readonly password: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly status: boolean;
}