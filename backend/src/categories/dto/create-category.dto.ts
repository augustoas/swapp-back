import { IsNotEmpty, IsString, MinLength, IsEmail } from 'class-validator';

// defines the shape of the data required for authentication
export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
