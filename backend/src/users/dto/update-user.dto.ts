import { IsNotEmpty, IsString, IsOptional, IsDateString, Matches, IsEmail, IsEnum } from 'class-validator';
import { Gender } from '../../types/Gender.enum';

// defines the shape of the data required for authentication
export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  @Matches(/^.+@lovalledor.cl$/, {message: 'email must end in @lovalledor.cl.'})
  readonly email: string;

  @IsEnum(Gender)
  @IsOptional()
  readonly gender: Gender;

  @IsDateString()
  @IsOptional()
  birthdate: Date;
}