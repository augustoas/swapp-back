import {
  IsNotEmpty,
  IsString,
  Matches,
  IsEmail,
  MinLength,
  IsBoolean,
  IsBooleanString,
} from 'class-validator';

export class CreateUserDto {
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

  @IsNotEmpty()
  @IsBoolean()
  readonly status: boolean;
}
