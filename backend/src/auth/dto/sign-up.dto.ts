import {
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
  IsEmail,
} from 'class-validator';

// defines the shape of the data required for authentication
export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly firstname: string;

  @IsNotEmpty()
  @IsString()
  readonly lastname: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;
}
